/* 내 노트(#note): 내 답변 보관함 · 내 표현장 · 나만의 상황
   마이페이지(#my): 학습 기록 · 백업
   index.html의 전역(S, SCENARIOS, save, esc, fill 등)을 함께 사용합니다. */

/* ---------- 녹음·답변 저장소 (녹음 파일은 용량이 커서 IndexedDB 사용) ---------- */
const DB = {
  db: null,
  open(){
    if(this.db) return Promise.resolve(this.db);
    return new Promise((res, rej)=>{
      const r = indexedDB.open('tradeTalk', 1);
      r.onupgradeneeded = ()=>{ if(!r.result.objectStoreNames.contains('answers')) r.result.createObjectStore('answers', {keyPath:'id', autoIncrement:true}); };
      r.onsuccess = ()=>{ this.db = r.result; res(this.db); };
      r.onerror = ()=>rej(r.error);
    });
  },
  async run(mode, fn){
    const d = await this.open();
    return new Promise((res, rej)=>{
      const t = d.transaction('answers', mode); let out;
      const r = fn(t.objectStore('answers')); if(r) r.onsuccess = ()=>{ out = r.result; };
      t.oncomplete = ()=>res(out); t.onerror = ()=>rej(t.error); t.onabort = ()=>rej(t.error);
    });
  },
  all(){ return this.run('readonly', s=>s.getAll()); },
  put(a){ return this.run('readwrite', s=>s.put(a)); },
  del(id){ return this.run('readwrite', s=>s.delete(id)); },
  clear(){ return this.run('readwrite', s=>s.clear()); }
};
let ANS = [], dbOK = true;
async function loadAnswers(){
  try{ ANS = (await DB.all()).sort((a,b)=>b.id-a.id); }
  catch(e){ dbOK = false; ANS = []; }
}
const answersOf = sid => ANS.filter(a=>a.sid===sid);
const ansById = id => ANS.find(a=>a.id===+id);
async function putAnswer(a){
  const id = await DB.put(a);
  if(!a.id) a.id = id;
  if(!ANS.includes(a)) ANS.unshift(a);
  return a;
}
const words = t => (t||'').split(/\s+/).filter(Boolean).length;
const fmtDate = iso => { const d = new Date(iso); return `${d.getFullYear()}.${d.getMonth()+1}.${d.getDate()} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`; };
const scTitle = sid => { const s = byId(sid); return s ? s.title : '(삭제된 상황)'; };
const audioURLs = new Map();
function audioSrc(a){
  if(!a.audio) return '';
  if(!audioURLs.has(a.id)) audioURLs.set(a.id, URL.createObjectURL(a.audio));
  return audioURLs.get(a.id);
}

