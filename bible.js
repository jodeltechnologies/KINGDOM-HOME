/* Adult Bible library. Uses its own storage, leaving the children's data intact. */
const BibleUI = (()=>{
 const plans=biblePlanDefinitions();
 let studies=Store.get('bibleStudies',{})||{}, characters=Store.get('bibleCharacters',{})||{};
 let reading=Store.get('bibleReading',{})||{}, passages=Store.get('biblePassages',{})||{};
 let studyId=Store.get('bibleStudyChoice',ALL_BIBLE_STUDIES[0].id);
 let characterId=Store.get('bibleCharacterChoice',BIBLE_CHARACTERS[0].id);
 let method=Store.get('bibleReadingChoice',plans[0].id),customRef=Store.get('biblePassageChoice','');
 let studyMatches=[];
 if(!plans.some(p=>p.id===method))method=plans[0].id;
 const stamp=()=>new Date().toISOString();
 const format=d=>String(d.getDate()).padStart(2,'0')+'/'+String(d.getMonth()+1).padStart(2,'0')+'/'+d.getFullYear();
 const validDate=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&!Number.isNaN(fromIso(s).getTime())&&iso(fromIso(s))===s;
 const civilDay=d=>Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/86400000;
 const scripture=(ref,version='KJV')=>'https://www.biblegateway.com/passage/?search='+encodeURIComponent(ref)+'&version='+encodeURIComponent(version);
 const link=(url,label,cls='btn ghost sm')=>'<a class="'+cls+'" href="'+xe(url)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+'</a>';
 const pointList=points=>'<ol class="explained-points">'+points.map(([title,ref,body])=>'<li><h3>'+esc(title)+'</h3><a class="verse-ref" href="'+xe(scripture(ref))+'" target="_blank" rel="noopener noreferrer">'+esc(ref)+'</a><p>'+esc(body)+'</p></li>').join('')+'</ol>';
 const block=(title,body)=>'<div class="study-block"><h3>'+title+'</h3>'+body+'</div>';
 const questions=(items)=>'<ol>'+items.map(q=>'<li>'+esc(q)+'</li>').join('')+'</ol>';

 function filterStudies(){
  const q=$('#studySearch').value.trim().toLowerCase(),kind=$('#studyKind').value;
  $('#eventFilters').hidden=kind!=='event';
  const testament=$('#eventTestament').value,book=$('#eventBook').value,group=$('#eventGroup').value;
  const matches=ALL_BIBLE_STUDIES.filter(s=>(kind==='all'||s.kind===kind)&&(kind!=='event'||((testament==='all'||s.testament===testament)&&(book==='all'||s.book===book)&&(group==='all'||s.group===group)))&&JSON.stringify(s).toLowerCase().includes(q));
  studyMatches=matches;
  const option=s=>'<option value="'+s.id+'">'+esc(s.title)+'</option>';
  const topics=matches.filter(s=>s.kind==='topic');
  const select=$('#studySelect');select.innerHTML=(topics.length?'<optgroup label="Topic studies">'+topics.map(option).join('')+'</optgroup>':'')+BIBLE_EVENT_GROUPS.map(g=>{const events=matches.filter(s=>s.group===g.id);return events.length?'<optgroup label="'+xe(g.name)+'">'+events.map(option).join('')+'</optgroup>':'';}).join('');
  select.disabled=!matches.length;
  $('#studyDetail').hidden=$('#studyJournal').hidden=$('#studyNavigation').hidden=!matches.length;
  if(!matches.length){$('#studySummary').textContent='No matching lesson. Try another word or change the study arrangement.';return;}
  if(!matches.some(s=>s.id===studyId))studyId=matches[0].id;
  select.value=studyId;renderStudy(matches.length);
 }
 function renderStudy(matchCount){
  const s=ALL_BIBLE_STUDIES.find(x=>x.id===studyId);if(!s)return;
  Store.set('bibleStudyChoice',studyId);
  const pool=$('#studyKind').value==='event'?BIBLE_EVENT_STUDIES:$('#studyKind').value==='topic'?BIBLE_STUDIES:ALL_BIBLE_STUDIES;
  const rec=studies[studyId]||{},count=pool.filter(x=>studies[x.id]?.done).length;
  const position=studyMatches.findIndex(x=>x.id===studyId);
  $('#studyPrevious').disabled=position<=0;$('#studyNext').disabled=position>=studyMatches.length-1;
  $('#studySummary').textContent=count+' of '+pool.length+' lessons studied. '+(matchCount||$('#studySelect').options.length)+' matching lessons.';
  const groupName=s.kind==='event'?BIBLE_EVENT_GROUPS.find(g=>g.id===s.group)?.name:'';
  $('#studyDetail').innerHTML='<p class="study-eyebrow">'+(s.kind==='event'?(s.testament==='OT'?'Old':'New')+' Testament · '+esc(groupName)+' · '+esc(s.type||'Narrative event'):'Topic study')+' · For husband and wife</p><h2>'+esc(s.title)+'</h2><p class="passage-title">'+esc(s.ref)+'</p>'+link(scripture(s.ref),'Read Scripture online','btn rose sm')+block('The setting','<p>'+esc(s.context)+'</p>')+block('Explained study points',pointList(s.points))+block('Matthew Henry alongside this study','<p>'+esc(s.henry)+'</p>'+link(s.henryUrl,s.kind==='event'?'Open Matthew Henry’s commentary volume':'Open Matthew Henry’s chapter notes')+(s.extraSource?' '+link(s.extraSource,'Open the second chapter notes'):''))+block('Discuss together',questions(s.questions))+block('Our practical response','<p>'+esc(s.action)+'</p>')+block('Pray together','<p>'+esc(s.prayer)+'</p>');
  $('#studyNotes').value=rec.notes||'';
  $('#studyComplete').textContent=rec.done?'Studied. Mark as unread':'Mark lesson studied';
  $('#studyComplete').setAttribute('aria-pressed',String(!!rec.done));
  $('#studySaved').textContent=rec.done?'Lesson recorded as studied. Notes stay on this phone.':(rec.notes?'Saved notes restored.':'');
 }
 function saveStudy(toggle){if(!ALL_BIBLE_STUDIES.some(s=>s.id===studyId))return;const prev=studies[studyId]||{};studies[studyId]={...prev,notes:$('#studyNotes').value,done:toggle?!prev.done:!!prev.done,updatedAt:stamp()};Store.set('bibleStudies',studies);if(toggle)renderStudy();$('#studySaved').textContent='Saved on this phone.';}
 function setupEventFilters(reset){
  const testament=$('#eventTestament').value||'all';
  const events=BIBLE_EVENT_STUDIES.filter(s=>testament==='all'||s.testament===testament);
  const oldBook=reset?'all':$('#eventBook').value;
  $('#eventBook').innerHTML='<option value="all">All books</option>'+[...new Set(events.map(s=>s.book))].map(book=>'<option value="'+xe(book)+'">'+esc(book)+'</option>').join('');
  $('#eventBook').value=events.some(s=>s.book===oldBook)?oldBook:'all';
  const book=$('#eventBook').value,oldGroup=reset?'all':$('#eventGroup').value;
  const groups=BIBLE_EVENT_GROUPS.filter(g=>events.some(s=>s.group===g.id&&(book==='all'||s.book===book)));
  $('#eventGroup').innerHTML='<option value="all">All event groups</option>'+groups.map(g=>'<option value="'+g.id+'">'+esc(g.name)+'</option>').join('');
  $('#eventGroup').value=groups.some(g=>g.id===oldGroup)?oldGroup:'all';
  describeGroup();
 }
 function describeGroup(){const g=BIBLE_EVENT_GROUPS.find(g=>g.id===$('#eventGroup').value);$('#eventGroupDescription').textContent=g?g.description:'Groups follow the biblical narrative from Genesis to Revelation. Every event has a separate lesson and saved notes. Gospel groups bring related accounts together; the arrangement does not claim a precise chronology.';}
 function moveStudy(offset){const i=studyMatches.findIndex(s=>s.id===studyId),s=studyMatches[i+offset];if(s){studyId=s.id;$('#studySelect').value=studyId;renderStudy();}}

 function filterCharacters(){
  const q=$('#characterSearch').value.trim().toLowerCase(),testament=$('#characterTestament').value;
  const matches=BIBLE_CHARACTERS.filter(c=>(testament==='all'||c.testament===testament)&&JSON.stringify(c).toLowerCase().includes(q));
  const select=$('#characterSelect');select.innerHTML=matches.map(c=>'<option value="'+c.id+'">'+esc(c.name)+' · '+esc(c.theme)+'</option>').join('');select.disabled=!matches.length;
  $('#characterDetail').hidden=$('#characterJournal').hidden=!matches.length;
  if(!matches.length){$('#characterSummary').textContent='No matching character. Try another word or choose all characters.';return;}
  if(!matches.some(c=>c.id===characterId))characterId=matches[0].id;
  select.value=characterId;renderCharacter();
 }
 function renderCharacter(){
  const c=BIBLE_CHARACTERS.find(x=>x.id===characterId);if(!c)return;Store.set('bibleCharacterChoice',characterId);
  const rec=characters[characterId]||{},count=BIBLE_CHARACTERS.filter(x=>characters[x.id]?.done).length;
  $('#characterSummary').textContent=count+' of '+BIBLE_CHARACTERS.length+' characters studied. '+$('#characterSelect').options.length+' matching profiles.';
  $('#characterDetail').innerHTML='<p class="study-eyebrow">'+(c.testament==='OT'?'Old':'New')+' Testament</p><h2>'+esc(c.name)+'</h2><p class="lede">'+esc(c.theme)+'</p><p class="passage-title">'+esc(c.ref)+'</p>'+link(scripture(c.ref),'Read the key passages','btn rose sm')+block('Background','<p>'+esc(c.background)+'</p>')+block('Strengths to examine','<p>'+esc(c.strength)+'</p>')+block('Failures, limitations, and cautions','<p>'+esc(c.failure)+'</p>')+block('Explained lessons',pointList(c.points))+block('Discuss together',questions(c.questions))+block('Put the lesson into practice','<p>'+esc(c.action)+'</p>')+block('Prayer','<p>'+esc(c.prayer)+'</p>');
  $('#characterNotes').value=rec.notes||'';$('#characterComplete').textContent=rec.done?'Studied. Mark as unread':'Mark character studied';$('#characterComplete').setAttribute('aria-pressed',String(!!rec.done));$('#characterSaved').textContent=rec.notes?'Saved reflection restored.':'';
 }
 function saveCharacter(toggle){if(!BIBLE_CHARACTERS.some(c=>c.id===characterId))return;const prev=characters[characterId]||{};characters[characterId]={...prev,notes:$('#characterNotes').value,done:toggle?!prev.done:!!prev.done,updatedAt:stamp()};Store.set('bibleCharacters',characters);if(toggle)renderCharacter();$('#characterSaved').textContent='Saved on this phone.';}

 function plan(){return plans.find(p=>p.id===method);}
 function progress(){
  if(!reading[method]||typeof reading[method]!=='object')reading[method]={};
  const r=reading[method];if(!validDate(r.start))r.start=iso(today());if(!r.days||typeof r.days!=='object')r.days={};
  r.day=Math.min(plan().rows.length,Math.max(1,Math.trunc(Number(r.day))||1));return r;
 }
 function persistReading(){Store.set('bibleReading',reading);}
 function setupReading(){
  Store.set('bibleReadingChoice',method);
  $('#readingMethod').value=method;$('#readingDescription').textContent=plan().description;
  const r=progress();$('#readingStart').value=r.start;$('#readingDay').max=plan().rows.length;$('#readingVersion').value=['KJV','NKJV','NIV','ESV','CSB','NLT'].includes(Store.get('bibleVersion','KJV'))?Store.get('bibleVersion','KJV'):'KJV';
  $('#readingState').textContent='This method keeps its own start date, notes, and progress.';
  renderReading();renderSchedule();
 }
 function renderReading(){
  const p=plan(),r=progress(),row=p.rows[r.day-1],rec=r.days[r.day]||{};
  const done=p.rows.filter((_,i)=>r.days[i+1]?.read).length;
  $('#readingProgress').max=p.rows.length;$('#readingProgress').value=done;
  $('#readingProgressText').textContent=done+' of '+p.rows.length+' days read ('+Math.round(done/p.rows.length*100)+'%).';
  $('#readingDay').value=r.day;$('#readingDayTitle').textContent='Day '+r.day+(row.title?' · '+row.title:'');
  $('#readingDate').textContent='Scheduled for '+format(addDays(fromIso(r.start),r.day-1))+'.';
  $('#readingPassages').innerHTML=row.refs.map(ref=>'<div class="reading reading-passage"><div class="rref">'+esc(ref)+'</div>'+link(scripture(ref,$('#readingVersion').value),'Read Scripture online')+'</div>').join('');
  $('#readingNotes').value=rec.notes||'';$('#readingDone').textContent=rec.read?'Read. Mark as unread':'Mark day read';$('#readingDone').setAttribute('aria-pressed',String(!!rec.read));
  $('#readingSaved').textContent=rec.read?'Day recorded as read.':(rec.notes?'Saved notes restored.':'');
  $('#readingPrev').disabled=r.day<=1;$('#readingNext').disabled=r.day>=p.rows.length;
 }
 function renderSchedule(){
  const r=progress();$('#readingSchedule').innerHTML='<caption>'+esc(plan().name)+'</caption><thead><tr><th scope="col">Day / date</th><th scope="col">Passages</th><th scope="col">Status</th></tr></thead><tbody>'+plan().rows.map((row,i)=>'<tr><td><button class="schedule-day" data-reading-day="'+(i+1)+'">Day '+(i+1)+'<small>'+format(addDays(fromIso(r.start),i))+'</small></button></td><td>'+esc(row.refs.join('; '))+'</td><td>'+(r.days[i+1]?.read?'Read':'Unread')+'</td></tr>').join('')+'</tbody>';
 }
 function selectDay(n){const r=progress();r.day=Math.min(plan().rows.length,Math.max(1,Math.trunc(Number(n))||1));persistReading();renderReading();}
 function saveReading(toggle){const r=progress(),prev=r.days[r.day]||{};r.days[r.day]={...prev,notes:$('#readingNotes').value,read:toggle?!prev.read:!!prev.read,updatedAt:stamp()};persistReading();if(toggle){renderReading();renderSchedule();}$('#readingSaved').textContent='Saved on this phone.';}

 function renderCustom(){
  if(!customRef)return;const rec=passages[customRef]||{};$('#customPassage').value=customRef;$('#passageWorkspace').hidden=false;
  $('#passageWorkspace').innerHTML=block(esc(customRef),link(scripture(customRef),'Read Scripture online','btn rose sm')+' '+link('https://www.biblegateway.com/resources/matthew-henry/','Open Matthew Henry’s book list'))+block('Work through the passage together',questions(['Read the whole paragraph and the surrounding chapter. Who is speaking, to whom, and in what situation?','What happens, or what argument does the writer make? Record the actual words before adding an interpretation.','Consult Matthew Henry and any study Bible you own. Which observations follow from the passage, and which need checking?','What does this passage teach about God? Which command or promise applies to its original hearers?','What response follows for you and your spouse? Name one action without forcing a promise beyond its context.']))+'<div class="fld"><label class="f" for="customNotes">Our observations, questions, and application</label><textarea id="customNotes"></textarea></div><button class="btn leaf full" id="customSave">Save passage notes</button><p class="save-status" id="customSaved" role="status" aria-live="polite"></p>';
  $('#customNotes').value=rec.notes||'';$('#customSave').onclick=()=>{saveCustom();toast('Passage notes saved.');};$('#customNotes').oninput=saveCustom;
 }
 function saveCustom(){passages[customRef]={notes:$('#customNotes').value,updatedAt:stamp()};Store.set('biblePassages',passages);$('#customSaved').textContent='Saved on this phone.';}

 $('#resourceList').innerHTML=BIBLE_RESOURCES.map(r=>'<details class="resource"><summary><span class="resource-spine" style="background:'+r.color+'">'+r.short+'</span><span><b>'+esc(r.name)+'</b><small>'+esc(r.kind)+'</small></span><span class="resource-caret" aria-hidden="true">+</span></summary><div class="resource-body"><p>'+esc(r.help)+'</p>'+link(r.url,'Open '+r.name)+'</div></details>').join('');
 const initialKind=Store.get('bibleStudyKind',studyId.startsWith('event-')?'event':'all');$('#studyKind').value=['all','topic','event'].includes(initialKind)?initialKind:'all';
 $('#studySearch').oninput=filterStudies;$('#studyKind').onchange=()=>{Store.set('bibleStudyKind',$('#studyKind').value);filterStudies();};$('#studySelect').onchange=()=>{studyId=$('#studySelect').value;renderStudy();};$('#studySave').onclick=()=>{saveStudy(false);toast('Study notes saved.');};$('#studyNotes').oninput=()=>saveStudy(false);$('#studyComplete').onclick=()=>saveStudy(true);
 $('#eventTestament').value='all';$('#eventTestament').onchange=()=>{setupEventFilters(true);filterStudies();};
 $('#eventBook').onchange=()=>{setupEventFilters(false);filterStudies();};$('#eventGroup').onchange=()=>{describeGroup();filterStudies();};
 $('#studyPrevious').onclick=()=>moveStudy(-1);$('#studyNext').onclick=()=>moveStudy(1);
 $('#characterSearch').oninput=filterCharacters;$('#characterTestament').onchange=filterCharacters;$('#characterSelect').onchange=()=>{characterId=$('#characterSelect').value;renderCharacter();};$('#characterSave').onclick=()=>{saveCharacter(false);toast('Reflection saved.');};$('#characterNotes').oninput=()=>saveCharacter(false);$('#characterComplete').onclick=()=>saveCharacter(true);
 $('#readingMethod').innerHTML=plans.map(p=>'<option value="'+p.id+'">'+esc(p.name)+'</option>').join('');$('#readingMethod').onchange=()=>{method=$('#readingMethod').value;setupReading();};
 $('#readingBegin').onclick=()=>{const value=$('#readingStart').value;if(!validDate(value)){$('#readingState').textContent='Choose a valid start date.';$('#readingStart').focus();return;}const r=progress();r.start=value;r.day=1;r.updatedAt=stamp();persistReading();renderReading();renderSchedule();$('#readingState').textContent='Start date saved as '+format(fromIso(value))+'. Existing completed days and notes are retained.';};
 $('#readingVersion').onchange=()=>{Store.set('bibleVersion',$('#readingVersion').value);renderReading();};
 $('#readingDay').onchange=()=>selectDay($('#readingDay').value);$('#readingPrev').onclick=()=>selectDay(progress().day-1);$('#readingNext').onclick=()=>selectDay(progress().day+1);
 $('#readingToday').onclick=()=>{const r=progress(),offset=civilDay(today())-civilDay(fromIso(r.start));selectDay(offset+1);if(offset<0)$('#readingSaved').textContent='Your plan starts on '+format(fromIso(r.start))+'. Showing day 1.';else if(offset>=plan().rows.length)$('#readingSaved').textContent='The scheduled plan has ended. Use First unread day to finish remaining readings.';};
 $('#readingResume').onclick=()=>{const i=plan().rows.findIndex((_,i)=>!progress().days[i+1]?.read);if(i<0){$('#readingSaved').textContent='Every day in this plan is marked read.';return;}selectDay(i+1);};
 $('#readingNotes').oninput=()=>saveReading(false);$('#readingSave').onclick=()=>{saveReading(false);toast('Reading notes saved.');};$('#readingDone').onclick=()=>saveReading(true);
 $('#readingSchedule').onclick=e=>{const b=e.target.closest('[data-reading-day]');if(b){selectDay(b.dataset.readingDay);$('#readingDayTitle').scrollIntoView({behavior:'smooth',block:'start'});}};
 $('#readingExport').onclick=()=>{const r=progress(),cell=v=>'"'+String(v).replace(/"/g,'""')+'"';const rows=[['Plan','Day','Date','Passages','Status','Notes'],...plan().rows.map((row,i)=>[plan().name,i+1,format(addDays(fromIso(r.start),i)),row.refs.join('; '),r.days[i+1]?.read?'Read':'Unread',r.days[i+1]?.notes||''])];dl(new Blob(['\uFEFF'+rows.map(row=>row.map(cell).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'}),'bible-reading-'+method+'.csv');toast('Reading plan downloaded.');};
 $('#passageForm').onsubmit=e=>{e.preventDefault();const ref=$('#customPassage').value.trim().replace(/\s+/g,' ');if(!ref){$('#customPassage').focus();return;}customRef=ref;Store.set('biblePassageChoice',customRef);renderCustom();};
 setupEventFilters(true);filterStudies();filterCharacters();setupReading();renderCustom();
 return {plans};
})();

