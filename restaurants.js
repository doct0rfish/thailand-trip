(() => {
  const grid = document.querySelector('#restaurant-cards');
  const escape = value => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function renderRestaurants(city) {
    const matches = restaurantData.filter(item => city === '전체' || item.city === city);
    document.querySelector('#restaurant-count').textContent = `${matches.length}곳`;
    grid.innerHTML = matches.map(item => {
      const [name, ...english] = item.name.split(' · ');
      const destination = new URL(item.direction).searchParams.get('destination');
      const map = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(destination);
      return `<article class="restaurant-card"><div class="restaurant-content"><span class="restaurant-tag">${item.city} · ${escape(item.dish.split(' · ')[0])}</span><h3>${escape(name)}</h3><span class="restaurant-english">${escape(english.join(' · '))}</span><p class="restaurant-signature">${escape(item.dish)}</p>${item.description ? `<p class="restaurant-description">${escape(item.description)}</p>` : ''}<div class="restaurant-actions"><a class="button" href="${map}" target="_blank" rel="noreferrer" aria-label="${escape(name)} 지도">▧ 지도</a><a class="button primary" href="${escape(item.direction)}" target="_blank" rel="noreferrer" aria-label="${escape(name)} 길찾기">➤ 길찾기</a><a class="restaurant-details" href="${escape(item.source)}" target="_blank" rel="noreferrer" aria-label="${escape(name)} 상세 정보">상세 정보 ↗</a></div></div></article>`;
    }).join('');
    document.querySelectorAll('[data-restaurant-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.restaurantFilter === city)));
  }
  document.querySelectorAll('[data-restaurant-filter]').forEach(button => button.addEventListener('click', () => renderRestaurants(button.dataset.restaurantFilter)));
  const syncHeading = () => document.body.classList.toggle('restaurant-view-active', location.hash === '#restaurants');
  window.addEventListener('hashchange', syncHeading);
  syncHeading();
  renderRestaurants('전체');
})();