/* ---------- 문법 검사 (LanguageTool 무료 공개 서버) ---------- */
const LT_URL = 'https://api.languagetool.org/v2/check';
const ISSUE_KO = { grammar:'문법', misspelling:'철자', typographical:'표기', style:'문체', duplication:'중복', inconsistency:'일관성', whitespace:'띄어쓰기', 'locale-violation':'표기' };
async function grammarCheck(text){
  // 말로 한 답변이라 대소문자·문장부호 규칙은 끄고 검사
  const body = new URLSearchParams({ text, language:'en-US', disabledCategories:'CASING,PUNCTUATION,TYPOGRAPHY' });
  let r;
  try{ r = await fetch(LT_URL, { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body }); }
  catch(e){ throw new Error('검사 서버에 연결하지 못했어요. 인터넷 연결을 확인해 주세요.'); }
  if(r.status===429) throw new Error('검사 요청이 많아요. 1분 정도 뒤에 다시 시도해 주세요.');
  if(!r.ok) throw new Error('검사 서버 오류가 발생했어요 ('+r.status+').');
  const j = await r.json();
  return { at:new Date().toISOString(), text,
    matches: j.matches.map(m=>({ o:m.offset, l:m.length, msg:m.message,
      rep:(m.replacements||[]).slice(0,3).map(x=>x.value), type:(m.rule&&m.rule.issueType)||'other' })) };
}
function cleanMatches(c){
  const out = []; let end = -1;
  [...c.matches].sort((a,b)=>a.o-b.o).forEach(m=>{ if(m.o>=end){ out.push(m); end = m.o+m.l; } });
  return out;
}
function correctedText(text, ms){
  let out = text;
  [...ms].sort((a,b)=>b.o-a.o).forEach(m=>{ if(m.rep.length) out = out.slice(0,m.o) + m.rep[0] + out.slice(m.o+m.l); });
  return out;
}
function checkResultHTML(a){
  const c = a.check;
  if(!c) return '';
  if(c.text !== a.text) return `<p class="note">답변을 고친 뒤라 이전 검사 결과는 지웠어요. 다시 검사해 주세요.</p>`;
  const ms = cleanMatches(c), t = c.text;
  if(!ms.length) return `<div class="note okbox">✓ 문법 오류를 찾지 못했어요. 모범 답변과 비교해 표현을 더 다듬어 보세요.</div>`;
  let html = '', pos = 0;
  ms.forEach((m,i)=>{ html += esc(t.slice(pos,m.o)) + `<span class="err" title="${esc(m.msg)}">${esc(t.slice(m.o,m.o+m.l))}<sup>${i+1}</sup></span>`; pos = m.o+m.l; });
  html += esc(t.slice(pos));
  return `
    <p class="muted small" style="margin:14px 0 6px">틀린 부분 <b class="errc">${ms.length}곳</b> (빨간 밑줄)</p>
    <div class="transcript">${html}</div>
    <ol class="fixes">${ms.map(m=>`
      <li><span class="pill errpill">${ISSUE_KO[m.type]||'기타'}</span>
        <s>${esc(t.slice(m.o,m.o+m.l))}</s> → <b class="fix">${m.rep.length?esc(m.rep[0]):'(고칠 표현 제안 없음)'}</b>
        ${m.rep.length>1?`<span class="muted small"> 또는 ${m.rep.slice(1).map(esc).join(', ')}</span>`:''}
        <div class="muted small">${esc(m.msg)}</div></li>`).join('')}</ol>
    <p class="muted small" style="margin:12px 0 6px">고친 답변</p>
    <div class="transcript okbox">${esc(correctedText(t, ms))}</div>
    <p class="muted small" style="margin-top:6px">검사: LanguageTool · 설명은 영어로 나와요.</p>`;
}
function checkBlockHTML(a, target){
  return `
    <div class="row" style="margin-top:12px">
      <button class="btn" data-act="ansCheck" data-id="${a.id}" data-target="${target}">${a.check&&a.check.text===a.text?'다시 검사':'문법 검사'}</button>
      <span class="muted small">누르면 답변 텍스트가 외부 문법 검사 서비스(LanguageTool)로 전송돼요.</span>
    </div>
    <div id="${target}">${checkResultHTML(a)}</div>`;
}
async function runCheck(id, target){
  const a = ansById(id), box = document.getElementById(target);
  if(!a || !box) return;
  if(!a.text.trim()){ box.innerHTML = '<p class="note">검사할 답변 텍스트가 없어요. 먼저 답변을 적고 저장해 주세요.</p>'; return; }
  box.innerHTML = '<p class="note">검사하는 중…</p>';
  try{ a.check = await grammarCheck(a.text); await DB.put(a); box.innerHTML = checkResultHTML(a); }
  catch(e){ box.innerHTML = `<p class="note">${esc(e.message)}</p>`; }
}

/* ---------- 나만의 상황 ---------- */
const CUSTOM_TIP = '직접 만든 상황이에요. 실제 업무에서 받은 질문으로 반복 연습해 보세요.';
function toScenario(c){
  return { id:c.id, stage:'mine', imp:c.imp||2, title:c.title, en:'My Scenario', sit:c.sit||'', q:c.q,
    exp:(c.exp||[]).filter(x=>x.en).map(x=>[x.en, x.ko||'', x.en.replace(/~/g,'').replace(/[.?!]+$/,'').trim()]),
    a:Array(5).fill(c.answer||''), t:Array(5).fill(CUSTOM_TIP), custom:true };
}
function rebuildScenarios(){ SCENARIOS = BASE_SCENARIOS.concat((S.custom||[]).map(toScenario)); }

/* ---------- 상황 학습 화면에 붙는 '내 답변' 영역 ---------- */
function myAnswersBlock(s){
  const list = answersOf(s.id);
  const best = list.find(a=>a.best);
  if(!list.length) return '';
  return `
  <h2>내 답변</h2>
  ${best ? `<div class="card">
      <div class="row between" style="margin-bottom:8px"><span class="pill ok">★ 내 모범 답변</span><span class="muted small">${best.level}단계 · ${fmtDate(best.date)}</span></div>
      <p style="margin:0;font-size:17px">${esc(best.text)}</p>
      <div class="row" style="margin-top:10px"><button class="btn sm" data-say="${esc(best.text)}">▶ 듣기</button>${best.audio?`<audio controls src="${audioSrc(best)}" style="height:32px"></audio>`:''}</div>
    </div>` : ''}
  <div class="row" style="margin-top:10px"><a class="btn sm" href="#note/answers" data-ansfilter="${s.id}">저장한 답변 ${list.length}개 보기 →</a></div>`;
}

