(() => {
  const official = 'https://guide.michelin.com/en/th/bangkok-region/bangkok/restaurants/';
  const items = [];
  const candidates = [
    ['빕 구르망', '룽르엉 땅 · Rung Rueang Tung Pork Noodle', '돼지고기 국수 · 똠얌 국수', '수쿰윗 26. 다진 돼지고기와 어묵을 넣은 국수로, 맑은 국물과 똠얌 스타일을 고를 수 있어요.', 'Rung Rueang Tung Sukhumvit 26 Bangkok', 'guay-tiew-mu-rung-rueang'],
    ['빕 구르망', '히어하이 · Here Hai (Vadhana)', '게살볶음밥 · 해산물', '에까마이. 큼직한 게살을 올린 볶음밥이 대표 메뉴예요. 큰 접시로 나와 세 명이 나눠 먹기 좋아요.', 'Here Hai Ekkamai Bangkok', 'here-hai'],
    ['빕 구르망', '텐선즈 · Ten Suns', '소고기 국수', '구시가지. 푹 삶은 소고기의 여러 부위를 고를 수 있고, 소고기 완자도 함께 즐길 수 있어요.', 'Ten Suns Bangkok', 'ten-suns'],
    ['빕 구르망', '솜삭 푸옵 · Somsak Pu Ob (Charoen Rat)', '게 · 새우 당면 요리', '짜런랏점. 게나 새우를 당면과 함께 익혀 해산물의 맛이 당면에 배어 있는 요리가 대표적이에요.', 'Somsak Pu Ob Charoen Rat Bangkok', 'somsak-pu-ob-charoen-rat'],
    ['빕 구르망', '크루아 압손 · Krua Apsorn (Dusit)', '태국 가정식 · 새우와 연근 커리', '두싯점 기준으로 선정되었어요. 기존 맛집 후보의 딘소점과 다른 지점이에요. 새우·연근 옐로커리와 매콤한 돼지고기 볶음을 맛볼 수 있어요.', 'Krua Apsorn 503 Sam Sen Bangkok', 'krua-apsorn-sam-sen'],
    ['빕 구르망', '꼬 파닛 · K. Panich', '망고 찹쌀밥', '구시가지. 코코넛 밀크를 머금은 찹쌀밥과 달콤한 망고를 함께 먹는 디저트 전문점이에요.', 'K Panich Bangkok', 'k-panich'],
    ['일반 선정', '롱롯 · Rongros', '소고기 그린커리 · 로티', '왓아룬이 보이는 강변 식당. 그린커리와 로티, 당면 샐러드가 대표적이에요. 일몰 전망 좌석은 미리 예약하는 편이 좋아요.', 'Rongros Tha Tien Bangkok', 'rongros'],
    ['일반 선정', '탕쑤이헹 · Tang Sui Heng (Banthat Thong Road)', '뚝배기 오리 조림', '반탓통점. 오리고기와 내장 등을 넣은 뚝배기 조림이 대표 메뉴인 가족 운영 식당이에요.', 'Tang Sui Heng Banthat Thong Bangkok', 'tung-sui-heng-pochana-stadium-one'],
    ['일반 선정', '수파니가 이팅룸 · Supanniga Eating Room (Phra Nakhon)', '태국 가정식 · 배추볶음과 돼지고기 조림', '할머니의 레시피를 이어가는 강변 식당으로 왓아룬 전망을 즐길 수 있어요. 배추볶음과 허브·차무앙 잎을 넣은 삼겹살 조림이 대표적이에요.', 'Supanniga Eating Room Tha Tien Bangkok', 'supanniga-eating-room-tha-tian'],
    ['일반 선정', '차크라봉세 다이닝 · Chakrabongse Dining', '태국 왕실 요리 · 오리 레드커리', '역사적인 저택에서 강과 왓아룬을 바라보며 태국 왕실 요리를 즐겨요. 날짜별 세트 메뉴로 운영하며 과일을 곁들인 오리 레드커리와 새우 코코넛 수프가 소개되어 있어요.', 'Chakrabongse Dining Bangkok', 'chakrabongse-dining'],
    ['일반 선정', '차름갱 · Charmgang', '현대 태국 요리 · 생선 포멜로 샐러드', '현지 식재료로 태국 음식의 맛과 식감을 새롭게 표현해요. 생선을 곁들인 포멜로 샐러드와 코코넛 팬케이크 위에 올린 가리비 요리가 소개되어 있어요.', 'Charmgang Bangkok', 'charmgang'],
    ['일반 선정', '100 Mahaseth', '이산 요리 · 고기와 내장 요리', '지역 식재료의 여러 부위를 활용하는 이산 음식 전문점이에요. 쏨땀, 바삭한 돼지껍질, 새콤매콤한 돼지갈비 수프와 태국산 숙성 스테이크를 즐길 수 있어요.', '100 Mahaseth Bangkok', '100-mahaseth']
  ];
  candidates.forEach(([grade,name,dish,description,destination,slug]) => items.push({grade,name,dish,description,destination,source: slug ? 'https://guide.michelin.com/en/bangkok-region/bangkok/restaurant/' + slug : official + 'the-plate-michelin'}));
  const section = document.querySelector('#restaurants');
  const filters = section.querySelector('.restaurant-filters');
  const originalGrid = document.querySelector('#restaurant-cards');
  const tabs = document.createElement('div');
  tabs.className = 'restaurant-filters michelin-tabs';
  tabs.setAttribute('role', 'group');
  tabs.setAttribute('aria-label', '맛집 목록 선택');
  tabs.innerHTML = '<button type="button" aria-pressed="true" data-food-list="original">기존 맛집 후보</button><button type="button" aria-pressed="false" data-food-list="michelin">미쉐린 맛집</button><button type="button" aria-pressed="false" data-food-list="chinatown">차이나타운</button>';
  filters.before(tabs);
  const panel = document.createElement('div');
  panel.hidden = true;
  panel.innerHTML = '<h3>방콕 미쉐린 맛집</h3><p class="michelin-note">빕 구르망 추천 6곳 · 일반 선정 추천 6곳<br>빕 구르망은 합리적인 가격의 좋은 음식, 일반 선정은 좋은 요리로 가이드에 오른 식당이에요. 코스와 소개 메뉴는 계절에 따라 달라질 수 있어요.<br>지점명 기준 · 2026.09.25 확인</p><div class="restaurant-filters" role="group" aria-label="미쉐린 구분"></div><div class="restaurant-cards"></div>';
  originalGrid.after(panel);
  const gradeFilters = panel.querySelector('.restaurant-filters');
  const grid = panel.querySelector('.restaurant-cards');
  const esc = value => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const chinatown = document.createElement('div');
  chinatown.hidden = true;
  const chinaPlaces = [
    ['나이엑 롤 누들', 'Nai Ek Roll Noodle', '롤 쌀국수 · 바삭한 돼지고기', '후추 향이 강한 맑은 돼지고기 국물에 돌돌 말린 쌀국수를 넣은 꾸어이짭이 대표 메뉴예요.', 'Nai Ek Roll Noodle Yaowarat Bangkok'],
    ['크루아 폰 라마이', 'Krua Porn Lamai', '랏나 · 철판 소스 국수', '뜨거운 철판에 면과 걸쭉한 소스를 내는 랏나가 유명해요. 볶음면도 있는 차이나타운 식당이에요.', 'Krua Porn Lamai Plaeng Nam Bangkok'],
    ['Tanbo Chicken Rice', '', '카오만까이 · 닭고기 덮밥', '싱가포르식 치킨라이스를 선보이는 야오와랏 거리의 식당이에요. 부드러운 삶은 닭이나 바삭한 닭튀김을 향긋한 밥과 함께 먹을 수 있어요.', 'Tanbo Chicken Rice Yaowarat Bangkok'],
    ['HAGOW Yaowarat', '', '하가우 · 딤섬 · 돼지고기 덮밥', '새우를 넣은 하가우와 슈마이 등 딤섬을 맛볼 수 있는 식당이에요. 돼지고기 조림 덮밥도 있어 딤섬과 함께 한 끼 식사로 즐기기 좋아요.', 'HAGOW Yaowarat Bangkok']
  ];
  const chinaCard = ([name, english, dish, description, destination]) => `<article class="restaurant-card"><div class="restaurant-content"><span class="restaurant-tag">차이나타운 · 방콕</span><h3>${esc(name)}</h3>${english ? `<span class="restaurant-english">${esc(english)}</span>` : ''}<p class="restaurant-signature">${esc(dish)}</p><p class="restaurant-description">${esc(description)}</p><div class="restaurant-actions"><a class="button" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}" target="_blank" rel="noreferrer" aria-label="${esc(name)} 지도">▧ 지도</a><a class="button primary" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}" target="_blank" rel="noreferrer" aria-label="${esc(name)} 길찾기">➤ 길찾기</a></div></div></article>`;
  chinatown.innerHTML = `<h3>차이나타운에서 먹을 것</h3><div class="restaurant-cards">${chinaPlaces.map(chinaCard).join('')}</div>`;
  panel.after(chinatown);
  const labels = ['전체', '빕 구르망', '일반 선정'];
  gradeFilters.innerHTML = labels.map(label => `<button type="button" data-grade="${label}" aria-pressed="false">${label}</button>`).join('') + '<span aria-live="polite"></span>';
  function render(grade) {
    const matches = items.filter(item => grade === '전체' || item.grade === grade);
    gradeFilters.querySelector('span').textContent = matches.length + '곳';
    gradeFilters.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.grade === grade)));
    grid.innerHTML = matches.map(item => `<article class="restaurant-card"><div class="restaurant-content"><span class="restaurant-tag">${item.grade} · 방콕</span><h3>${esc(item.name)}</h3><p class="restaurant-signature">${esc(item.dish)}</p><p class="restaurant-description">${esc(item.description)}</p><div class="restaurant-actions"><a class="button primary" target="_blank" rel="noreferrer" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.destination)}" aria-label="${esc(item.name)} 길찾기">➤ 길찾기</a><a class="restaurant-details" href="${item.source}" target="_blank" rel="noreferrer">미쉐린 공식 정보 ↗</a></div></div></article>`).join('');
  }
  gradeFilters.querySelectorAll('button').forEach(button => button.addEventListener('click', () => render(button.dataset.grade)));
  function selectList(list) {
    filters.hidden = list !== 'original';
    originalGrid.hidden = list !== 'original';
    panel.hidden = list !== 'michelin';
    chinatown.hidden = list !== 'chinatown';
    tabs.querySelectorAll('button').forEach(tab => tab.setAttribute('aria-pressed', String(tab.dataset.foodList === list)));
  }
  tabs.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    if (button.dataset.foodList === 'chinatown') location.hash = 'chinatown';
    else if (location.hash === '#chinatown') location.hash = 'restaurants';
    selectList(button.dataset.foodList);
  }));
  const syncChinatown = () => { if (location.hash === '#chinatown') selectList('chinatown'); };
  window.addEventListener('hashchange', syncChinatown);
  syncChinatown();
  render('전체');
})();



