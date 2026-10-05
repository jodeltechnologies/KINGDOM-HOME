/* ============================================================
   Kingdom Home. Everything runs on this phone. Nothing leaves it.
   ============================================================ */

/* ---------- storage that never throws ---------- */
const Store = (()=>{
  let ok=true, mem={};
  try{ localStorage.setItem('__t','1'); localStorage.removeItem('__t'); }catch(e){ ok=false; }
  return {
    get(k,d){ try{ const v = ok?localStorage.getItem('kh_'+k):mem[k];
      return v==null?d:JSON.parse(v); }catch(e){ return d; } },
    set(k,v){ try{ const s=JSON.stringify(v); if(ok) localStorage.setItem('kh_'+k,s); else mem[k]=s; }catch(e){} },
    all(){ const o={}; if(ok){ for(let i=0;i<localStorage.length;i++){ const k=localStorage.key(i);
        if(k.startsWith('kh_')) o[k.slice(3)]=localStorage.getItem(k); } } else Object.assign(o,mem); return o; },
    wipe(){ try{ if(ok){ const ks=[]; for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);
        if(k.startsWith('kh_'))ks.push(k);} ks.forEach(k=>localStorage.removeItem(k)); } else mem={}; }catch(e){} }
  };
})();

/* ---------- small helpers ---------- */
const $ = s=>document.querySelector(s);
const $$ = s=>[...document.querySelectorAll(s)];
const iso = d=>{const t=new Date(d); return t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0');};
const fromIso = s=>{const [y,m,d]=s.split('-').map(Number); return new Date(y,m-1,d);};
const addDays=(d,n)=>{const t=new Date(d); t.setDate(t.getDate()+n); return t;};
const DAYS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MON=['January','February','March','April','May','June','July','August','September','October','November','December'];
const fmtLong = d=>DAYS[d.getDay()]+', '+d.getDate()+' '+MON[d.getMonth()]+' '+d.getFullYear();
const fmtShort= d=>DAYS[d.getDay()].slice(0,3)+' '+String(d.getDate()).padStart(2,'0')+' '+MON[d.getMonth()].slice(0,3);
const esc = s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const today = ()=>{const t=new Date(); t.setHours(0,0,0,0); return t;};
const dayIndex = d=>Math.floor((fromIso(iso(d)) - new Date(2024,0,1))/86400000);

let toastT;
function toast(m){ const t=$('#toast'); t.textContent=m; t.classList.add('on');
  clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('on'),2600); }

/* ---------- state ---------- */
const S = {
  wifeName: Store.get('wifeName',''),
  husName:  Store.get('husName',''),
  phone:    Store.get('phone','237674544892'),
  mood:     Store.get('mood','morn'),
  tone:     Store.get('tone','sh'),
  sent:     Store.get('sent',[]),
  altar:    Store.get('altar',{}),      // iso -> {held:bool, notes:string}
  acts:     Store.get('acts',[]),       // iso strings
  roster:   Store.get('roster',null),
  rems:     Store.get('rems',null)
};
const nameOr = (v,f)=> (v&&v.trim()) ? v.trim() : f;

/* ---------- navigation ---------- */
function go(v){
  $$('.view').forEach(s=>s.classList.toggle('on', s.id==='v-'+v));
  const navView=['study','characters','reading'].includes(v)?'devo':v;
  $$('nav button').forEach(b=>{ const on=b.dataset.view===navView;
    on ? b.setAttribute('aria-current','page') : b.removeAttribute('aria-current'); });
  window.scrollTo({top:0,behavior:'instant'});
}
$$('nav button').forEach(b=>b.onclick=()=>go(b.dataset.view));
document.addEventListener('click',e=>{ const t=e.target.closest('[data-go]'); if(t) go(t.dataset.go); });

/* ============================================================
   HOME
   ============================================================ */
const ACTIONS = [
 ["Put your phone in another room for twenty minutes tonight and ask her about her day.","Time is the thing she named. Start with the cheapest version of it."],
 ["Take one chore tonight and announce that it is permanently yours now.","Service she did not have to ask for is the loudest kind."],
 ["Tell her one specific thing you noticed her do this week, and why it impressed you.","Specific praise lands. General praise sounds like a greeting card."],
 ["Hug her for six full seconds, counting, and do not ask for anything after it.","Affection that leads nowhere is the kind she can rest in."],
 ["Come home at the time you said, and if you cannot, call before you are late.","Reliability is a form of respect she can actually measure."],
 ["Bring something small home. Fruit, groundnut, puff-puff. Under five hundred francs.","The proof is not the size. It is that she was on your mind while you were out."],
 ["Lead fifteen minutes at the table tonight. One passage, one question, one prayer.","You said the children are not being trained. Fifteen minutes starts it."],
 ["Apologise for one specific thing with no explanation attached and no word 'but'.","An apology with a defence in it is not an apology."],
 ["Ask her the three questions on the Love page and write her answers down.","You cannot please her by guessing. She will tell you if you ask properly."],
 ["Sit next to her instead of opposite her tonight.","Small proximity changes the temperature of a conversation."],
 ["Praise her in front of the children this evening, out loud.","They are learning how a wife is treated by watching you."],
 ["Do the thing she has asked you three times to do. You know what it is.","Doing it now says her words register. Doing it later says they do not."],
 ["Ask her to lead the devotion tonight, and back her in front of the children.","Sharing the altar tells her she is a partner, not staff."],
 ["Plan one evening this week that is hers, tell her the day, and defend it.","A protected date beats a vague promise to spend more time."],
 ["Get up with the children in the night this week so she sleeps through.","Rest is a gift you can give her that costs you exactly what it should."],
 ["Walk with her. To the shop, around the quarter. Twenty minutes, side by side.","Walking makes talking easier than sitting face to face does."],
 ["Ask what she is worried about, and pray about it with her before you sleep.","Praying together is intimacy your church already expects of you."],
 ["Put her birthday and your wedding date in your phone with an alarm a week early.","Forgetting is a systems problem. Fix the system tonight."],
 ["Say thank you for something she does every day that nobody thanks her for.","Invisible work becomes bitter work when it stays invisible."],
 ["Do not correct her once today, in front of anyone.","Correction in public costs more than the correction is worth."],
 ["Ask her what she misses about how you used to be, and do not get defensive.","The answer is your instruction sheet. Write it down."],
 ["Text her at midday about nothing in particular.","A message with no request in it tells her she is not a task."],
 ["Cook or wash up tonight while she sits down.","Christ took a towel. Nothing makes you too senior for a basin."],
 ["Turn the television off during the meal, for everyone, including you.","The table cannot do its work while a screen is talking."],
 ["Tell her one thing you are praying for her, by name, today.","It tells her she occupies your prayers, not just your schedule."],
 ["Ask each child one real question at the table and listen to the whole answer.","She said the children are not being trained. Training starts with attention."],
 ["Let her sleep in on Saturday and handle the morning yourself.","One morning is a small price for a message she will feel all week."],
 ["Write two lines by hand and leave them where she will find them alone.","Handwriting proves time was spent. A typed message does not."],
 ["Ask her forgiveness for the months, not just for today.","Naming the season is what makes an apology feel true."],
 ["Do not check your phone once between coming home and the children sleeping.","She can tell where your attention is. So can they."]
];