/* ---------- 내 노트 화면 (#note): 내 답변 · 내 표현장 · 나만의 상황 ---------- */
const NOTE_TABS = [['answers','내 답변'],['exp','내 표현장'],['custom','나만의 상황']];
const myState = { ansSid:'all', calOffset:0 };

function noteView(parts){
  const sub = ['answers','answer','exp','custom'].includes(parts[1]) ? parts[1] : 'answers';
  const tab = sub==='answer' ? 'answers' : sub;
  let body = '';
  if(sub==='answers') body = answersListView();
  else if(sub==='answer') body = answerDetailView(parts[2]);
  else if(sub==='exp') body = expView();
  else if(sub==='custom') body = parts[2] ? customFormView(parts[2]) : customListView();
  return `
  <h1>내 노트</h1>
  <p class="muted">내 답변과 표현, 직접 만든 상황을 모아 나만의 학습을 만들어 가요.</p>
  ${dbOK?'':'<p class="note">이 브라우저에서는 녹음 저장소를 열 수 없어요. Chrome 최신 버전에서 열어 주세요.</p>'}
  <div class="subtabs">${NOTE_TABS.map(([k,n])=>`<a href="#note/${k}" class="${tab===k?'on':''}">${n}</a>`).join('')}</div>
  ${body}`;
}

/* ---------- 마이페이지 화면 (#my): 학습 기록 · 백업 ---------- */
const MY_TABS = [['log','학습 기록'],['backup','백업']];
function myView(parts){
  const sub = parts[1]==='backup' ? 'backup' : 'log';
  return `
  <h1>마이페이지</h1>
  <p class="muted">학습 기록을 확인하고, 내 기록을 백업해요.</p>
  <div class="subtabs">${MY_TABS.map(([k,n])=>`<a href="#my/${k}" class="${sub===k?'on':''}">${n}</a>`).join('')}</div>
  ${sub==='backup' ? backupView() : logView()}`;
}

/* 내 답변: 목록 */
function answersListView(){
  const sids = [...new Set(ANS.map(a=>a.sid))];
  if(myState.ansSid!=='all' && !sids.includes(myState.ansSid)) myState.ansSid = 'all';
  const list = myState.ansSid==='all' ? ANS : answersOf(myState.ansSid);
  const status = a => {
    if(!a.check || a.check.text!==a.text) return '<span class="pill">검사 전</span>';
    const n = cleanMatches(a.check).length;
    return n ? `<span class="pill errpill">오류 ${n}곳</span>` : '<span class="pill ok">오류 없음</span>';
  };
  return `
  <div class="row between" style="margin:4px 0 14px">
    <select data-act="ansFilter"><option value="all">모든 상황 (${ANS.length})</option>
      ${sids.map(id=>`<option value="${esc(id)}" ${myState.ansSid===id?'selected':''}>${esc(scTitle(id))} (${answersOf(id).length})</option>`).join('')}</select>
  </div>
  <details class="card" style="margin-bottom:14px">
    <summary style="cursor:pointer;font-weight:700">답변 직접 써서 저장하기</summary>
    <p class="muted small" style="margin:8px 0">녹음 없이 글로 답변을 써서 저장하고 문법 검사를 받을 수 있어요.</p>
    <div class="row" style="margin-bottom:8px">
      <select id="typeSid">${STAGES.map(([k,n])=>{ const xs = SCENARIOS.filter(x=>x.stage===k); return xs.length?`<optgroup label="${n}">${xs.map(x=>`<option value="${x.id}" ${myState.ansSid===x.id?'selected':''}>${esc(x.title)}</option>`).join('')}</optgroup>`:''; }).join('')}</select>
      <span class="muted small">${lvLabel(S.level)}로 저장돼요</span>
    </div>
    <textarea id="typeText" rows="5" placeholder="영어로 답변을 써 보세요."></textarea>
    <div class="row" style="margin-top:8px"><button class="btn primary" data-act="saveTyped">저장</button></div>
  </details>
  ${list.length ? `<div class="card rec-list">${list.map(a=>`
    <a class="rec-item linkrow" href="#note/answer/${a.id}">
      <div style="min-width:0">
        <div class="row" style="gap:6px"><b>${esc(scTitle(a.sid))}</b>${a.best?'<span class="pill ok">★ 내 모범 답변</span>':''}</div>
        <div class="muted small">${a.level}단계 · ${fmtDate(a.date)} · ${a.audio?'녹음 '+fmt(a.dur||0):'글로 작성'} · ${words(a.text)}단어</div>
        <div class="clip small">${esc(a.text||'(텍스트 없음)')}</div>
      </div>
      <div>${status(a)}</div>
    </a>`).join('')}</div>`
  : `<div class="card empty"><p>아직 저장한 답변이 없어요.</p><p class="muted small">롤플레이에서 녹음한 뒤 “녹음과 함께 저장”을 누르거나, 위에서 직접 써서 저장해 보세요.</p><a class="btn primary" href="#roleplay">롤플레이 하러 가기</a></div>`}`;
}

