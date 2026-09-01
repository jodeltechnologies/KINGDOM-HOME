# Our Kingdom Home

A family app for one household in Buea. Five ways to love a wife, grounded in Scripture. A
WhatsApp writer that sounds like a man and not like a machine. A family altar record tied to
Deeper Life's *Daily Manna* and *Sincere Milk*. A devotion roster you can print or download as Word.

No build step. No framework. No `npm install`. Plain HTML, CSS and JavaScript, plus one
serverless function. If you can push to GitHub you can deploy this.

---

## What is in here

```
index.html               the whole interface, seven tabs
styles.css               design system, colours taken from your photograph
data.js                  messages, the five loves, readings for four tracks
practices.js             the 47 Evans family practices, verses and little-ones track
app.js                   all the logic
steps.js                 the Steps tab: practices, name cards, shoebox, verses
sw.js                    service worker, this is what makes Install appear on Android
manifest.webmanifest     app name, icons, home screen behaviour
vercel.json              headers, mainly so the service worker updates properly
api/write.js             serverless function, calls Groq with your key kept on the server
supabase/schema.sql      run once, gives you sync between two phones
img/                     your photograph, hero and background
icons/                   app icons
.env.example             copy to .env.local for local work
```

---

## 1. GitHub

```bash
cd kingdom-home
git init
git add .
git commit -m "Kingdom Home"
git branch -M main
git remote add origin https://github.com/YOUR_NAME/kingdom-home.git
git push -u origin main
```

Make the repository **private**. Your wedding photograph is in it, and later your household
code may end up in a screenshot. Nothing here needs to be public.

`.gitignore` already excludes `.env` and `.env.local`. Never commit a Groq key.

---

## 2. Vercel

1. Go to vercel.com, sign in with GitHub, **Add New, Project**, pick `kingdom-home`.
2. Framework preset: **Other**. Leave the build command and output directory empty.
3. **Deploy**.

You get a URL like `kingdom-home.vercel.app`. Open it on your phone in Chrome.

### The Groq key

In Vercel: **Settings, Environment Variables**.

| Name | Value | Notes |
|---|---|---|
| `GROQ_API_KEY` | `gsk_...` | from console.groq.com/keys |
| `APP_PASSCODE` | leave empty | optional, see below |

Then **Deployments, Redeploy**. Environment variables only apply to builds made after you add them.

In the app: **Set up, Groq, Through my Vercel site**. Nothing to paste. Press **Test the connection**.

`APP_PASSCODE` is optional. If you set it, `/api/write` refuses any request that does not carry
the same value in an `x-kh-pass` header. Only worth doing if you make the repository public or
start sharing the URL. For a private URL that only you and your wife know, leave it blank.

---

## 3. Supabase, optional

Only needed if you want both phones showing the same roster, altar record and notes. Skip it and
everything still works, it just lives on one phone.

1. supabase.com, **New project**.
2. **SQL Editor, New query**. Paste all of `supabase/schema.sql`. **Run**.
3. **Project Settings, API**. Copy the **Project URL** and the **anon public** key.
4. In the app: **Set up, Supabase**. Paste both. Press **Make one** to generate a household code.
5. **Send this phone up**. On her phone, enter the same three values and press **Pull hers down**.

The anon key is designed to be public, so it is safe in the app. The household code is not. It is
the only thing standing between your family notes and anyone who guesses it, which is why the
generator makes it eighteen random characters. Treat it like a house key.

The schema locks the table completely and exposes only two functions, `kh_push` and `kh_pull`,
both of which demand the code. There is no way to list households or enumerate codes.

---

## 4. Groq, the message writer

Two ways to connect, chosen under **Set up**.

**Through my Vercel site.** The key sits in a Vercel environment variable and never reaches the
phone. Use this one.

**Key on this phone.** For GitHub Pages, Netlify or anywhere without serverless functions. The key
is stored in the browser and sent directly from the phone. Fine on your own phone, never on a
shared computer, and never hardcoded into a file you push.

Either way, set a spend limit on your Groq account.

### Models

Defaults are `openai/gpt-oss-120b` and `openai/gpt-oss-20b`. Groq retired the Llama chat models in
June 2026, so anything you read online referring to `llama-3.3-70b-versatile` is out of date. Groq
changes its lineup often, so the app has a **Load models from my account** button that pulls the
live list from `/openai/v1/models`. Use it if a model name stops working.

### Making it sound human

The system prompt is in `api/write.js` and mirrored in `app.js`. Keep the two the same if you edit
one. What it does:

- caps every line at eighteen words, because length is the loudest AI tell
- bans the giveaway vocabulary outright: cherish, treasure, appreciate, grateful, journey, deeply,
  soulmate, my everything, and the rest
- bans em dashes, semicolons, rhyme, and the "not just X, but Y" construction
- gives six examples in the exact register wanted and three examples of what to never write
- forces it to use the detail you typed in the box

That last one matters most. **"i owe u an evening"** could go to anybody. **"i saw ur eyes this
morning, thank u for sitting up with the baby"** could only go to her. Type what actually happened,
and read the line before you send it. If it does not sound like your mouth, change a word or throw
it away.

---

## 5. Install on Android

Open your Vercel URL in Chrome, three dots, **Install app**. Because there is a real service worker
and manifest here, the full install prompt appears rather than just a bookmark shortcut. It opens
full screen and works with no signal.

Reminders inside the app only fire while it is open. For alarms that ring when it is closed, use
**Set up, Download the calendar file** and add it to Google Calendar.

---

## 6. Local work

```bash
npx vercel dev     # serves the site and /api/write together, reads .env.local
# or, without the serverless function:
python3 -m http.server 8080
```

`file://` will not work. The service worker needs `http` or `https`.

After changing any file, bump `CACHE` in `sw.js` from `kingdom-home-v1` to `-v2`. Otherwise phones
keep serving the old copy from cache and you will think the deploy failed.

---

## A note on Daily Manna and Sincere Milk

Both are written and owned by Deeper Christian Life Ministry. This app does not hold copies of
them. The Altar tab links out to the ministry's own site where the day's portion is published, and
you read it there. Everything the app stores is your family's own record.

The 101-day reading plan, the Bible person track and the Bible event track are original to this
app and free to change. They are in `data.js` as `CANON`, `CHARS` and `EVENTS`, four fields each:
reference, title, question for the children, prayer point. Add to them freely.


---

## The Steps tab

`practices.js` holds 47 things Tony and Lois Evans describe actually doing in their own
home, taken chapter by chapter from *Raising Kingdom Kids*. Each one carries two fields:

- `e` — what he did, as the book records it
- `y` — how it works in a house with a 5, a 4 and a 1 year old

and a `start` value of either `'now'` or an age. The list re-sorts itself against the ages you
enter under **Your house**, so as the children grow, practices move from *Wait for their age*
into *Start now* on their own. Seven of the forty-seven are currently waiting: table manners at
six, school consequences at five, friendships at eight, the eagle story at six, earned freedom
at seven, the purity conversation at sixteen, and paid work at fourteen.

The **Little ones** reading track in `practices.js` (`LITTLE`, 60 entries) is written for children
under six: short narrative passages, one plain question a 4 year old can answer, one thing to
pray. It is the default in the roster and on the Altar tab while your eldest is seven or under.
`LITTLEVERSES` holds 24 memory verses of five to eight words, one a fortnight for a year.