function hydrateNames(){
  const w = nameOr(S.wifeName,'her');
  $$('.wname').forEach(e=>e.textContent=w);
}

function seedFor(d){ let h=dayIndex(d)*2654435761 % 2147483647; return Math.abs(h); }
let actIdx = Store.get('actIdx',null);
function renderAction(shuffle){
  const t=today();
  if(actIdx===null || shuffle) { actIdx = shuffle ? Math.floor(Math.random()*ACTIONS.length) : seedFor(t)%ACTIONS.length; Store.set('actIdx',actIdx); }
  const a=ACTIONS[actIdx];
  $('#actText').textContent=a[0]; $('#actWhy').textContent=a[1];
  const done = S.acts.includes(iso(t));
  $('#actDone').textContent = done ? 'Logged for today' : 'I did it';
  $('#actDone').disabled = done;
}
$('#actNew').onclick=()=>renderAction(true);
$('#actDone').onclick=()=>{ const k=iso(today());
  if(!S.acts.includes(k)){ S.acts.push(k); Store.set('acts',S.acts); }
  renderAction(); renderStreaks(); toast('Logged. Now do it again tomorrow.'); };

function runOf(list){
  let n=0, d=today();
  for(;;){ if(list.includes(iso(d))) { n++; d=addDays(d,-1); } else break; }
  if(n===0){ const y=addDays(today(),-1); if(list.includes(iso(y))){ let d2=y; while(list.includes(iso(d2))){n++; d2=addDays(d2,-1);} } }
  return n;
}
function renderStreaks(){
  const msgDays=[...new Set(S.sent.map(s=>s.d))];
  const altDays=Object.keys(S.altar).filter(k=>S.altar[k].held);
  const a=runOf(msgDays), b=runOf(altDays), c=S.acts.length;
  $('#stMsg').textContent=a; $('#stDev').textContent=b; $('#stAct').textContent=c;
  let w;
  if(a===0&&b===0&&c===0) w='Nothing logged yet. That is fine. Consistency has to start on some ordinary evening, and this is one.';
  else if(b>=14) w='Two weeks of the altar kept. Your children are now forming a memory of a father who leads. Do not break it for anything small.';
  else if(a>=7) w='A week of daily words. She may not have said anything about it yet. Keep going anyway, and give it a month before you look for a reaction.';
  else if(c>=10) w='Ten acts logged. Evans is right that love is as love does. This is what it looks like counted.';
  else w='Small and steady beats large and rare. Do not try to make up months in one weekend.';
  $('#streakWord').textContent=w;
}

function trackData(k){ return k==='little'?LITTLE : k==='char'?CHARS : k==='event'?EVENTS : CANON; }
function todaysEntry(){
  const r=S.roster; if(!r) return null;
  const t=iso(today()); const row=r.rows.find(x=>x.d===t); return row;
}
function renderTonight(){
  const row=todaysEntry();
  if(!row){ $('#todReading').hidden=true;
    $('#todLead').textContent='No roster yet. Build one and this will tell you who is leading tonight and what to read.'; return; }
  $('#todReading').hidden=false;
  $('#todLead').innerHTML='Leading tonight: <b>'+esc(row.w)+'</b>';
  $('#todRef').textContent=row.r; $('#todTtl').textContent=row.t;
  $('#todQa').innerHTML='<b>Ask the children</b><div>'+esc(row.q)+'</div><b>Pray for</b><div>'+esc(row.p)+'</div>';
}

/* ============================================================
   FIVE LOVES
   ============================================================ */
$('#loveList').innerHTML = LOVES.map(l=>
 '<details class="love"><summary><span class="mk">'+l.mk+'</span><span class="nm"><b>'+l.nm+'</b><i>'+l.sub+'</i></span><span class="caret">+</span></summary>'+
 '<div class="body"><div class="verse">'+l.v+'<cite>'+l.vr+'</cite></div><p>'+l.p+'</p><ul>'+
 l.d.map(x=>'<li>'+x+'</li>').join('')+'</ul></div></details>').join('');

$('#sevenDay').innerHTML = SEVEN.map(s=>
 '<div style="display:flex;gap:12px;padding:11px 0;border-top:1px solid var(--line-2)">'+
 '<div style="flex:0 0 46px;font-family:var(--ff-d);font-weight:700;font-size:13px;color:var(--rose-dark);padding-top:2px">'+s[0]+'</div>'+
 '<div style="flex:1"><b style="font-family:var(--ff-d);font-size:16px;display:block;margin-bottom:3px">'+s[1]+'</b>'+
 '<span style="font-size:14px;color:var(--ink-soft)">'+s[2]+'</span></div></div>').join('');

$('#tableTime').innerHTML = TABLETIME.map(t=>
 '<div style="display:flex;gap:12px;padding:10px 0;border-top:1px solid rgba(245,238,229,.11)">'+
 '<div style="flex:0 0 22px;font-family:var(--ff-d);font-weight:700;color:var(--rose)">'+t[0]+'</div>'+
 '<div style="flex:1"><b style="font-family:var(--ff-d);font-size:15.5px;display:block;color:var(--ivory)">'+t[1]+'</b>'+
 '<span style="font-size:13.6px;color:rgba(245,238,229,.66)">'+t[2]+'</span></div></div>').join('');

/* ============================================================
   WRITE
   ============================================================ */
$('#moodChips').innerHTML = MOODS.map(m=>
 '<button class="chip rose" data-mood="'+m.k+'" aria-pressed="'+(m.k===S.mood)+'">'+m.n+'</button>').join('');

function pool(){ return (MSG[S.mood]&&MSG[S.mood][S.tone]) || MSG.morn.sh; }
let lastLine='';
function pickLine(){
  const p=pool(); let s;
  for(let i=0;i<12;i++){ s=p[Math.floor(Math.random()*p.length)]; if(s!==lastLine) break; }
  lastLine=s;
  const n=nameOr(S.wifeName,'');
  return n ? s.replace(/\{N\}/g,n) : s.replace(/\s*\{N\}/g,'').replace(/\{N\}\s*/g,'');
}
function setMsg(v){ $('#msgText').value=v; countChars(); }
function countChars(){ const n=$('#msgText').value.length; $('#charCount').textContent=n+(n===1?' character':' characters'); }
$('#msgText').addEventListener('input',countChars);

$('#moodChips').onclick=e=>{ const b=e.target.closest('[data-mood]'); if(!b) return;
  S.mood=b.dataset.mood; Store.set('mood',S.mood);
  $$('#moodChips .chip').forEach(c=>c.setAttribute('aria-pressed', String(c.dataset.mood===S.mood)));
  setMsg(pickLine()); };
