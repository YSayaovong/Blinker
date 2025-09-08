document.addEventListener('DOMContentLoaded', () => {
  const car     = document.querySelector('.car');
  const input   = document.querySelector('#q');
  const form    = document.querySelector('.search');
  const results = document.querySelector('#results');

  const showCar = () => {
    car.classList.remove('out');
    void car.offsetWidth; // reflow to restart animation
    car.classList.add('in');
  };

  const hideCar = () => {
    car.classList.remove('in');
    void car.offsetWidth;
    car.classList.add('out');
  };

  input.addEventListener('focus', showCar);
  input.addEventListener('click', showCar);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    hideCar();
    performSearch(input.value);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      hideCar();
      performSearch(input.value);
    }
  });

  input.addEventListener('input', () => {
    if (input.value.trim() === '') {
      showCar();
      clearResults();
    }
  });

  function setBusy(isBusy) {
    results.setAttribute('aria-busy', isBusy ? 'true' : 'false');
  }

  function clearResults() {
    results.replaceChildren();
  }

  function noResultsMessage() {
    clearResults();
    const p = document.createElement('p');
    p.textContent = 'No cars found. Try a different keyword.';
    results.appendChild(p);
  }

  function performSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) return;

    setBusy(true);

    // Demo dataset (static)
    const cars = [
      { model: "Toyota Corolla", year: 2021, color: "White" },
      { model: "Mazda 3",        year: 2020, color: "Red"   },
      { model: "Hyundai i30",    year: 2022, color: "Blue"  }
    ];

    const filtered = cars.filter(c => c.model.toLowerCase().includes(q));
    displayResults(filtered);
    setBusy(false);
  }

  function displayResults(cars) {
    clearResults();

    if (!cars.length) {
      noResultsMessage();
      return;
    }

    const frag = document.createDocumentFragment();
    cars.forEach(car => {
      const div = document.createElement('div');
      div.className = 'result-item';

      const h3 = document.createElement('h3');
      h3.textContent = car.model;

      const pYear = document.createElement('p');
      const strongYear = document.createElement('strong');
      strongYear.textContent = 'Year: ';
      pYear.append(strongYear, document.createTextNode(String(car.year)));

      const pColor = document.createElement('p');
      const strongColor = document.createElement('strong');
      strongColor.textContent = 'Color: ';
      pColor.append(strongColor, document.createTextNode(car.color));

      div.append(h3, pYear, pColor);
      frag.appendChild(div);
    });
    results.appendChild(frag);
  }
});