/* 내 답변: 상세 */
function answerDetailView(id){
  const a = ansById(id);
  if(!a) return `<div class="card empty"><p>답변을 찾을 수 없어요.</p><a class="btn" href="#note/answers">목록으로</a></div>`;
  const s = byId(a.sid), others = answersOf(a.sid).filter(x=>x.id!==a.id);
  const lvIdx = Number(a.level)-1;
  return `
  <button class="back-link" data-go="#note/answers">← 내 답변 목록</button>
  <div class="row between">
    <div><h2 style="margin:0">${esc(scTitle(a.sid))}</h2>
      <p class="muted small" style="margin:0">${a.level}단계 · ${fmtDate(a.date)} · ${a.audio?'녹음 '+fmt(a.dur||0):'글로 작성'} · ${words(a.text)}단어</p></div>
    <button class="btn sm ${a.best?'on':''}" data-act="ansBest" data-id="${a.id}">${a.best?'★ 내 모범 답변':'☆ 내 모범 답변으로 지정'}</button>
  </div>
  ${s?`<div class="prompt" style="margin-top:12px;font-size:15px">${esc(fill(s.q))}</div>`:''}
  <div class="card" style="margin-top:12px">
    ${a.audio?`<audio controls src="${audioSrc(a)}" style="width:100%"></audio>`:''}
    <p class="muted small" style="margin:${a.audio?'12px':'0'} 0 6px">답변 텍스트 (받아쓰기가 틀렸다면 직접 고쳐 주세요)</p>
    <textarea id="ansEdit" rows="5">${esc(a.text)}</textarea>
    <div class="row" style="margin-top:8px"><button class="btn sm" data-act="ansSaveText" data-id="${a.id}">텍스트 저장</button><button class="btn sm" data-say="${esc(a.text)}">▶ 내 답변을 원어민 음성으로 듣기</button><span id="ansMsg" class="muted small"></span></div>
    ${checkBlockHTML(a, 'detailCheck')}
  </div>
  ${s && s.a[lvIdx] ? `<details class="card" style="margin-top:12px"><summary style="cursor:pointer;font-weight:700">${a.level}단계 모범 답변과 비교하기</summary>
    <p style="margin:10px 0 0;font-size:16px">${tplHTML(s.a[lvIdx], s.exp)}</p></details>` : ''}
  ${others.length ? `<h2>같은 상황의 다른 답변</h2>
    <div class="card rec-list">${others.map(o=>`
      <a class="rec-item linkrow" href="#note/answer/${o.id}">
        <div><b class="small">${fmtDate(o.date)}</b> <span class="muted small">· ${o.level}단계 · ${words(o.text)}단어${o.audio?' · 녹음 '+fmt(o.dur||0):''}</span>
          <div class="clip small">${esc(o.text)}</div></div>
        ${o.best?'<span class="pill ok">★</span>':''}
      </a>`).join('')}</div>
    <p class="muted small">단어 수와 오류 수를 비교하면 실력이 얼마나 늘었는지 볼 수 있어요.</p>` : ''}
  <div class="row" style="margin-top:20px">
    ${s?`<a class="btn" href="#roleplay/${a.sid}">이 상황 다시 말해보기</a>`:''}
    <button class="btn danger" data-act="ansDelete" data-id="${a.id}">이 답변 삭제</button>
  </div>`;
}

/* 내 표현장 */
function expView(){
  const list = S.myExp || [];
  return `
  <div class="card" style="margin-bottom:14px">
    <h3>표현 추가하기</h3>
    <p class="muted small">실무에서 들은 표현이나 외우고 싶은 문장을 적어 두세요. 상황 학습 화면의 “＋ 담기” 버튼으로도 모을 수 있어요.</p>
    <div class="grid g2">
      <label class="field"><span>영어</span><input id="expEn" placeholder="Could you expedite the shipment?" autocomplete="off"></label>
      <label class="field"><span>한국어 뜻</span><input id="expKo" placeholder="선적을 앞당겨 주실 수 있을까요?" autocomplete="off"></label>
    </div>
    <label class="field" style="margin-top:8px"><span>메모 (선택)</span><input id="expNote" placeholder="언제 쓰는지, 비슷한 표현 등" autocomplete="off"></label>
    <div class="row" style="margin-top:10px"><button class="btn primary" data-act="expAdd">추가</button></div>
  </div>
  <div class="row between" style="margin-bottom:10px"><b>내 표현 ${list.length}개</b>${list.length?'<button class="btn sm primary" data-act="expCards">카드로 연습하기 →</button>':''}</div>
  ${list.length ? `<div class="card">${list.map(x=>`
    <div class="exp">
      <button class="play" data-say="${esc(x.en.replace(/~/g,''))}" aria-label="듣기">${PLAY_ICON}</button>
      <div style="flex:1;min-width:0"><div class="en">${esc(x.en)}</div><div class="muted small">${esc(x.ko||'')}</div>
        ${x.note?`<div class="small" style="margin-top:2px"><span class="muted">메모</span> ${esc(x.note)}</div>`:''}
        ${x.sid?`<span class="tag" style="margin-top:4px;display:inline-block">${esc(scTitle(x.sid))}</span>`:''}</div>
      <button class="btn sm" data-act="expDel" data-id="${esc(x.id)}">삭제</button>
    </div>`).join('')}</div>`
  : `<div class="card empty"><p class="muted" style="margin:0">아직 담은 표현이 없어요.</p></div>`}`;
}

