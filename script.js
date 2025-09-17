document.addEventListener('DOMContentLoaded', () => {
  const car     = document.getElementById('car');
  const input   = document.getElementById('q');
  const form    = document.querySelector('.search');
  const results = document.getElementById('results');
  const btn     = document.getElementById('searchBtn');

  const showCar = () => {
    car.classList.remove('out');
    // force reflow so repeated focus retriggers animation
    void car.offsetWidth;
    car.classList.add('in');
  };

  const hideCar = () => {
    car.classList.remove('in');
    void car.offsetWidth;
    car.classList.add('out');
  };

  // Show car on focus/click/typing when empty
  input.addEventListener('focus', showCar);
  input.addEventListener('click', showCar);
  input.addEventListener('input', () => {
    if (input.value.trim() === '') {
      showCar();
      clearResults();
    }
  });

  // Submit via button or Enter
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    hideCar();
    performSearch(input.value);
  });
  // Belt-and-suspenders for the button
  btn.addEventListener('click', () => hideCar());

  function setBusy(isBusy) {
    results.setAttribute('aria-busy', isBusy ? 'true' : 'false');
  }

  function clearResults() {
    results.replaceChildren();
  }

  function noResults() {
    clearResults();
    const p = document.createElement('p');
    p.textContent = 'No cars found. Try a different keyword.';
    results.appendChild(p);
  }

  function performSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) return;

    setBusy(true);

    // demo dataset
    const cars = [
      { model: 'Toyota Corolla', year: 2021, color: 'White' },
      { model: 'Mazda 3',        year: 2020, color: 'Red'   },
      { model: 'Hyundai i30',    year: 2022, color: 'Blue'  },
    ];

    const filtered = cars.filter(c => c.model.toLowerCase().includes(q));
    displayResults(filtered);
    setBusy(false);
  }

  function displayResults(items) {
    clearResults();
    if (!items.length) return noResults();

    const frag = document.createDocumentFragment();
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'result-item';

      const h3 = document.createElement('h3');
      h3.textContent = item.model;

      const y = document.createElement('p');
      y.innerHTML = `<strong>Year:</strong> ${item.year}`;

      const c = document.createElement('p');
      c.innerHTML = `<strong>Color:</strong> ${item.color}`;

      card.append(h3, y, c);
      frag.appendChild(card);
    });
    results.appendChild(frag);
  }

  // Initial state: car parked offscreen to the right
  showCar();
});
