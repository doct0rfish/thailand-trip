/* Local-only trip tools; no personal data is sent to a server. */
const plannerEscape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const extraPlaces=[[/선빔/,'Sunbeam Hotel Pattaya','파타야 비치 인근의 숙소. 체크인·체크아웃 시간은 예약 내역에서 확인해요.','숙박'],[/워킹스트리트/,'Walking Street Pattaya','네온사인과 음악이 가득한 파타야의 밤거리. 식사 후 가볍게 둘러봐요.','60–90분'],[/에까마이/,'Ekkamai Eastern Bus Terminal Bangkok','방콕에서 파타야로 이동하는 출발 터미널. 도착 터미널과 승차권을 확인해요.','출발 30분 전'],[/왕궁/,'The Grand Palace Bangkok','태국 왕실의 궁전과 에메랄드 불상을 모신 왓 프라깨우를 함께 둘러봐요.','120–150분'],[/왓아룬/,'Wat Arun Bangkok','도자기 조각으로 장식된 탑이 돋보이는 강변 사원이에요.','60–90분'],[/카오산/,'Khao San Road Bangkok','길거리 음식과 음악을 즐길 수 있는 거리. 옆 람부뜨리도 함께 걸어봐요.','90–120분'],[/차이나타운/,'Yaowarat Road Bangkok','야오와랏 거리를 따라 여러 음식을 조금씩 나눠 먹기 좋은 밤 코스예요.','120–180분'],[/센트럴월드/,'centralwOrld Bangkok','시암 일대 쇼핑몰과 연결해서 쇼핑·식사를 즐겨요.','120–180분']];
let plannerFilter='전체';
const baseRender=render;
function plannerCategory(e){if(/이동|→|출발|도착|집결/.test(e[1]))return '이동';if(/호텔|체크|숙소/.test(e[1]))return '숙소';if(e[3]==='food')return '식사';if(/기상|휴식|자유시간|샤워/.test(e[1]))return '휴식';return '관광';}
function plannedDuration(e){const m=e[0].match(/(\d\d):(\d\d)[–-](\d\d):(\d\d)/);if(!m)return null;const n=(Number(m[3])*60+Number(m[4])-Number(m[1])*60-Number(m[2])+1440)%1440;return n>=60?`${Math.floor(n/60)}시간${n%60?' '+n%60+'분':''}`:`${n}분`;}
function plannerPlace(e){const old=place(e),extra=extraPlaces.find(p=>p[0].test(e[1]));return old?{query:old[1],map:old[3],dir:old[4],extra}:extra?{query:extra[1],extra}:null;}
function enhancePlanner(){
 const d=days[selected];
 document.querySelectorAll('.planner-tools,.next-stop,.empty-filter').forEach(x=>x.remove());
 const toolbar=document.createElement('div');toolbar.className='planner-tools';toolbar.setAttribute('aria-label','일정 종류');
 toolbar.innerHTML=['전체','관광','식사','이동','숙소'].map(t=>`<button aria-pressed="${plannerFilter===t}" type="button">${t}</button>`).join('');
 document.querySelector('#timeline').before(toolbar);
 toolbar.querySelectorAll('button').forEach(b=>b.onclick=()=>{plannerFilter=b.textContent;enhancePlanner();});
 let visible=0;
 document.querySelectorAll('#timeline .event').forEach((card,i)=>{
  const e=d.events[i],category=plannerCategory(e),p=plannerPlace(e),body=card.querySelector('.event-body');
  card.querySelector('.category').textContent=category;
  card.hidden=plannerFilter!=='전체'&&plannerFilter!==category;if(!card.hidden)visible++;
  card.querySelectorAll('.duration,.planner-description').forEach(x=>x.remove());
  const duration=plannedDuration(e),recommended=p?.extra?.[3]||(/야시장/.test(e[1])?'30분':category==='식사'?'45–60분':/야이차이/.test(e[1])?'45분':/마하탓/.test(e[1])?'60분':/차이왓타라남/.test(e[1])?'20분':/보트/.test(e[1])?'30분':null);
  const tags=[];if(duration)tags.push(`${category==='이동'?'예상 이동':'일정 배정'} ${duration}`);if(recommended&&category!=='이동')tags.push(`추천 체류 ${recommended}`);
  if(!duration&&category==='이동')tags.push('소요시간 확인 필요');
  if(tags.length){const n=document.createElement('div');n.className='duration';n.innerHTML=tags.map(t=>`<span>${plannerEscape(t)}</span>`).join('');body.querySelector('h3').after(n);}
  if(p?.extra&&e[2].length<65&&category!=='이동'){const n=document.createElement('p');n.className='planner-description';n.textContent=p.extra[2];body.querySelector('.event-links')?.before(n)||body.append(n);}
  if(p&&!body.querySelector('.event-links')){const n=document.createElement('div');n.className='event-links';n.innerHTML=plannerLinks(p);body.append(n);}
 });
 if(!visible){const n=document.createElement('p');n.className='empty-filter';n.textContent='이날에는 해당 종류의 일정이 없어요. 전체 일정을 확인해 주세요.';document.querySelector('#timeline').append(n);}
 const next=d.events.findIndex((e,i)=>!visits[`${selected}-${i}`]&&plannerPlace(e));
 const shortcut=document.createElement('div');shortcut.className='next-stop';
 shortcut.innerHTML=next<0?'<div><small>오늘의 발자국</small><strong>정해진 장소를 모두 둘러봤어요.</strong></div>':`<div><small>다음 체크할 장소 · ${plannerEscape(d.events[next][0])}</small><strong>${plannerEscape(d.events[next][1])}</strong></div><a class="button" target="_blank" rel="noreferrer" href="${plannerEscape(plannerPlace(d.events[next]).dir||'https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(plannerPlace(d.events[next]).query))}">길찾기 ↗</a>`;
 document.querySelector('#day-note').before(shortcut);
 const note=document.querySelector('#planner-note');try{note.value=localStorage.getItem(`thai-note-${selected}`)||'';}catch{note.value='';}
 document.querySelector('#note-state').textContent='메모는 이 기기에만 저장됩니다.';
 document.querySelectorAll('[data-event]').forEach(el=>{el.onchange=()=>{visits[`${selected}-${el.dataset.event}`]=el.checked;try{localStorage.setItem('thai-trip-visits',JSON.stringify(visits));}catch{storageOK=false;}el.closest('.event').querySelector('.event-card').classList.toggle('checked',el.checked);progress();enhancePlanner();};});
 try{localStorage.setItem('thai-last-day',String(selected));}catch{}
}
function plannerLinks(p){const q=encodeURIComponent(p.query);return `<a class="button" target="_blank" rel="noreferrer" href="${plannerEscape(p.map||'https://www.google.com/maps/search/?api=1&query='+q)}">지도 보기</a><a class="button primary" target="_blank" rel="noreferrer" href="${plannerEscape(p.dir||'https://www.google.com/maps/dir/?api=1&destination='+q)}">길찾기 ↗</a>`;}
const notesCard=document.createElement('section');notesCard.className='side-card';notesCard.innerHTML='<h3><label for="planner-note">이날의 메모</label></h3><textarea id="planner-note" class="note-field" placeholder="예약번호, 만날 장소, 먹고 싶은 것…"></textarea><p class="note-state" id="note-state" aria-live="polite"></p>';
document.querySelector('.day-aside').append(notesCard);
document.querySelector('#planner-note').oninput=e=>{try{localStorage.setItem(`thai-note-${selected}`,e.target.value);document.querySelector('#note-state').textContent='저장했어요 · 이 기기에만 보관';}catch{document.querySelector('#note-state').textContent='저장할 수 없어요. 메모를 따로 복사해 주세요.';}};
render=function(index){plannerFilter='전체';baseRender(index);enhancePlanner();document.querySelector(`#day-tab-${index}`)?.scrollIntoView({block:'nearest',inline:'nearest'});};
function restaurantDurations(){document.querySelectorAll('.restaurant-card .restaurant-content').forEach(c=>{if(c.querySelector('.duration'))return;const n=document.createElement('div');n.className='duration';n.innerHTML='<span>추천 체류 45–60분 · 대기 별도</span>';c.querySelector('.restaurant-actions')?.before(n);});}
restaurantDurations();new MutationObserver(restaurantDurations).observe(document.querySelector('#restaurants'),{childList:true,subtree:true});
const stayCards=document.querySelectorAll('#stays .info-card');stayCards.forEach((c,i)=>{const p=document.createElement('p');p.textContent=i===1?'파타야에서 3박을 보내는 숙소. 예약 확인서를 휴대폰에 저장해 두세요.':'호텔 미정 · 예약 후 정확한 위치와 이동시간을 확인하세요.';c.append(p);if(i===1){const n=document.createElement('div');n.className='event-links';n.innerHTML=plannerLinks({query:'Sunbeam Hotel Pattaya'});c.append(n);}});
let initial=0;try{const n=Number(localStorage.getItem('thai-last-day'));if(Number.isInteger(n)&&n>=0&&n<days.length)initial=n;}catch{}
render(initial);