/* 나만의 상황: 목록 */
function customListView(){
  const list = (S.custom||[]).map(c=>byId(c.id)).filter(Boolean);
  return `
  <div class="row between" style="margin-bottom:12px">
    <p class="muted small" style="margin:0">실제 업무에서 받은 질문을 상황으로 만들어 두면, 상황 학습·롤플레이·표현 카드에서 함께 연습할 수 있어요.</p>
    <a class="btn primary" href="#note/custom/new">＋ 새 상황 만들기</a>
  </div>
  ${list.length ? `<div class="grid g2">${list.map(s=>`
    <div class="card">
      <div class="row between"><span class="tag">나만의 상황</span>${starsHTML(s)}</div>
      <h3 style="margin-top:6px">${esc(s.title)}</h3>
      <p class="small muted" style="margin:0 0 6px">${esc(s.sit)}</p>
      <p class="small" style="margin:0">${esc(s.q)}</p>
      <div class="row" style="margin-top:10px">
        <a class="btn sm" href="#study/${s.id}">학습</a><a class="btn sm primary" href="#roleplay/${s.id}">말해보기</a>
        <a class="btn sm" href="#note/custom/${s.id}">수정</a>
      </div>
    </div>`).join('')}</div>`
  : `<div class="card empty"><p class="muted" style="margin:0">아직 만든 상황이 없어요.</p></div>`}`;
}

/* 나만의 상황: 만들기·수정 */
function customFormView(id){
  const c = id==='new' ? {} : (S.custom||[]).find(x=>x.id===id);
  if(!c) return `<div class="card empty"><p>상황을 찾을 수 없어요.</p><a class="btn" href="#note/custom">목록으로</a></div>`;
  const expText = (c.exp||[]).map(x=>x.en+(x.ko?' | '+x.ko:'')).join('\n');
  return `
  <button class="back-link" data-go="#note/custom">← 나만의 상황 목록</button>
  <div class="card">
    <h3>${id==='new'?'새 상황 만들기':'상황 수정'}</h3>
    <div class="grid" style="gap:12px;margin-top:10px">
      <label class="field"><span>상황 이름 *</span><input id="cTitle" value="${esc(c.title||'')}" placeholder="예: 포워더에게 선적 일정 문의" autocomplete="off"></label>
      <label class="field"><span>상황 설명</span><input id="cSit" value="${esc(c.sit||'')}" placeholder="예: 선적이 다음 주인데 아직 부킹 확인을 못 받았습니다." autocomplete="off"></label>
      <label class="field"><span>질문 (영어) *</span><small>상대가 나에게 하는 말이나 질문이에요. 롤플레이에서 음성으로 들려드려요.</small>
        <textarea id="cQ" rows="2" placeholder="Could you tell me when the shipment will be ready?">${esc(c.q||'')}</textarea></label>
      <label class="field"><span>내 모범 답변 (영어, 선택)</span><small>비워 두고, 나중에 롤플레이에서 저장한 답변을 ‘내 모범 답변’으로 지정해도 돼요.</small>
        <textarea id="cA" rows="5">${esc(c.answer||'')}</textarea></label>
      <label class="field"><span>핵심 표현 (선택)</span><small>한 줄에 하나씩 “영어 | 한국어” 형식으로 적어 주세요. 표현 카드에도 들어가요.</small>
        <textarea id="cExp" rows="4" placeholder="Could you confirm the booking? | 부킹을 확인해 주시겠어요?">${esc(expText)}</textarea></label>
    </div>
    <div class="row" style="margin-top:14px">
      <button class="btn primary" data-act="customSave" data-id="${esc(id)}">저장</button>
      ${id!=='new'?`<button class="btn danger" data-act="customDel" data-id="${esc(id)}">삭제</button>`:''}
    </div>
  </div>`;
}

