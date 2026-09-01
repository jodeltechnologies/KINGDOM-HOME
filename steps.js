
/* ============================================================
   THE STEPS TAB. What the Evans family actually did, tuned to
   a household of 36, 33, and children of 5, 4 and 1.
   ============================================================ */

const FAM = Store.get('fam', {
  hisAge:36, herAge:33,
  kids:[{n:'',age:5,mean:'',verse:''},{n:'',age:4,mean:'',verse:''},{n:'',age:1,mean:'',verse:''}]
});
const saveFam = ()=>Store.set('fam',FAM);
const eldest = ()=>Math.max(...FAM.kids.map(k=>+k.age||0), 0);

let DONE = Store.get('done',{});          // practice id -> iso date first done
const GROUPS = [...new Set(PRACTICES.map(p=>p.g))];
let pFilter = Store.get('pFilter','now');

function practiceCounts(){
  const now = PRACTICES.filter(p=>p.start==='now' || eldest()>=p.start);
  return {now:now.length, done:now.filter(p=>DONE[p.id]).length, all:PRACTICES.length};
}

function renderPractices(){
  const el=$('#pracList'); if(!el) return;
  const e=eldest();
  const show = p => pFilter==='all' ? true
    : pFilter==='now' ? (p.start==='now' || e>=p.start)
    : (p.start!=='now' && e<p.start);
  let html='';
  GROUPS.forEach(g=>{
    const items=PRACTICES.filter(p=>p.g===g && show(p));
    if(!items.length) return;
    html += '<h3 style="font-family:var(--ff-d);font-size:13px;letter-spacing:.06em;color:var(--rose-dark);'+
            'margin:20px 0 4px;font-style:italic">'+esc(g)+'</h3>';
    html += items.map(p=>{
      const later = p.start!=='now' && e<p.start;
      const on = !!DONE[p.id];
      return '<details class="love"><summary>'+
        '<span class="mk" style="'+(on?'background:var(--leaf);color:#fff':(later?'background:var(--ivory-2);color:var(--ink-soft)':''))+'">'+
        (on?'\u2713':(later?String(p.start):'\u00b7'))+'</span>'+
        '<span class="nm"><b>'+esc(p.t)+'</b><i>'+(later?'Wait until your eldest is '+p.start
          : on ? 'Started '+fmtShort(fromIso(DONE[p.id])) : 'You can start this today')+'</i></span>'+
        '<span class="caret">+</span></summary>'+
        '<div class="body"><p><b style="font-family:var(--ff-d)">What he did.</b> '+esc(p.e)+'</p>'+
        '<p style="background:rgba(99,118,79,.09);border-left:2.5px solid var(--leaf-soft);padding:10px 12px;'+
        'border-radius:0 8px 8px 0"><b style="color:var(--leaf);font-family:var(--ff-d)">In your house, with a 5, a 4 and a 1 year old.</b> '+esc(p.y)+'</p>'+
        (later?'':'<button class="btn '+(on?'ghost':'leaf')+' sm" data-prac="'+p.id+'">'+
          (on?'Started, tap to undo':'Mark it started')+'</button>')+
        '</div></details>';
    }).join('');
  });
  el.innerHTML = html || '<p class="lede" style="margin:0">Nothing in this list yet.</p>';
  const c=practiceCounts();
  $('#pracCount').textContent = c.done+' of '+c.now;
  $('#pracBar').style.width = (c.now? Math.round(c.done/c.now*100):0)+'%';
  $('#pracWord').textContent = c.done===0
    ? 'Nothing started. Pick the table first. Everything else in the book hangs off the evening meal.'
    : c.done<5 ? 'A start. Do not add a sixth until the first five are automatic.'
    : c.done<15 ? 'This is now a pattern rather than a burst. Keep the table at the centre of it.'
    : 'Most of what he describes is running in your house. The remaining ones are waiting on your children\u2019s ages, not on you.';
}
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-prac]'); if(!b) return;
  const id=b.dataset.prac;
  if(DONE[id]) delete DONE[id]; else DONE[id]=iso(today());
  Store.set('done',DONE); renderPractices();
  toast(DONE[id]?'Started. Now keep it for a month.':'Unmarked.');
});
$('#pracChips').onclick=e=>{ const b=e.target.closest('[data-pf]'); if(!b) return;
  pFilter=b.dataset.pf; Store.set('pFilter',pFilter);
  $$('#pracChips .chip').forEach(c=>c.setAttribute('aria-pressed',String(c.dataset.pf===pFilter)));
  renderPractices(); };

