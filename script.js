document.addEventListener('DOMContentLoaded', () => {
  const car     = document.getElementById('car');
  const input   = document.getElementById('q');
  const form    = document.querySelector('.search');
  const btn     = document.getElementById('searchBtn');
  const results = document.getElementById('results');

  // Authoritative state switch: never leave both 'in' and 'out'
  const setCar = (state) => {
    if (state === 'in')  car.className = 'car in';
    if (state === 'out') car.className = 'car out';
  };

  const showCar = () => { void car.offsetWidth; setCar('in'); };
  const hideCar = () => { void car.offsetWidth; setCar('out'); };

  // Show on focus/click/empty input
  input.addEventListener('focus', showCar);
  input.addEventListener('click', showCar);
  input.addEventListener('input', () => {
    if (input.value.trim() === '') { showCar(); clearResults(); }
  });

  // Hide immediately when the button is pressed (before submit)
  btn.addEventListener('pointerdown', hideCar);

  // Hide on submit/Enter and run demo search
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    hideCar();
    performSearch(input.value);
  });

  function clearResults(){ results.replaceChildren(); }
  function setBusy(b){ results.setAttribute('aria-busy', b ? 'true' : 'false'); }

  function performSearch(query){
    const q = query.trim().toLowerCase(); if (!q) return;
    setBusy(true);
    const cars = [
      { model: 'Toyota Corolla', year: 2021, color: 'White' },
      { model: 'Mazda 3',        year: 2020, color: 'Red'   },
      { model: 'Hyundai i30',    year: 2022, color: 'Blue'  },
    ];
    const filtered = cars.filter(c => c.model.toLowerCase().includes(q));
    displayResults(filtered);
    setBusy(false);
  }

  function displayResults(items){
    clearResults();
    if (!items.length){
      const p = document.createElement('p');
      p.textContent = 'No cars found. Try a different keyword.';
      results.appendChild(p);
      return;
    }
    const frag = document.createDocumentFragment();
    for (const item of items){
      const card = document.createElement('div'); card.className = 'result-item';
      card.innerHTML = `
        <h3>${item.model}</h3>
        <p><strong>Year:</strong> ${item.year}</p>
        <p><strong>Color:</strong> ${item.color}</p>`;
      frag.appendChild(card);
    }
    results.appendChild(frag);
  }

  // Start hidden to the right; focusing the input will bring it in
  setCar('out');
});