/* 학습 기록 */
// 달력 칸에 마우스를 올리면 보이는 그날 한 일
function dayDetail(k){
  const d = (S.log||{})[k], p = dayPoints(k);
  if(!p) return '';
  if(!d || typeof d!=='object') return `학습 기록 있음 · ${p}점`;
  const parts = Object.keys(PTS_NAME).filter(x=>d[x]).map(x=>`${PTS_NAME[x][0]} ${d[x]}${PTS_NAME[x][1]}`);
  if(d.legacy) parts.push(`이전 기록 ${d.legacy}회`);
  return parts.join(' · ') + ` · ${p}점`;
}
const dayLevel = p => p>=10 ? 3 : p>=5 ? 2 : p>0 ? 1 : 0;
function calHTML(){
  const now = new Date(), d = new Date(now.getFullYear(), now.getMonth()+myState.calOffset, 1);
  const y = d.getFullYear(), m = d.getMonth(), first = d.getDay(), n = new Date(y, m+1, 0).getDate();
  const todayK = dayKey(now);
  let cells = ['일','월','화','수','목','금','토'].map(w=>`<div class="cal-w">${w}</div>`).join('');
  for(let i=0;i<first;i++) cells += '<div></div>';
  let studied = 0;
  for(let day=1; day<=n; day++){
    const k = dayKey(new Date(y, m, day)), p = dayPoints(k);
    if(p) studied++;
    cells += `<div class="cal-d l${dayLevel(p)} ${k===todayK?'today':''}" title="${esc(dayDetail(k))}">${day}</div>`;
  }
  return `
  <div class="row between" style="margin-bottom:10px">
    <button class="btn sm" data-act="calPrev">‹</button>
    <b>${y}년 ${m+1}월 <span class="muted small">· ${studied}일 학습</span></b>
    <button class="btn sm" data-act="calNext" ${myState.calOffset>=0?'disabled':''}>›</button>
  </div>
  <div class="cal">${cells}</div>
  <div class="row between small muted" style="margin-top:12px">
    <div class="row" style="gap:6px">적게 <span class="cal-d l1 lg" title="1~4점"></span><span class="cal-d l2 lg" title="5~9점"></span><span class="cal-d l3 lg" title="10점 이상"></span> 많이</div>
    <span>날짜에 마우스를 올리면 그날 한 일이 보여요</span>
  </div>
  <p class="muted small" style="margin:8px 0 0">점수: 롤플레이 녹음 3점 · 답변 저장 2점 · 상황 완료 2점 · 표현 카드 1장 0.2점 &nbsp;|&nbsp; 연하게 1~4점 · 중간 5~9점 · 진하게 10점 이상</p>`;
}
function logView(){
  const pct = (a,b) => b ? Math.round(a/b*100) : 0;
  const total = Object.keys(LEVELS).reduce((n,l)=>n+S.done[l].length,0);
  return `
  <div class="grid g4">
    <div class="card stat"><span class="muted small">총 학습일</span><b>${new Set([...S.days, ...Object.keys(S.log||{})]).size}일</b></div>
    <div class="card stat"><span class="muted small">연속 학습</span><b>${streak()}일</b></div>
    <div class="card stat"><span class="muted small">저장한 답변</span><b>${ANS.length}개</b></div>
    <div class="card stat"><span class="muted small">완료한 상황 (전 단계)</span><b>${total}</b></div>
  </div>
  <h2>학습 달력</h2>
  <div class="card">${calHTML()}</div>
  <div class="grid g2" style="margin-top:12px">
    <div class="card"><h3>단계별 완료</h3>
      ${Object.keys(LEVELS).map(l=>`<div class="barrow"><span>${lvLabel(l)}</span><div class="meter"><i style="width:${pct(S.done[l].length,SCENARIOS.length)}%"></i></div><span class="muted small">${S.done[l].length}/${SCENARIOS.length}</span></div>`).join('')}
    </div>
    <div class="card"><h3>거래 단계별 완료 <span class="muted small">(${S.level}단계 기준)</span></h3>
      ${STAGES.map(([k,n])=>{ const xs = SCENARIOS.filter(s=>s.stage===k); if(!xs.length) return ''; const d = xs.filter(s=>isDone(s.id)).length;
        return `<div class="barrow"><span>${n}</span><div class="meter"><i style="width:${pct(d,xs.length)}%"></i></div><span class="muted small">${d}/${xs.length}</span></div>`; }).join('')}
    </div>
  </div>`;
}