/* Called by the existing file/Supabase import. Child records use their
   original merge path; these keys belong exclusively to the adult library. */
function mergeBibleRecords(get,touched){
 const safe=k=>!['__proto__','constructor','prototype'].includes(k);
 const mergeNotes=(a,b)=>{if(!a)return b||'';if(!b||a===b)return a;if(a.includes(b))return a;if(b.includes(a))return b;return a.trim()+'\n\n'+b.trim();};
 const mergedRecord=(mine,theirs)=>{const a=mine&&typeof mine==='object'?mine:{},b=theirs&&typeof theirs==='object'?theirs:{};const newer=(b.updatedAt||'')>(a.updatedAt||'')?b:a;return {...a,...b,...newer,notes:mergeNotes(a.notes,b.notes)};};
 for(const key of ['bibleStudies','bibleCharacters','biblePassages']){
  const incoming=get(key);if(!incoming||typeof incoming!=='object'||Array.isArray(incoming))continue;const mine=Store.get(key,{})||{};
  for(const [id,rec] of Object.entries(incoming)){if(safe(id)&&rec&&typeof rec==='object'&&!Array.isArray(rec))mine[id]=mergedRecord(mine[id],rec);}
  Store.set(key,mine);touched.push(key==='bibleStudies'?'Bible studies':key==='bibleCharacters'?'character reflections':'passage notes');
 }
 const incoming=get('bibleReading');if(!incoming||typeof incoming!=='object'||Array.isArray(incoming))return;const mine=Store.get('bibleReading',{})||{};
 for(const [id,p] of Object.entries(incoming)){
  if(!safe(id)||!p||typeof p!=='object'||Array.isArray(p))continue;const current=mine[id]||{},days={...(current.days||{})};
  for(const [day,rec] of Object.entries(p.days||{})){if(/^\d+$/.test(day)&&rec&&typeof rec==='object')days[day]=mergedRecord(days[day],rec);}
  const latest=(p.updatedAt||'')>(current.updatedAt||'')?p:current;mine[id]={...p,...current,...latest,days};
 }
 Store.set('bibleReading',mine);touched.push('Bible reading progress');
}
