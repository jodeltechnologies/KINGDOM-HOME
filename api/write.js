// api/write.js
// Runs on Vercel. Keeps GROQ_API_KEY on the server so it never reaches the phone.
// Set GROQ_API_KEY in Vercel: Settings > Environment Variables, then redeploy.
// Optional: set APP_PASSCODE too, and this endpoint will only answer requests
// carrying the same value in an x-kh-pass header.

const MOODLABEL = {
  morn: 'a good morning message',
  miss: 'telling her he misses her',
  thx:  'thanking her',
  sorry:'apologising',
  time: 'offering her his time',
  faith:'something about God or prayer',
  play: 'light and flirty, nothing crude',
  mum:  'encouraging her as a mother',
  night:'a goodnight message'
};

// Keep this identical to groqSystem() in app.js.
function system(tone) {
  const voice = tone === 'pd'
    ? 'Cameroonian Pidgin as spoken in Buea. Words like: na, dey, don, wetin, sabi, comot, pikin, wahala, small small, no be so. Keep it readable, not thick.'
    : 'plain English with texting shorthand. u, ur, 4, 2, b4, 2nite, 2mrw, gud, luv, thx, pls, abt, rmbr. Lower case is fine.';
  return [
"You draft one-line WhatsApp messages that a Cameroonian husband in Buea sends to his own wife. You are writing AS him, in his voice. He is a Deeper Life Bible Church member. His marriage is strained because he has not been giving her time, and he is trying to repair it.",
"",
"VOICE: " + voice,
"",
"HARD RULES. Break any of these and the line is useless:",
"- 6 to 18 words. One sentence, or two very short ones. Never longer.",
"- Use the specific detail the husband gives you. That detail is the entire point. A line that could be sent to any wife is a failed line.",
"- No em dashes, no semicolons, no colons before a reveal.",
"- Never use these words: cherish, treasure, appreciate, grateful, blessed to have, journey, deeply, truly, incredibly, forever and always, my everything, soulmate, heart of my heart, unwavering, endlessly.",
"- No metaphors about the sun, moon, stars, oceans, gardens, roses, wine or seasons.",
"- No poetry. No rhyme. No 'not just X, but Y'. No listing three things in a row.",
"- No emoji. No hashtags. No quotation marks around the message.",
"- Never open with 'My dearest', 'My love,' as a salutation, or her name followed by a comma.",
"- Do not compliment her appearance unless the husband asked for that mood.",
"- If apologising: name the specific thing, no excuse, and never use the word 'but'.",
"",
"HOW REAL MEN TEXT: they are blunt, a bit clumsy, and concrete. They mention the actual thing. They do not explain their feelings at length. Short is warm. Long is a speech.",
"",
"GOOD EXAMPLES (match this register exactly):",
"- i was wrong abt last night. no excuse. im sorry.",
"- friday evening is yours. no phone. wetin u wan do?",
"- thank u for sitting up with the baby. i saw ur eyes this morning.",
"- i dey miss u and na the same house we dey. wahala.",
"- reached late again. sit down, let me warm the food.",
"- i prayed for ur mother this morning. by name.",
"",
"BAD EXAMPLES (never write like this):",
"- My love, you are the light that guides me through every storm.",
"- I am so incredibly grateful for everything you do for our family.",
"- Thinking of you today and cherishing the beautiful journey we share.",
"",
'Return strict JSON only: {"lines":["...","...","..."]}. Three different lines, no numbering, no commentary.'
  ].join("\n");
}

function user(mood, name, ctx) {
  const bits = ['Mood wanted: ' + (MOODLABEL[mood] || 'a warm message') + '.'];
  if (name) bits.push('Her name is ' + name + '. Use it in at most one of the three lines.');
  bits.push(ctx && ctx.trim()
    ? 'What actually happened today, use this, it is the point: ' + ctx.trim()
    : 'He gave no detail today, so keep the lines very plain and ordinary. Do not invent events that may not have happened.');
  return bits.join('\n');
}

function parseLines(txt) {
  if (!txt) return [];
  txt = String(txt).replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
  const fence = txt.match(/```(?:json)?([\s\S]*?)```/);
  if (fence) txt = fence[1].trim();
  try {
    const j = JSON.parse(txt);
    if (Array.isArray(j.lines)) return j.lines.filter(Boolean).map(String);
  } catch (e) {}
  const g = txt.match(/\{[\s\S]*\}/);
  if (g) {
    try {
      const j = JSON.parse(g[0]);
      if (Array.isArray(j.lines)) return j.lines.filter(Boolean).map(String);
    } catch (e) {}
  }
  return txt.split('\n')
    .map(s => s.replace(/^\s*(?:[-*\u2022]|\d+[.)])\s*/, '').replace(/^["'\u201c]|["'\u201d]$/g, '').trim())
    .filter(s => s.length > 4).slice(0, 3);
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST.' });

  const key = process.env.GROQ_API_KEY;
  if (!key) {
    return res.status(500).json({
      error: 'GROQ_API_KEY is not set on the server. Add it in Vercel under Settings, Environment Variables, then redeploy.'
    });
  }

  const pass = process.env.APP_PASSCODE;
  if (pass && req.headers['x-kh-pass'] !== pass) {
    return res.status(401).json({ error: 'Wrong passcode.' });
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const { mood = 'morn', tone = 'sh', context = '', name = '', model } = body || {};
  const useModel = (typeof model === 'string' && model.trim()) ? model.trim() : 'openai/gpt-oss-120b';

  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
      body: JSON.stringify({
        model: useModel,
        temperature: 1.05,
        top_p: 0.95,
        max_tokens: 600,
        reasoning_effort: 'low',
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: system(tone) },
          { role: 'user',   content: user(mood, String(name).slice(0, 40), String(context).slice(0, 400)) }
        ]
      })
    });

    const j = await r.json();
    if (!r.ok) {
      return res.status(r.status).json({ error: (j.error && j.error.message) || 'Groq returned ' + r.status });
    }
    const lines = parseLines(j.choices?.[0]?.message?.content);
    if (!lines.length) return res.status(502).json({ error: 'The model returned nothing usable. Try again.' });
    return res.status(200).json({ lines });
  } catch (e) {
    return res.status(500).json({ error: 'Could not reach Groq: ' + e.message });
  }
}
