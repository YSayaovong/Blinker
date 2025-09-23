// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Car animation logic
const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
const car = document.getElementById('car');

// Show car on focus / typing
function showCar() {
  document.body.classList.add('show-car');
  car.classList.remove('car-exit'); // ensure clean state if previously exiting
}

// Hide car (slide out) and remove body flag after animation
function hideCar() {
  // trigger exit only if car is currently shown
  if (document.body.classList.contains('show-car')) {
    car.classList.add('car-exit');          // slides to the right
    // After transition ends, reset
    car.addEventListener('transitionend', function handleEnd() {
      document.body.classList.remove('show-car');
      car.classList.remove('car-exit');
      car.removeEventListener('transitionend', handleEnd);
    }, { once: true });
  }
}

// Events
input.addEventListener('focus', showCar);
input.addEventListener('input', showCar);

// On blur, only hide if user left the field or cleared it
input.addEventListener('blur', () => {
  if (!input.value.trim()) hideCar();
});

// On submit, prevent empty queries and always hide car
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const q = input.value.trim();
  if (!q) {
    // brief visual cue
    input.style.borderColor = '#ff7675';
    setTimeout(() => (input.style.borderColor = ''), 500);
    return;
  }
  hideCar();
  // Simulated navigation for reviewer; replace with your real results page as needed
  alert(`Searching for: ${q}`);
});
