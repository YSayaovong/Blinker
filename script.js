document.addEventListener('DOMContentLoaded', () => {
  const car     = document.querySelector('.car');
  const input   = document.querySelector('#q');
  const button  = document.querySelector('#searchBtn');
  const results = document.querySelector('#results');

  const showCar = () => {
    car.classList.remove('out');
    void car.offsetWidth;
    car.classList.add('in');
  };

  const hideCar = () => {
    car.classList.remove('in');
    void car.offsetWidth;
    car.classList.add('out');
  };

  input.addEventListener('focus', showCar);
  input.addEventListener('click', showCar);

  button.addEventListener('click', () => {
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
      results.innerHTML = '';
    }
  });

  function performSearch(query) {
    if (!query.trim()) return;

    const cars = [
      { model: "Toyota Corolla", year: 2021, color: "White" },
      { model: "Mazda 3", year: 2020, color: "Red" },
      { model: "Hyundai i30", year: 2022, color: "Blue" }
    ];

    const filtered = cars.filter(car =>
      car.model.toLowerCase().includes(query.toLowerCase())
    );

    displayResults(filtered);
  }

  function displayResults(cars) {
    results.innerHTML = '';

    if (cars.length === 0) {
      results.innerHTML = '<p>No cars found. Try a different keyword.</p>';
      return;
    }

    cars.forEach(car => {
      const div = document.createElement('div');
      div.className = 'result-item';
      div.innerHTML = `
        <h3>${car.model}</h3>
        <p><strong>Year:</strong> ${car.year}</p>
        <p><strong>Color:</strong> ${car.color}</p>
      `;
      results.appendChild(div);
    });
  }
});