$('#toneChips').onclick=e=>{ const b=e.target.closest('[data-tone]'); if(!b) return;
  S.tone=b.dataset.tone; Store.set('tone',S.tone);
  $$('#toneChips .chip').forEach(c=>c.setAttribute('aria-pressed', String(c.dataset.tone===S.tone)));
  setMsg(pickLine()); };
$('#shuffle').onclick=()=>setMsg(pickLine());

$('#wName').oninput=e=>{ S.wifeName=e.target.value; Store.set('wifeName',S.wifeName); hydrateNames();
  if(!$('#rWif').value){ $('#rWif').value=S.wifeName; S.husName=S.husName; } };
$('#wPhone').oninput=e=>{ S.phone=e.target.value; Store.set('phone',S.phone); };

function logSent(text){
  S.sent.unshift({d:iso(today()), t:text, ts:Date.now()});
  S.sent=S.sent.slice(0,60); Store.set('sent',S.sent); renderSent(); renderStreaks();
}
function renderSent(){
  if(!S.sent.length){ $('#sentList').innerHTML=''; return; }
  $('#sentLede').textContent='The last few, so you do not repeat yourself two days running.';
  $('#sentList').innerHTML = S.sent.slice(0,8).map(s=>
   '<div style="padding:9px 0;border-top:1px solid var(--line-2);font-size:14px">'+
   '<div style="font-size:11.5px;color:var(--ink-soft);margin-bottom:2px">'+fmtShort(fromIso(s.d))+'</div>'+esc(s.t)+'</div>').join('');
}
$('#sendWa').onclick=()=>{
  const txt=$('#msgText').value.trim();
  if(!txt){ toast('Write something first.'); return; }
  const num=(S.phone||'').replace(/[^0-9]/g,'');
  const url = num ? 'https://wa.me/'+num+'?text='+encodeURIComponent(txt)
                  : 'https://wa.me/?text='+encodeURIComponent(txt);
  if(!num) toast('No number saved, so pick her from the WhatsApp list.');
  logSent(txt);
  window.open(url,'_blank','noopener');
};
$('#copyMsg').onclick=async()=>{
  const txt=$('#msgText').value.trim(); if(!txt){ toast('Nothing to copy.'); return; }
  try{ await navigator.clipboard.writeText(txt); toast('Copied.'); }
  catch(e){ $('#msgText').select(); document.execCommand&&document.execCommand('copy'); toast('Copied.'); }
};

/* ============================================================
   DEVOTION
   ============================================================ */
function planFor(d){
  const r=S.roster;
  if(r){ const row=r.rows.find(x=>x.d===iso(d)); if(row) return row; }
  const young = (typeof FAM!=='undefined') && FAM.kids.length && Math.max(...FAM.kids.map(k=>+k.age||0)) <= 7;
  const arr = young ? LITTLE : CANON, i=((dayIndex(d)%arr.length)+arr.length)%arr.length, e=arr[i];
  return {d:iso(d), w:'', r:e[0], t:e[1], q:e[2], p:e[3], fallback:true};
}
function renderDevo(){
  const d=fromIso($('#dDate').value||iso(today()));
  const isToday = iso(d)===iso(today());
  $('#bibleDate').textContent = (isToday?'Today, ':'')+fmtLong(d)+'. Choose a study, a character, or a reading plan.';

  const p=planFor(d);
  $('#planTitle').textContent = p.fallback ? 'Suggested family reading' : 'Your family reading';
  $('#planLede').textContent = p.fallback
    ? 'A suggested passage for your family. Build a roster to choose the track and the leader.'
    : (S.roster.trackName+'. Day '+(S.roster.rows.findIndex(x=>x.d===p.d)+1)+' of '+S.roster.rows.length+'.');
  $('#pRef').textContent=p.r; $('#pTtl').textContent=p.t;
  $('#pQa').innerHTML='<b>Ask them</b><div>'+esc(p.q)+'</div><b>Pray</b><div>'+esc(p.p)+'</div>';
  $('#pWho').textContent = p.w || 'not set';

  const rec=S.altar[iso(d)]||{};
  $('#dNotes').value = rec.notes||'';
  $('#dHeld').textContent = rec.held ? 'Altar kept \u2713' : 'We held the altar';
  $('#dStatus').textContent = rec.held ? 'Marked as kept on '+fmtLong(d)+'.' : '';
}
$('#dDate').onchange=renderDevo;
$('#dPrev').onclick=()=>{ $('#dDate').value=iso(addDays(fromIso($('#dDate').value),-1)); renderDevo(); };
$('#dNext').onclick=()=>{ $('#dDate').value=iso(addDays(fromIso($('#dDate').value), 1)); renderDevo(); };
$('#dToday').onclick=()=>{ $('#dDate').value=iso(today()); renderDevo(); };
$('#dHeld').onclick=()=>{ const k=$('#dDate').value; const r=S.altar[k]||{};
  r.held=!r.held; S.altar[k]=r; Store.set('altar',S.altar); renderDevo(); renderStreaks();
  toast(r.held?'Kept. That is the whole discipline.':'Unmarked.'); };
$('#dSave').onclick=()=>{ const k=$('#dDate').value; const r=S.altar[k]||{};
  r.notes=$('#dNotes').value; S.altar[k]=r; Store.set('altar',S.altar); toast('Saved on this phone.'); };

/* ============================================================
   ROSTER
   ============================================================ */
function buildRoster(){
  const hus=nameOr($('#rHus').value,'Husband'), wif=nameOr($('#rWif').value,'Wife');
  const track=$('#rTrack').value, weeks=+$('#rWeeks').value, turn=$('#rTurn').value;
  const start=fromIso($('#rStart').value||iso(today()));
  const arr=trackData(track), n=weeks*7, rows=[];
  const tn = track==='little' ? 'Little ones, built for under sixes'
    : track==='char' ? 'A Bible person a day'
    : track==='event' ? 'A Bible event a day' : 'Through the Bible';
  for(let i=0;i<n;i++){
    const d=addDays(start,i), e=arr[i%arr.length];
    let who;
    if(turn==='sun' && d.getDay()===0) who='Together';
    else if(turn==='1') who = (i%2===0)?hus:wif;
    else if(turn==='sun') who = (i%2===0)?hus:wif;
    else who = (Math.floor(i/7)%2===0)?hus:wif;
    rows.push({d:iso(d), w:who, r:e[0], t:e[1], q:e[2], p:e[3]});
  }
  S.roster={hus,wif,track,trackName:tn,turn,start:iso(start),weeks,rows};
  Store.set('roster',S.roster); Store.set('husName',hus); Store.set('wifeName',wif);
  S.husName=hus; S.wifeName=wif; hydrateNames();
  if(!$('#wName').value) $('#wName').value=wif;
  renderRoster(); renderTonight(); renderDevo();
  toast('Roster built. Print it and put it on the wall.');
}
function whoCls(w){ const r=S.roster; return w===r.hus?'h':w===r.wif?'w':'b'; }
function renderRoster(){
  const r=S.roster; if(!r) return;
  $('#rOut').hidden=false;
  $('#rTitle').textContent='Family altar roster';
  $('#rSub').textContent = r.trackName+'. '+fmtLong(fromIso(r.start))+' to '+fmtLong(fromIso(r.rows[r.rows.length-1].d))+'. '+r.hus+' and '+r.wif+'.';
  const tk=iso(today());
  $('#rTable').innerHTML='<thead><tr><th>Date</th><th>Leads</th><th>Reading</th></tr></thead><tbody>'+
   r.rows.map(x=>'<tr'+(x.d===tk?' class="tod"':'')+'><td class="dt">'+fmtShort(fromIso(x.d))+'</td>'+
   '<td class="who"><span class="'+whoCls(x.w)+'">'+esc(x.w)+'</span></td>'+
   '<td><span class="rf">'+esc(x.r)+'</span><span class="tt">'+esc(x.t)+'</span></td></tr>').join('')+'</tbody>';
}
$('#rGen').onclick=buildRoster;