/* ---- household profile ---- */
function renderFam(){
  $('#famHis').value=FAM.hisAge; $('#famHer').value=FAM.herAge;
  $('#kidRows').innerHTML=FAM.kids.map((k,i)=>
   '<div style="display:flex;gap:8px;margin-bottom:8px">'+
   '<input type="text" data-k="n" data-i="'+i+'" placeholder="Child '+(i+1)+' name" value="'+esc(k.n)+'" style="flex:2">'+
   '<input type="number" data-k="age" data-i="'+i+'" min="0" max="30" value="'+esc(k.age)+'" style="flex:0 0 74px" aria-label="Age">'+
   (FAM.kids.length>1?'<button class="arw" data-rm="'+i+'" aria-label="Remove" style="flex:0 0 44px">\u00d7</button>':'')+
   '</div>').join('');
}
$('#kidRows').oninput=e=>{ const t=e.target; if(!t.dataset.k) return;
  FAM.kids[+t.dataset.i][t.dataset.k] = t.dataset.k==='age' ? +t.value : t.value;
  saveFam(); renderPractices(); renderNameCards(); };
$('#kidRows').onclick=e=>{ const b=e.target.closest('[data-rm]'); if(!b) return;
  FAM.kids.splice(+b.dataset.rm,1); saveFam(); renderFam(); renderPractices(); renderNameCards(); };
$('#kidAdd').onclick=()=>{ FAM.kids.push({n:'',age:0,mean:'',verse:''}); saveFam(); renderFam(); renderNameCards(); };
$('#famHis').oninput=e=>{ FAM.hisAge=+e.target.value; saveFam(); };
$('#famHer').oninput=e=>{ FAM.herAge=+e.target.value; saveFam(); };

/* ---- name cards, Lois Evans' signs by the bedroom hallway ---- */
function renderNameCards(){
  $('#nameRows').innerHTML=FAM.kids.map((k,i)=>
   '<div style="padding:11px 0;border-top:1px solid var(--line-2)">'+
   '<b style="font-family:var(--ff-d);font-size:15.5px">'+esc(k.n||('Child '+(i+1)))+'</b>'+
   '<div class="fld" style="margin:7px 0 8px"><input type="text" data-nm="mean" data-i="'+i+'" placeholder="What the name means, e.g. God is gracious" value="'+esc(k.mean||'')+'"></div>'+
   '<div class="fld" style="margin:0"><input type="text" data-nm="verse" data-i="'+i+'" placeholder="A verse for this child, e.g. Psalm 84:11" value="'+esc(k.verse||'')+'"></div>'+
   '</div>').join('');
}
$('#nameRows').oninput=e=>{ const t=e.target; if(!t.dataset.nm) return;
  FAM.kids[+t.dataset.i][t.dataset.nm]=t.value; saveFam(); };

$('#namePrint').onclick=()=>{
  const ready=FAM.kids.filter(k=>k.n&&k.mean);
  if(!ready.length){ toast('Put in at least one name and its meaning.'); return; }
  const w=window.open('','_blank'); if(!w){ toast('Allow pop-ups, then try again.'); return; }
  w.document.write('<!doctype html><html><head><meta charset="utf-8"><title>Name cards</title><style>'+
   '@page{margin:12mm}body{font-family:Georgia,serif;margin:0}'+
   '.c{page-break-after:always;height:250mm;display:flex;flex-direction:column;align-items:center;'+
   'justify-content:center;text-align:center;border:2.5pt solid #B85F6E;border-radius:6mm;padding:18mm;box-sizing:border-box}'+
   '.c:last-child{page-break-after:auto}'+
   'h1{font-size:52pt;margin:0 0 4mm;color:#1C1A1B;letter-spacing:-1pt}'+
   'h2{font-size:19pt;font-style:italic;font-weight:normal;color:#B85F6E;margin:0 0 14mm}'+
   'p{font-size:15pt;line-height:1.5;color:#3A3436;margin:0;max-width:130mm}'+
   'span{display:block;font-size:11pt;color:#7A716E;margin-top:6mm;letter-spacing:1pt}'+
   '</style></head><body>'+
   ready.map(k=>'<div class="c"><h1>'+esc(k.n)+'</h1><h2>'+esc(k.mean)+'</h2>'+
     '<p>'+esc(k.verse||'Add a verse for this child')+'</p><span>A child of the King</span></div>').join('')+
   '</body></html>');
  w.document.close(); setTimeout(()=>{w.focus();w.print();},400);
  toast('Print these and hang them by the bedroom door.');
};

