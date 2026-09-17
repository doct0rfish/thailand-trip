(() => {
  const storageKey = 'thai-trip-packing-v1';
  const inputs = [...document.querySelectorAll('[data-packing-key]')];
  let saved = {};
  let canSave = true;
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (value && typeof value === 'object' && !Array.isArray(value)) saved = value;
  } catch { canSave = false; }
  function update() {
    const done = inputs.filter(input => input.checked).length;
    document.querySelector('#packing-count').textContent = `${done} / ${inputs.length}`;
    document.querySelector('#packing-progress').value = done;
    document.querySelectorAll('[data-packing-category]').forEach(card => {
      const checks = [...card.querySelectorAll('input')];
      card.querySelector('.packing-category-count').textContent = `${checks.filter(input => input.checked).length} / ${checks.length}`;
    });
    document.querySelector('#packing-save-note').textContent = canSave
      ? '체크 상태는 이 기기의 브라우저에 자동 저장돼요.'
      : '현재 브라우저에서 저장할 수 없어, 페이지를 닫으면 체크 상태가 사라질 수 있어요.';
  }
  inputs.forEach(input => {
    input.checked = saved[input.dataset.packingKey] === true;
    input.addEventListener('change', () => {
      saved[input.dataset.packingKey] = input.checked;
      try { localStorage.setItem(storageKey, JSON.stringify(saved)); canSave = true; }
      catch { canSave = false; }
      update();
    });
  });
  update();
})();