/* ---- PDF, by way of a clean print sheet ---- */
$('#rPdf').onclick=()=>{
  const r=S.roster; if(!r){ toast('Build the roster first.'); return; }
  const w=window.open('','_blank');
  if(!w){ toast('Allow pop-ups, then try again.'); return; }
  const rowsHtml=r.rows.map(x=>'<tr><td class="d">'+fmtShort(fromIso(x.d))+'</td><td class="w">'+esc(x.w)+
    '</td><td><b>'+esc(x.r)+'</b><br><span class="t">'+esc(x.t)+'</span></td><td class="q">'+esc(x.q)+'</td></tr>').join('');
  w.document.write('<!doctype html><html><head><meta charset="utf-8"><title>Family altar roster</title><style>'+
   '@page{margin:15mm}body{font-family:Georgia,serif;color:#1C1A1B;font-size:10pt;line-height:1.4}'+
   'h1{font-size:19pt;margin:0 0 2px}p.s{margin:0 0 14px;color:#555;font-size:9.5pt}'+
   'table{width:100%;border-collapse:collapse}th{text-align:left;font-size:8.5pt;text-transform:none;'+
   'border-bottom:1.5pt solid #1C1A1B;padding:0 5px 5px;color:#444}'+
   'td{padding:6px 5px;border-bottom:.5pt solid #ccc;vertical-align:top}'+
   'td.d{white-space:nowrap;font-size:9pt;width:72px}td.w{white-space:nowrap;font-weight:bold;width:78px}'+
   'span.t{color:#666;font-size:8.5pt}td.q{color:#444;font-size:8.5pt;width:34%}'+
   'tr{page-break-inside:avoid}footer{margin-top:16px;font-size:8pt;color:#777;border-top:.5pt solid #ccc;padding-top:6px}'+
   '</style></head><body><h1>Family altar roster</h1><p class="s">'+esc(r.trackName)+'. '+
   fmtLong(fromIso(r.start))+' to '+fmtLong(fromIso(r.rows[r.rows.length-1].d))+'. Led by '+esc(r.hus)+' and '+esc(r.wif)+
   '.</p><table><thead><tr><th>Date</th><th>Leads</th><th>Reading</th><th>Question for the children</th></tr></thead><tbody>'+
   rowsHtml+'</tbody></table><footer>Our Kingdom Home &middot; Buea. Bible studies, character studies, and family reading.</footer></body></html>');
  w.document.close();
  setTimeout(()=>{ w.focus(); w.print(); }, 400);
  toast('Choose Save as PDF in the print sheet.');
};