/* 백업 */
function backupView(){
  const withAudio = ANS.filter(a=>a.audio).length;
  return `
  <div class="note" style="margin-bottom:12px">모든 기록은 <b>이 컴퓨터의 이 브라우저</b>에만 저장돼요. 브라우저 기록을 지우면 사라질 수 있으니 가끔 백업 파일을 받아 두세요.</div>
  <div class="grid g2">
    <div class="card">
      <h3>백업 파일 받기</h3>
      <p class="muted small">진행 기록, 내 회사 정보, 내 표현장, 나만의 상황, 저장한 답변 ${ANS.length}개가 들어가요.</p>
      <label class="row small" style="gap:6px;margin-bottom:10px"><input type="checkbox" id="bkAudio" checked> 녹음 파일도 포함 (${withAudio}개 · 파일이 커져요)</label>
      <button class="btn primary" data-act="backupExport">백업 파일 받기</button>
    </div>
    <div class="card">
      <h3>백업 파일로 복원</h3>
      <p class="muted small">백업 파일을 고르면 <b>지금 기록을 모두 지우고</b> 백업 시점으로 되돌려요.</p>
      <input type="file" id="bkFile" accept=".json,application/json">
      <p id="bkMsg" class="muted small" style="margin-top:8px"></p>
    </div>
  </div>
  <div class="card" style="margin-top:12px">
    <h3>모든 기록 지우기</h3>
    <p class="muted small">진행 기록, 저장한 답변과 녹음, 내 표현장, 나만의 상황을 모두 지워요. 되돌릴 수 없어요.</p>
    <button class="btn danger" data-act="resetAll">모든 기록 지우기</button>
  </div>`;
}
const blobToDataURL = b => new Promise((res,rej)=>{ const r = new FileReader(); r.onload = ()=>res(r.result); r.onerror = ()=>rej(r.error); r.readAsDataURL(b); });
async function exportBackup(withAudio){
  const answers = [];
  for(const a of ANS){
    const c = Object.assign({}, a);
    c.audio = (withAudio && a.audio) ? await blobToDataURL(a.audio) : null;
    answers.push(c);
  }
  const data = { app:'trade-talk', version:1, exportedAt:new Date().toISOString(), state:S, answers };
  const blob = new Blob([JSON.stringify(data)], {type:'application/json'});
  const url = URL.createObjectURL(blob), link = document.createElement('a');
  link.href = url; link.download = `trade-talk-backup-${dayKey(new Date())}.json`;
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(()=>URL.revokeObjectURL(url), 2000);
}
async function importBackup(file){
  const msg = document.getElementById('bkMsg');
  let data;
  try{ data = JSON.parse(await file.text()); }catch(e){ msg.textContent = '백업 파일을 읽지 못했어요.'; return; }
  if(!data || data.app!=='trade-talk' || !data.state){ msg.textContent = 'Trade Talk 백업 파일이 아니에요.'; return; }
  if(!confirm('지금 기록을 모두 지우고 백업 파일 내용으로 바꿀까요?')) return;
  msg.textContent = '복원하는 중…';
  try{
    S = Object.assign(defState(), data.state); save();
    await DB.clear(); ANS = []; audioURLs.clear();
    for(const a of (data.answers||[])){
      const c = Object.assign({}, a);
      c.audio = c.audio ? await (await fetch(c.audio)).blob() : null;
      await DB.put(c);
    }
    await loadAnswers(); rebuildScenarios(); pickVoice(); renderLevelSeg();
    msg.textContent = `복원했어요. 답변 ${ANS.length}개를 불러왔어요.`;
    setTimeout(()=>{ location.hash = '#home'; }, 800);
  }catch(e){ msg.textContent = '복원 중 문제가 생겼어요: ' + e.message; }
}

