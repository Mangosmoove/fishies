const drawCanvas = document.getElementById('draw-canvas');
const dctx = drawCanvas.getContext('2d');
let currentColor = '#00ffe0';
let currentSize = 5;

function showScreen(screenId) {
  document.getElementById('modal-user-screen').style.display = 'none';
  document.getElementById('modal-draw-screen').style.display = 'none';
  document.getElementById(screenId).style.display = 'flex';
}

function openModal() {
  document.getElementById('modal-overlay').classList.add('open');
  currentUser = null;
  renderUserSlots();
  showScreen('modal-user-screen');
  updateContinueBtn();
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

function clearDrawing() {
  dctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
}

function renderUserSlots() {
  const container = document.getElementById('user-slots');
  container.innerHTML = '';

  userList.forEach(name => {
    const count = userFishCount[name] || 0;
    const full = count >= MAX_FISH_PER_USER;
    const selected = name === currentUser;

    const slot = document.createElement('div');
    slot.className = 'user-slot' + (selected ? ' selected' : '') + (full ? ' full' : '');

    const pips = Array.from({ length: MAX_FISH_PER_USER }, (_, i) => {
      const filled = i < count;
      return `<span class="pip${filled ? '' : ' empty-pip'}"></span>`;
    }).join('');

    const badge = full
      ? `<span class="slot-tag tag-full">TANK FULL</span>`
      : selected
        ? `<span class="slot-tag tag-selected">SELECTED</span>`
        : '';

    slot.innerHTML = `
      <span class="slot-name">${name}</span>
      <span class="slot-right">
        <span class="pip-row">${pips}</span>
        ${badge}
      </span>
    `;

    if (!full) slot.onclick = () => selectUser(name);
    container.appendChild(slot);
  });

  // always one empty slot at the end
  const emptySlot = document.createElement('div');
  emptySlot.className = 'user-slot empty';
  emptySlot.innerHTML = `<span class="pen-icon">✎</span><span>NEW PLAYER</span>`;
  emptySlot.onclick = () => activateNewPlayerInput(emptySlot);
  container.appendChild(emptySlot);
}

function selectUser(name) {
  currentUser = name;
  renderUserSlots();
  updateContinueBtn();
}

function activateNewPlayerInput(slotEl) {
  currentUser = null;          
  updateContinueBtn();         
  renderUserSlots();           // redraws slots so selection clears
  
  // re query the empty slot since renderUserSlots() replaced the DOM
  const freshEmpty = document.querySelector('.user-slot.empty');
  freshEmpty.innerHTML = '';
  freshEmpty.className = 'editing-row';
  freshEmpty.onclick = null;

  const inp = document.createElement('input');
  inp.type = 'text';
  inp.maxLength = 16;
  inp.placeholder = 'YOUR NAME';
  inp.className = 'slot-name-input';
  inp.autocomplete = 'off';

  const confirmBtn = document.createElement('button');
  confirmBtn.textContent = 'CONFIRM';
  confirmBtn.className = 'confirm-btn';
  confirmBtn.onclick = () => commitNewUser(inp.value);
  inp.onkeydown = e => { if (e.key === 'Enter') commitNewUser(inp.value); };

  freshEmpty.appendChild(inp);
  freshEmpty.appendChild(confirmBtn);
  inp.focus();
}

function commitNewUser(raw) {
  const name = raw.trim().toUpperCase();
  if (!name || userList.includes(name)) {
    renderUserSlots();
    return;
  }
  userList.push(name);
  userFishCount[name] = 0;
  currentUser = name;
  renderUserSlots();
  updateContinueBtn();
}

function updateContinueBtn() {
  const btn = document.getElementById('user-continue-btn');
  if (!currentUser) {
    btn.disabled = true;
    btn.textContent = 'CONTINUE';
    return;
  }
  const count = userFishCount[currentUser] || 0;
  if (count >= MAX_FISH_PER_USER) {
    btn.disabled = true;
    btn.textContent = 'TANK FULL';
  } else {
    btn.disabled = false;
    btn.textContent = 'CONTINUE';
  }
}

function confirmUsername() {
  if (!currentUser) return;
  if ((userFishCount[currentUser] || 0) >= MAX_FISH_PER_USER) return;
  showScreen('modal-draw-screen');
  clearDrawing();
}

function addFishToTank() {
  if (!currentUser) return;
  if ((userFishCount[currentUser] || 0) >= MAX_FISH_PER_USER) {
    setStatus('TANK FULL');
    closeModal();
    return;
  }
  const img = new Image();
  img.src = drawCanvas.toDataURL();
  img.onload = () => {
    const scale = 0.35 + Math.random() * 0.3;
    const speed = 0.5 + Math.random() * Math.random() * 2;
    const angle = Math.random() * Math.PI * 2;
    fish.push({
      img,
      owner: currentUser,
      x: 80 + Math.random() * (W - 160),
      y: 80 + Math.random() * (H - 160),
      w: drawCanvas.width * scale,
      h: drawCanvas.height * scale,
      phase: Math.random() * Math.PI * 2,
      opacity: 1,
      wobble: 0,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed
    });
    userFishCount[currentUser]++;
    document.getElementById('fish-count').textContent = `FISH: ${fish.length}`;
    closeModal();
  };
}