/* ---- give, save, spend. The shoebox in the kitchen. ---- */
let BOX = Store.get('box',{give:0,save:0,spend:0,log:[]});
function renderBox(){
  $('#boxGive').textContent = BOX.give.toLocaleString()+' F';
  $('#boxSave').textContent = BOX.save.toLocaleString()+' F';
  $('#boxSpend').textContent= BOX.spend.toLocaleString()+' F';
  $('#boxLog').innerHTML = BOX.log.slice(0,6).map(l=>
   '<div style="font-size:12.8px;color:var(--ink-soft);padding:5px 0;border-top:1px solid var(--line-2)">'+
   fmtShort(fromIso(l.d))+', '+esc(l.who||'allowance')+', '+l.amt.toLocaleString()+' F split 10 / 20 / 70</div>').join('');
}
$('#boxAdd').onclick=()=>{
  const amt=Math.round(+$('#boxAmt').value||0);
  if(amt<=0){ toast('Put in an amount first.'); return; }
  const g=Math.round(amt*0.10), s=Math.round(amt*0.20), p=amt-g-s;
  BOX.give+=g; BOX.save+=s; BOX.spend+=p;
  BOX.log.unshift({d:iso(today()), who:$('#boxWho').value, amt}); BOX.log=BOX.log.slice(0,40);
  Store.set('box',BOX); renderBox(); $('#boxAmt').value='';
  toast(g+' F into the box for God, first.');
};
$('#boxGiven').onclick=()=>{
  if(!BOX.give){ toast('The box is empty.'); return; }
  if(!confirm('Take '+BOX.give.toLocaleString()+' F out of the box and give it at church? Let the child carry it up himself.')) return;
  BOX.give=0; Store.set('box',BOX); renderBox(); toast('Given. Let him carry it up himself.');
};

/* ---- memory verses, one a fortnight ---- */
function verseIndex(){ return Math.floor(dayIndex(today())/14) % LITTLEVERSES.length; }
function renderVerses(){
  const i=verseIndex(), v=LITTLEVERSES[i];
  $('#mvNow').innerHTML='<div class="rref" style="font-size:23px">\u201c'+esc(v[0])+'\u201d</div>'+
    '<div class="rttl">'+esc(v[1])+'. Fortnight '+(i+1)+' of '+LITTLEVERSES.length+'.</div>';
  $('#mvList').innerHTML=LITTLEVERSES.map((x,n)=>
   '<div style="display:flex;gap:10px;padding:6px 0;border-top:1px solid var(--line-2);font-size:13.4px;'+
   (n===i?'font-weight:600':'color:var(--ink-soft)')+'">'+
   '<span style="flex:1">\u201c'+esc(x[0])+'\u201d</span><span style="flex:0 0 auto;font-size:11.5px;opacity:.75">'+esc(x[1])+'</span></div>').join('');
}

/* ---- the four he would insist on, in order ---- */
const FIRSTFOUR = [
 ['1','The evening meal, together, every night',
  'Everything else in the book is bolted onto this. Jonathan Evans calls the dinner table the place where he and his siblings discovered the kingdom of God. Fix the hour this week. With a 1 year old at the table it will be loud and short, and that is fine.'],
 ['2','Ten to fifteen minutes of Scripture at that table',
  'Read six verses from the little-ones track, ask the one question, let each child pray one sentence. Fifteen minutes. He is blunt that long and holy once a week forms nobody, and short and daily forms everybody.'],
 ['3','The blessing, spoken over each child by name, at bedtime',
  'Not praise for what they did. Favour and future, because of who they are. He says most of the prisoners he has preached to never received this from anybody. It costs you thirty seconds a child.'],
 ['4','Your marriage, repaired in front of them',
  'He writes that one of the greatest things a father can do for his children is to biblically and visibly love their mother, and that couples with weak marriages lean on others to parent. Your three are watching how you treat their mother. That is their first lesson in what a home is.']
];
$('#firstFour').innerHTML = FIRSTFOUR.map(f=>
 '<div style="display:flex;gap:12px;padding:11px 0;border-top:1px solid rgba(245,238,229,.11)">'+
 '<div style="flex:0 0 24px;font-family:var(--ff-d);font-weight:700;color:var(--rose);font-size:17px">'+f[0]+'</div>'+
 '<div style="flex:1"><b style="font-family:var(--ff-d);font-size:16px;display:block;color:var(--ivory);margin-bottom:3px">'+f[1]+'</b>'+
 '<span style="font-size:13.8px;color:rgba(245,238,229,.68)">'+f[2]+'</span></div></div>').join('');

/* ---- boot the steps tab ---- */
renderFam(); renderNameCards(); renderPractices(); renderBox(); renderVerses();
$$('#pracChips .chip').forEach(c=>c.setAttribute('aria-pressed',String(c.dataset.pf===pFilter)));

/* The altar and tonight's card were drawn before the children's ages were
   known, so redraw them now that FAM exists. */
try{ renderDevo(); renderTonight(); }catch(e){}