/* ---------- 이벤트 ---------- */
function rerenderMy(){ if(view.tab==='my' || view.tab==='note') refresh(); }
document.addEventListener('click', async e=>{
  const af = e.target.closest('[data-ansfilter]');
  if(af){ myState.ansSid = af.dataset.ansfilter; return; }
  const se = e.target.closest('[data-saveexp]');
  if(se){
    const [sid, i] = [se.dataset.sid, +se.dataset.i], s = byId(sid), id = 's-'+sid+'-'+i;
    S.myExp = S.myExp || [];
    const at = S.myExp.findIndex(x=>x.id===id);
    if(at>=0) S.myExp.splice(at,1);
    else S.myExp.unshift({ id, en:s.exp[i][0], ko:s.exp[i][1], sid });
    save(); se.classList.toggle('on', at<0); se.textContent = at<0 ? '✓ 담김' : '＋ 담기';
    return;
  }
  const b = e.target.closest('[data-act]'); if(!b || b.tagName==='SELECT') return;
  const act = b.dataset.act, id = b.dataset.id;

  if(act==='saveAnswer'){
    const text = (document.getElementById('ansText')||{}).value || '';
    if(!rec.blob){ return; }
    b.disabled = true;
    try{
      const a = await putAnswer({ sid:rp.id, level:S.level, date:new Date().toISOString(), text:text.trim(), audio:rec.blob, dur:Math.round(rec.dur||0), check:null, best:false });
      rec.blob = null; touchDay('save');
      document.getElementById('saveMsg').innerHTML = `저장했어요. <a href="#note/answer/${a.id}">내 노트에서 보기</a>`;
      document.getElementById('rpCheckWrap').innerHTML = checkBlockHTML(a, 'rpCheck');
    }catch(err){ b.disabled = false; document.getElementById('saveMsg').textContent = '저장하지 못했어요: ' + err.message; }
  }
  if(act==='saveTyped'){
    const text = document.getElementById('typeText').value.trim();
    if(!text){ alert('답변을 먼저 써 주세요.'); return; }
    const a = await putAnswer({ sid:document.getElementById('typeSid').value, level:S.level, date:new Date().toISOString(), text, audio:null, dur:0, check:null, best:false });
    touchDay('save'); location.hash = '#note/answer/'+a.id;
  }
  if(act==='ansCheck') runCheck(id, b.dataset.target);
  if(act==='ansSaveText'){
    const a = ansById(id); a.text = document.getElementById('ansEdit').value.trim();
    await DB.put(a); rerenderMy();
    const m = document.getElementById('ansMsg'); if(m) m.textContent = '저장했어요.';
  }
  if(act==='ansBest'){
    const a = ansById(id), on = !a.best;
    for(const x of answersOf(a.sid)){ if(x.best !== (x===a && on)){ x.best = (x===a && on); await DB.put(x); } }
    rerenderMy();
  }
  if(act==='ansDelete'){
    if(!confirm('이 답변과 녹음을 삭제할까요? 되돌릴 수 없어요.')) return;
    await DB.del(+id); ANS = ANS.filter(a=>a.id!==+id); location.hash = '#note/answers';
  }
  if(act==='expAdd'){
    const en = document.getElementById('expEn').value.trim(), ko = document.getElementById('expKo').value.trim(), note = document.getElementById('expNote').value.trim();
    if(!en){ alert('영어 표현을 입력해 주세요.'); return; }
    S.myExp = S.myExp || []; S.myExp.unshift({ id:'m-'+Date.now(), en, ko, note }); save(); rerenderMy();
  }
  if(act==='expDel'){ S.myExp = (S.myExp||[]).filter(x=>x.id!==id); save(); rerenderMy(); }
  if(act==='expCards'){ deck.filter = 'mine'; deck.i = 0; deck.flipped = false; location.hash = '#cards'; }
  if(act==='customSave'){
    const v = k => document.getElementById(k).value.trim();
    if(!v('cTitle') || !v('cQ')){ alert('상황 이름과 질문은 꼭 입력해 주세요.'); return; }
    const exp = v('cExp').split('\n').map(l=>l.trim()).filter(Boolean).map(l=>{ const [en, ...ko] = l.split('|'); return { en:en.trim(), ko:ko.join('|').trim() }; });
    S.custom = S.custom || [];
    const old = S.custom.find(x=>x.id===id);
    const c = Object.assign(old || { id:'c-'+Date.now() }, { title:v('cTitle'), sit:v('cSit'), q:v('cQ'), answer:v('cA'), exp });
    if(!old) S.custom.push(c);
    save(); rebuildScenarios(); location.hash = '#note/custom';
  }
  if(act==='customDel'){
    if(!confirm('이 상황을 삭제할까요? 이 상황으로 저장한 답변은 남아 있어요.')) return;
    S.custom = (S.custom||[]).filter(x=>x.id!==id);
    Object.keys(LEVELS).forEach(l=>{ S.done[l] = S.done[l].filter(x=>x!==id); });
    save(); rebuildScenarios(); location.hash = '#note/custom';
  }
  if(act==='calPrev'){ myState.calOffset--; rerenderMy(); }
  if(act==='calNext'){ myState.calOffset = Math.min(0, myState.calOffset+1); rerenderMy(); }
  if(act==='backupExport'){ b.disabled = true; try{ await exportBackup(document.getElementById('bkAudio').checked); } finally{ b.disabled = false; } }
  if(act==='resetAll'){
    if(!confirm('정말 모든 기록을 지울까요? 되돌릴 수 없어요.')) return;
    S = defState(); save(); try{ await DB.clear(); }catch(err){} ANS = []; audioURLs.clear();
    rebuildScenarios(); renderLevelSeg(); location.hash = '#home';
  }
});
document.addEventListener('change', e=>{
  if(e.target.dataset.act==='ansFilter'){ myState.ansSid = e.target.value; rerenderMy(); }
  if(e.target.id==='bkFile' && e.target.files[0]) importBackup(e.target.files[0]);
});