/* ---- a genuine .docx, written by hand ---- */
function crc32(b){
  let t=crc32.t;
  if(!t){ t=crc32.t=new Int32Array(256);
    for(let n=0;n<256;n++){ let c=n; for(let k=0;k<8;k++) c=(c&1)?(0xEDB88320^(c>>>1)):(c>>>1); t[n]=c; } }
  let c=-1; for(let i=0;i<b.length;i++) c=(c>>>8)^t[(c^b[i])&255];
  return (c^-1)>>>0;
}
function zip(files){
  const enc=new TextEncoder(), locals=[], central=[]; let off=0;
  const u16=n=>[n&255,(n>>8)&255], u32=n=>[n&255,(n>>8)&255,(n>>16)&255,(n>>24)&255];
  files.forEach(f=>{
    const nm=enc.encode(f.n), data=enc.encode(f.c), cr=crc32(data), sz=data.length;
    const lh=[].concat([80,75,3,4],u16(20),u16(0),u16(0),u16(0),u16(0),u32(cr),u32(sz),u32(sz),u16(nm.length),u16(0));
    locals.push(new Uint8Array(lh), nm, data);
    central.push([].concat([80,75,1,2],u16(20),u16(20),u16(0),u16(0),u16(0),u16(0),u32(cr),u32(sz),u32(sz),
      u16(nm.length),u16(0),u16(0),u16(0),u16(0),u32(0),u32(off)), nm);
    off += lh.length + nm.length + sz;
  });
  const cdParts=[]; let cdLen=0;
  for(let i=0;i<central.length;i+=2){ const a=new Uint8Array(central[i]); cdParts.push(a,central[i+1]); cdLen+=a.length+central[i+1].length; }
  const eocd=new Uint8Array([].concat([80,75,5,6],u16(0),u16(0),u16(files.length),u16(files.length),u32(cdLen),u32(off),u16(0)));
  const total=off+cdLen+eocd.length, out=new Uint8Array(total); let p=0;
  locals.forEach(a=>{out.set(a,p);p+=a.length;}); cdParts.forEach(a=>{out.set(a,p);p+=a.length;}); out.set(eocd,p);
  return new Blob([out],{type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
}
const xe=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
function docxRoster(){
  const r=S.roster;
  const P=(txt,{sz=22,b=0,i=0,after=120,color='1C1A1B',align='left'}={})=>
    '<w:p><w:pPr><w:spacing w:after="'+after+'"/><w:jc w:val="'+align+'"/></w:pPr><w:r><w:rPr>'+
    (b?'<w:b/>':'')+(i?'<w:i/>':'')+'<w:sz w:val="'+sz+'"/><w:color w:val="'+color+'"/></w:rPr>'+
    '<w:t xml:space="preserve">'+xe(txt)+'</w:t></w:r></w:p>';
  const CELL=(txt,{w=1800,b=0,sz=18,color='1C1A1B',shade=''}={})=>
    '<w:tc><w:tcPr><w:tcW w:w="'+w+'" w:type="dxa"/>'+(shade?'<w:shd w:val="clear" w:fill="'+shade+'"/>':'')+
    '</w:tcPr><w:p><w:pPr><w:spacing w:after="20"/></w:pPr><w:r><w:rPr>'+(b?'<w:b/>':'')+
    '<w:sz w:val="'+sz+'"/><w:color w:val="'+color+'"/></w:rPr><w:t xml:space="preserve">'+xe(txt)+'</w:t></w:r></w:p></w:tc>';
  const head='<w:tr><w:trPr><w:tblHeader/></w:trPr>'+
    CELL('Date',{w:1400,b:1,shade:'1C1A1B',color:'F5EEE5'})+CELL('Leads',{w:1500,b:1,shade:'1C1A1B',color:'F5EEE5'})+
    CELL('Reading',{w:2600,b:1,shade:'1C1A1B',color:'F5EEE5'})+CELL('Question for the children',{w:3800,b:1,shade:'1C1A1B',color:'F5EEE5'})+'</w:tr>';
  const body=r.rows.map((x,n)=>'<w:tr>'+
    CELL(fmtShort(fromIso(x.d)),{w:1400,shade:n%2?'F7F2EA':''})+
    CELL(x.w,{w:1500,b:1,shade:n%2?'F7F2EA':''})+
    CELL(x.r+' \u2014 '+x.t,{w:2600,shade:n%2?'F7F2EA':''})+
    CELL(x.q,{w:3800,shade:n%2?'F7F2EA':''})+'</w:tr>').join('');
  const borders='<w:tblBorders>'+['top','left','bottom','right','insideH','insideV'].map(s=>
    '<w:'+s+' w:val="single" w:sz="4" w:space="0" w:color="C9BFB2"/>').join('')+'</w:tblBorders>';
  const doc='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
   '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'+
   P('Family altar roster',{sz:40,b:1}) +
   P(r.trackName+'.  '+fmtLong(fromIso(r.start))+' to '+fmtLong(fromIso(r.rows[r.rows.length-1].d))+'.',{sz:20,color:'5A5250'})+
   P('Led by '+r.hus+' and '+r.wif+'.',{sz:20,i:1,color:'5A5250',after:240})+
   '<w:tbl><w:tblPr><w:tblW w:w="9300" w:type="dxa"/>'+borders+'</w:tblPr>'+
   '<w:tblGrid><w:gridCol w:w="1400"/><w:gridCol w:w="1500"/><w:gridCol w:w="2600"/><w:gridCol w:w="3800"/></w:tblGrid>'+
   head+body+'</w:tbl>'+
   P('',{after:200})+
   P('Our Kingdom Home, Buea. Bible studies for husband and wife. Children’s devotional: Sincere Milk, Deeper Christian Life Ministry.',{sz:16,i:1,color:'7A716E'})+
   '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1000" w:right="900" w:bottom="1000" w:left="900"/></w:sectPr>'+
   '</w:body></w:document>';
  return zip([
   {n:'[Content_Types].xml',c:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>'},
   {n:'_rels/.rels',c:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'},
   {n:'word/_rels/document.xml.rels',c:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"/>'},
   {n:'word/document.xml',c:doc}
  ]);
}
function dl(blob,name){ const u=URL.createObjectURL(blob), a=document.createElement('a');
  a.href=u; a.download=name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(u),3000); }
$('#rDocx').onclick=()=>{ if(!S.roster){ toast('Build the roster first.'); return; }
  dl(docxRoster(),'family-altar-roster.docx'); toast('Downloaded. Opens in Word or Google Docs.'); };

/* ============================================================
   REMINDERS
   ============================================================ */
const DEFREM=[
  {t:'06:30', n:'Send her a morning word', s:'One line before the day swallows you.', on:true},
  {t:'12:30', n:'Midday message',           s:'Something specific about today. No request in it.', on:false},
  {t:'19:45', n:'Family altar in 15 minutes', s:'Food off the fire, phones down, gather.', on:true},
  {t:'21:00', n:'Twenty minutes with her',  s:'Phone in another room. Ask, then listen.', on:true}
];
if(!S.rems){ S.rems=DEFREM; Store.set('rems',S.rems); }
function renderRems(){
  $('#remList').innerHTML=S.rems.map((r,i)=>
   '<div class="rem"><div class="tm">'+r.t+'</div><div class="nfo"><b>'+esc(r.n)+'</b><small>'+esc(r.s)+'</small></div>'+
   '<button class="sw" role="switch" aria-checked="'+r.on+'" data-i="'+i+'" aria-label="Turn '+esc(r.n)+' '+(r.on?'off':'on')+'"></button></div>').join('');
}
$('#remList').onclick=e=>{ const b=e.target.closest('.sw'); if(!b) return;
  const i=+b.dataset.i; S.rems[i].on=!S.rems[i].on; Store.set('rems',S.rems); renderRems();
  toast(S.rems[i].on?'On, while the app is open.':'Off.'); };

let fired={};
setInterval(()=>{
  const n=new Date(), hm=String(n.getHours()).padStart(2,'0')+':'+String(n.getMinutes()).padStart(2,'0');
  const key=iso(n)+hm;
  S.rems.forEach(r=>{
    if(!r.on || r.t!==hm || fired[key+r.n]) return;
    fired[key+r.n]=1;
    if('Notification' in window && Notification.permission==='granted'){
      try{ new Notification(r.n,{body:r.s,tag:r.n}); }catch(e){ toast(r.n); }
    } else toast(r.n+'. '+r.s);
  });
},20000);

function notifState(){
  const el=$('#notifState');
  if(!('Notification' in window)){ el.textContent='This browser cannot show notifications. Use the calendar file below.'; return; }
  const p=Notification.permission;
  el.textContent = p==='granted' ? 'Allowed. Nudges will show while this app is open.'
    : p==='denied' ? 'Blocked for this site. Turn it back on in your browser site settings, or use the calendar file.'
    : 'Not asked yet.';
}
$('#notifAsk').onclick=async()=>{
  if(!('Notification' in window)){ toast('Not supported here. Use the calendar file.'); return; }
  try{ await Notification.requestPermission(); }catch(e){}
  notifState();
};

/* ---- ICS, the alarms that actually fire when the app is closed ---- */
$('#icsBtn').onclick=()=>{
  const on=S.rems.filter(r=>r.on);
  if(!on.length){ toast('Turn on at least one nudge first.'); return; }
  const st=new Date(); const pad=n=>String(n).padStart(2,'0');
  const stamp=d=>d.getUTCFullYear()+pad(d.getUTCMonth()+1)+pad(d.getUTCDate())+'T'+pad(d.getUTCHours())+pad(d.getUTCMinutes())+'00Z';
  const local=(d,hm)=>{const[h,m]=hm.split(':'); return d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())+'T'+h+m+'00';};
  const w=nameOr(S.wifeName,'her');
  let out=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Kingdom Home//Buea//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH',
           'X-WR-CALNAME:Kingdom Home'];
  on.forEach((r,i)=>{
    const desc=r.s.replace(/,/g,'\\,').replace(/\n/g,'\\n')+' (for '+w+')';
    out.push('BEGIN:VEVENT','UID:kh-'+i+'-'+Date.now()+'@kingdomhome','DTSTAMP:'+stamp(new Date()),
      'DTSTART:'+local(st,r.t),'DURATION:PT15M','RRULE:FREQ=DAILY',
      'SUMMARY:'+r.n.replace(/,/g,'\\,'),'DESCRIPTION:'+desc,
      'BEGIN:VALARM','TRIGGER:PT0M','ACTION:DISPLAY','DESCRIPTION:'+r.n.replace(/,/g,'\\,'),'END:VALARM','END:VEVENT');
  });
  out.push('END:VCALENDAR');
  dl(new Blob([out.join('\r\n')],{type:'text/calendar;charset=utf-8'}),'kingdom-home-reminders.ics');
  toast('Open the file and add it to your calendar.');
};

/* ============================================================
   SET UP: reference lists, export, wipe
   ============================================================ */
$('#tonyList').innerHTML=TONY.map(t=>
 '<div style="padding:12px 0;border-top:1px solid var(--line-2)"><b style="font-family:var(--ff-d);font-size:16.5px;display:block;margin-bottom:3px">'+t[0]+'</b>'+
 '<span style="font-size:14.1px;color:var(--ink-soft)">'+t[1]+'</span></div>').join('');
$('#tenetList').innerHTML=TENETS.map(t=>'<div>'+t+'</div>').join('');
$('#rhythmList').innerHTML=RHYTHM.map(r=>
 '<div style="display:flex;gap:11px;padding:8px 0;border-top:1px solid var(--line-2);font-size:13.8px">'+
 '<b style="flex:0 0 62px;font-family:var(--ff-d)">'+r[0]+'</b><span style="color:var(--ink-soft)">'+r[1]+'</span></div>').join('');

$('#expBtn').onclick=()=>{
  const out={_app:'kingdom-home', _at:new Date().toISOString()};
  SYNCED.forEach(k=>{ const v=Store.get(k,null); if(v!==null) out[k]=v; });
  const who=(nameOr(S.husName,'')||'phone').toLowerCase().replace(/[^a-z0-9]/g,'')||'phone';
  dl(new Blob([JSON.stringify(out,null,2)],{type:'application/json'}), 'kingdom-home-'+who+'-'+iso(today())+'.json');
  toast('Saved. Send it to her on WhatsApp.');
};
$('#impBtn').onclick=()=>$('#impFile').click();
$('#impFile').onchange=async e=>{
  const f=e.target.files&&e.target.files[0]; if(!f) return;
  const st=$('#impState');
  try{
    const d=JSON.parse(await f.text());
    const r=mergeIn(d);
    st.textContent='Merged'+(r.touched.length?': '+r.touched.join(', '):'')+
      (r.addedNotes?'. '+r.addedNotes+' of her altar notes were added under yours':'')+'. Reloading.';
    toast('Merged, nothing overwritten.');
    setTimeout(()=>location.reload(),1200);
  }catch(err){ st.textContent='Could not read that file: '+err.message; }
  e.target.value='';
};
$('#wipeBtn').onclick=()=>{
  if(!confirm('Erase names, number, notes, roster and streaks from this phone? This cannot be undone.')) return;
  Store.wipe(); location.reload();
};

/* ============================================================
   BOOT
   ============================================================ */
(function boot(){
  document.getElementById('bgphoto').style.backgroundImage="url('./img/bg.jpg')";
  document.getElementById('heroimg').src='./img/hero.jpg';

  const t=today();
  $('#heroDate').textContent=fmtLong(t);
  const lines=['Love is as love does.','She needs your presence, not your promises.','Twenty minutes tonight. Phone in another room.',
    'What you do at the table shapes what they believe.','Turn up before you explain.'];
  $('#heroLine').textContent=lines[dayIndex(t)%lines.length];

  $('#wName').value=S.wifeName; $('#wPhone').value=S.phone;
  $('#rWif').value=S.wifeName||''; $('#rHus').value=S.husName||'';
  $('#dDate').value=iso(t); $('#rStart').value=iso(t);
  $$('#toneChips .chip').forEach(c=>c.setAttribute('aria-pressed',String(c.dataset.tone===S.tone)));

  hydrateNames(); renderAction(); renderStreaks(); renderSent();
  if(S.roster) renderRoster();
  renderTonight(); renderDevo(); renderRems(); notifState();
  setMsg(pickLine());

  registerSW();
})();

/* ============================================================
   GROQ. Writes a line from what actually happened today.
   The whole trick is specificity plus a hard ban list.
   ============================================================ */

const G = {
  mode:  Store.get('gMode','server'),
  key:   Store.get('gKey',''),
  model: Store.get('gModel','openai/gpt-oss-120b'),
  ep:    Store.get('gEndpoint','/api/write')
};

const MOODLABEL = {morn:'a good morning message', miss:'telling her he misses her',
  thx:'thanking her', sorry:'apologising', time:'offering her his time',
  faith:'something about God or prayer', play:'light and flirty, nothing crude',
  mum:'encouraging her as a mother', night:'a goodnight message'};

/* The system prompt lives here and in api/write.js. Keep them the same. */
function groqSystem(tone){
  const voice = tone==='pd'
    ? 'Cameroonian Pidgin as spoken in Buea. Words like: na, dey, don, wetin, sabi, comot, pikin, wahala, small small, no be so. Keep it readable, not thick.'
    : 'plain English with texting shorthand. u, ur, 4, 2, b4, 2nite, 2mrw, gud, luv, thx, pls, abt, rmbr. Lower case is fine.';
  return [
"You draft one-line WhatsApp messages that a Cameroonian husband in Buea sends to his own wife. You are writing AS him, in his voice. He is a Deeper Life Bible Church member. His marriage is strained because he has not been giving her time, and he is trying to repair it.",
"",
"VOICE: "+voice,
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
"Return strict JSON only: {\"lines\":[\"...\",\"...\",\"...\"]}. Three different lines, no numbering, no commentary."
  ].join("\n");
}
function groqUser(mood, name, ctx){
  const bits = ['Mood wanted: '+(MOODLABEL[mood]||'a warm message')+'.'];
  if(name) bits.push('Her name is '+name+'. Use it in at most one of the three lines.');
  bits.push(ctx && ctx.trim()
    ? 'What actually happened today, use this, it is the point: '+ctx.trim()
    : 'He gave no detail today, so keep the lines very plain and ordinary. Do not invent events that may not have happened.');
  return bits.join('\n');
}

function parseLines(txt){
  if(!txt) return [];
  txt = String(txt).replace(/<think>[\s\S]*?<\/think>/gi,'').trim();
  const fence = txt.match(/```(?:json)?([\s\S]*?)```/); if(fence) txt = fence[1].trim();
  try{ const j = JSON.parse(txt);
    if(Array.isArray(j.lines)) return j.lines.filter(Boolean).map(String); }catch(e){}
  const g = txt.match(/\{[\s\S]*\}/);
  if(g){ try{ const j=JSON.parse(g[0]); if(Array.isArray(j.lines)) return j.lines.filter(Boolean).map(String); }catch(e){} }
  return txt.split('\n').map(s=>s.replace(/^\s*(?:[-*\u2022]|\d+[.)])\s*/,'').replace(/^["'\u201c]|["'\u201d]$/g,'').trim())
            .filter(s=>s.length>4).slice(0,3);
}

async function groqCall(mood, tone, ctx){
  const name = nameOr(S.wifeName,'');
  if(G.mode==='server'){
    const r = await fetch(G.ep||'/api/write', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({mood, tone, context:ctx, name, model:G.model})
    });
    const j = await r.json().catch(()=>({}));
    if(!r.ok) throw new Error(j.error || ('The site returned '+r.status+'. Is /api/write deployed and GROQ_API_KEY set?'));
    return j.lines || parseLines(j.text);
  }
  if(!G.key) throw new Error('No key saved. Open Set up and paste your Groq key.');
  const r = await fetch('https://api.groq.com/openai/v1/chat/completions',{
    method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer '+G.key},
    body: JSON.stringify({ model:G.model, temperature:1.05, top_p:0.95, max_tokens:600,
      reasoning_effort:'low', response_format:{type:'json_object'},
      messages:[{role:'system',content:groqSystem(tone)},{role:'user',content:groqUser(mood,name,ctx)}] })
  });
  const j = await r.json().catch(()=>({}));
  if(!r.ok) throw new Error((j.error&&j.error.message) || ('Groq returned '+r.status));
  return parseLines(j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content);
}

$('#gWrite').onclick = async ()=>{
  const b=$('#gWrite'), out=$('#gOut');
  b.disabled=true; b.textContent='Writing...';
  out.innerHTML='<p style="font-size:13.4px;color:var(--ink-soft);margin:0">Thinking of three ways to say it.</p>';
  try{
    const lines = await groqCall(S.mood, S.tone, $('#gCtx').value);
    if(!lines.length) throw new Error('Nothing came back. Try again, or write it yourself.');
    out.innerHTML = lines.slice(0,3).map((l,i)=>
      '<button class="btn ghost full" data-pick="'+i+'" style="text-align:left;justify-content:flex-start;margin-bottom:8px;'+
      'white-space:normal;line-height:1.45;padding:12px 14px;font-weight:400;font-size:15px">'+esc(l)+'</button>').join('')
      + '<p style="font-size:12.4px;color:var(--ink-soft);margin:2px 0 0">Tap one to load it above, then edit it.</p>';
    out.querySelectorAll('[data-pick]').forEach((el,i)=>el.onclick=()=>{
      setMsg(lines[i]); toast('Loaded. Now change a word.');
      window.scrollTo({top:$('#msgText').getBoundingClientRect().top+window.scrollY-140,behavior:'smooth'}); });
  }catch(e){
    out.innerHTML='<p class="note" style="margin:0;border-left-color:var(--rose-deep)"><b>Did not work.</b> '+esc(e.message)+
      ' The written lines above still work without any of this.</p>';
  }
  b.disabled=false; b.textContent='Write three lines';
};

/* ---- Groq settings ---- */
function gModeUI(){
  $$('#gModeChips .chip').forEach(c=>c.setAttribute('aria-pressed',String(c.dataset.gmode===G.mode)));
  $('#gServerBox').hidden  = G.mode!=='server';
  $('#gBrowserBox').hidden = G.mode!=='browser';
}
$('#gModeChips').onclick=e=>{ const b=e.target.closest('[data-gmode]'); if(!b) return;
  G.mode=b.dataset.gmode; Store.set('gMode',G.mode); gModeUI(); };
$('#gKey').oninput      = e=>{ G.key=e.target.value.trim(); Store.set('gKey',G.key); };
$('#gEndpoint').oninput = e=>{ G.ep=e.target.value.trim()||'/api/write'; Store.set('gEndpoint',G.ep); };
$('#gModel').onchange   = e=>{ G.model=e.target.value; Store.set('gModel',G.model); };

$('#gLoadModels').onclick=async()=>{
  const st=$('#gState');
  if(G.mode!=='browser' || !G.key){ st.textContent='Switch to key on this phone and paste a key first. Model names change often, so the list is worth pulling.'; return; }
  st.textContent='Loading...';
  try{
    const r=await fetch('https://api.groq.com/openai/v1/models',{headers:{'Authorization':'Bearer '+G.key}});
    const j=await r.json();
    if(!r.ok) throw new Error((j.error&&j.error.message)||('Groq returned '+r.status));
    const ids=(j.data||[]).map(m=>m.id).filter(id=>!/whisper|tts|guard|safeguard|embed/i.test(id)).sort();
    if(!ids.length) throw new Error('No chat models returned.');
    $('#gModel').innerHTML=ids.map(i=>'<option value="'+esc(i)+'">'+esc(i)+'</option>').join('');
    if(ids.includes(G.model)) $('#gModel').value=G.model; else { G.model=$('#gModel').value; Store.set('gModel',G.model); }
    st.textContent=ids.length+' models loaded from your account.';
  }catch(e){ st.textContent='Could not load: '+e.message; }
};
$('#gTest').onclick=async()=>{
  const st=$('#gState'); st.textContent='Testing...';
  try{ const l=await groqCall('thx',S.tone,'she cooked achu on a night i came home late');
    st.textContent = l.length ? 'Working. It wrote: '+l[0] : 'Connected, but nothing came back.';
  }catch(e){ st.textContent='Failed: '+e.message; }
};

/* ============================================================
   SUPABASE. Optional. Both phones, one household.
   ============================================================ */
const SB = { url:Store.get('sbUrl',''), key:Store.get('sbKey',''), code:Store.get('sbCode','') };
['#sbUrl','#sbKey','#sbCode'].forEach(sel=>{
  const k = sel==='#sbUrl'?'url':sel==='#sbKey'?'key':'code';
  $(sel).oninput = e=>{ SB[k]=e.target.value.trim(); Store.set('sb'+k[0].toUpperCase()+k.slice(1),SB[k]); };
});
$('#sbGen').onclick=()=>{
  const a=new Uint8Array(18); (crypto.getRandomValues?crypto.getRandomValues(a):a.forEach((_,i)=>a[i]=Math.random()*256));
  SB.code=[...a].map(b=>'abcdefghjkmnpqrstuvwxyz23456789'[b%31]).join('');
  $('#sbCode').value=SB.code; Store.set('sbCode',SB.code);
  toast('Type this same code on her phone.');
};
async function rpc(fn, args){
  if(!SB.url||!SB.key||!SB.code) throw new Error('Fill in the URL, the anon key and a household code.');
  const r=await fetch(SB.url.replace(/\/+$/,'')+'/rest/v1/rpc/'+fn,{
    method:'POST', headers:{'Content-Type':'application/json','apikey':SB.key,'Authorization':'Bearer '+SB.key},
    body:JSON.stringify(args)});
  const t=await r.text(); let j=null; try{ j=JSON.parse(t); }catch(e){}
  if(!r.ok) throw new Error((j&&(j.message||j.hint))||t.slice(0,140)||('Supabase returned '+r.status));
  return j;
}
/* Merging two phones properly. Last-write-wins loses notes, so nothing here
   overwrites content with emptiness. Both of you can add on the same day. */
function mergeIn(d){
  if(!d || typeof d!=='object') throw new Error('That file is not a Kingdom Home backup.');
  const parse = v => typeof v==='string' ? (()=>{try{return JSON.parse(v)}catch(e){return v}})() : v;
  const get = k => parse(d[k]);
  let touched=[];

  // names, number, family profile: take theirs only where this phone is blank
  ['wifeName','husName','phone'].forEach(k=>{
    const v=get(k); if(v && !Store.get(k,'')) { Store.set(k,v); touched.push(k); }
  });
  const fam=get('fam');
  if(fam && fam.kids){
    const mine=Store.get('fam',null);
    if(!mine || !mine.kids.some(k=>k.n)) { Store.set('fam',fam); touched.push('family'); }
    else { // fill in only the blanks, so her name-card wording is not wiped
      fam.kids.forEach((k,i)=>{ if(mine.kids[i]){ ['n','mean','verse'].forEach(f=>{ if(!mine.kids[i][f] && k[f]) mine.kids[i][f]=k[f]; }); }});
      Store.set('fam',mine); touched.push('family');
    }
  }

  // altar: merge by date. Keep held if either held. Keep the longer note.
  const inAlt=get('altar')||{}, myAlt=Store.get('altar',{});
  let addedNotes=0;
  Object.keys(inAlt).forEach(day=>{
    const a=inAlt[day]||{}, b=myAlt[day]||{};
    const held = a.held || b.held;
    let notes = b.notes||'';
    if(a.notes && a.notes!==notes){
      notes = notes ? (notes.trim()+'\n'+a.notes.trim()) : a.notes;   // keep both
      addedNotes++;
    }
    myAlt[day]={held, notes};
  });
  Store.set('altar',myAlt); if(Object.keys(inAlt).length) touched.push('altar record');

  // practices started: keep the earliest date either of you marked
  const inDone=get('done')||{}, myDone=Store.get('done',{});
  Object.keys(inDone).forEach(id=>{
    if(!myDone[id] || inDone[id]<myDone[id]) myDone[id]=inDone[id];
  });
  Store.set('done',myDone); if(Object.keys(inDone).length) touched.push('practices');

  // acts and sent messages: union, no duplicates
  const acts=[...new Set([...(Store.get('acts',[])), ...((get('acts'))||[])])];
  Store.set('acts',acts);
  const seen=new Set(), sent=[...(Store.get('sent',[])), ...((get('sent'))||[])]
    .filter(s=>{ const k=(s.ts||'')+'|'+s.t; if(seen.has(k)) return false; seen.add(k); return true; })
    .sort((a,b)=>(b.ts||0)-(a.ts||0)).slice(0,60);
  Store.set('sent',sent);

  // the box: take whichever phone has more entries logged
  const inBox=get('box');
  if(inBox && (inBox.log||[]).length > (Store.get('box',{log:[]}).log||[]).length){ Store.set('box',inBox); touched.push('the box'); }

  // roster and reminders: take theirs if this phone has none
  const ros=get('roster'); if(ros && !Store.get('roster',null)){ Store.set('roster',ros); touched.push('roster'); }
  const rem=get('rems');   if(rem && !Store.get('rems',null))  { Store.set('rems',rem); }

  if(typeof mergeBibleRecords==='function') mergeBibleRecords(get,touched);

  return {touched:[...new Set(touched)], addedNotes};
}

// What travels between the two phones. Deliberately excluded: the Groq key,
// the Supabase connection details themselves, and per-phone preferences like
// which mood chip you last tapped.
const SYNCED=[
  'wifeName','husName','phone',   // who you are
  'fam',                          // ages, children's names, name-card meanings and verses
  'roster','altar','acts','sent', // the roster, the altar record and notes, acts, messages sent
  'done','box',                   // practices started, the give/save/spend box
  'rems',                         // reminder times
  'bibleStudies','bibleCharacters','bibleReading','biblePassages'
];
$('#sbPush').onclick=async()=>{
  const st=$('#sbState'); st.textContent='Sending...';
  try{ const payload={}; SYNCED.forEach(k=>payload[k]=Store.get(k,null));
    await rpc('kh_push',{p_code:SB.code,p_data:payload});
    st.textContent='Sent at '+new Date().toLocaleTimeString()+'. Pull it down on her phone.';
    toast('Sent up.');
  }catch(e){ st.textContent='Failed: '+e.message; }
};
$('#sbPull').onclick=async()=>{
  const st=$('#sbState'); st.textContent='Pulling...';
  try{
    const d=await rpc('kh_pull',{p_code:SB.code});
    if(!d || !Object.keys(d).length){ st.textContent='Nothing stored under that code yet. Send this phone up first.'; return; }
    const r=mergeIn(d);
    st.textContent='Merged'+(r.touched.length?': '+r.touched.join(', '):'')+'. Reloading.';
    setTimeout(()=>location.reload(),900);
  }catch(e){ st.textContent='Failed: '+e.message; }
};

/* ============================================================
   SERVICE WORKER. This is what makes Install appear on Android.
   ============================================================ */
function registerSW(){
  if(!('serviceWorker' in navigator)) return;
  if(location.protocol==='file:') return;   // needs http or https
  navigator.serviceWorker.register('./sw.js').catch(()=>{});
}
let deferredPrompt=null;
window.addEventListener('beforeinstallprompt',e=>{
  e.preventDefault(); deferredPrompt=e;
  const b=document.getElementById('installBtn'); if(b){ b.hidden=false;
    b.onclick=async()=>{ b.disabled=true; deferredPrompt.prompt();
      await deferredPrompt.userChoice; deferredPrompt=null; b.hidden=true; }; }
});

/* ---- restore the new settings on load ---- */
(function settingsBoot(){
  $('#gKey').value=G.key; $('#gEndpoint').value=G.ep;
  if(![...$('#gModel').options].some(o=>o.value===G.model))
    $('#gModel').insertAdjacentHTML('afterbegin','<option value="'+esc(G.model)+'">'+esc(G.model)+'</option>');
  $('#gModel').value=G.model; gModeUI();
  $('#sbUrl').value=SB.url; $('#sbKey').value=SB.key; $('#sbCode').value=SB.code;
  $('#gState').textContent = G.mode==='server'
    ? 'Using your deployed site at '+G.ep+'. Nothing to paste here.'
    : (G.key ? 'A key is saved on this phone.' : 'No key saved yet.');
})();
