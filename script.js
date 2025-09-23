// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Car animation
const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
const car = document.getElementById('car');

function showCar() {
  document.body.classList.add('show-car');
  car.classList.remove('car-exit');
}
function hideCar() {
  if (document.body.classList.contains('show-car')) {
    car.classList.add('car-exit');
    car.addEventListener('transitionend', function done() {
      document.body.classList.remove('show-car');
      car.classList.remove('car-exit');
      car.removeEventListener('transitionend', done);
    }, { once: true });
  }
}
input.addEventListener('focus', showCar);
input.addEventListener('input', showCar);
input.addEventListener('blur', () => { if (!input.value.trim()) hideCar(); });
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const q = input.value.trim();
  if (!q) { input.style.borderColor = '#ff7675'; setTimeout(() => input.style.borderColor = '', 500); return; }
  hideCar();
  alert(`Searching for: ${q}`);
});

// ---------- Image fallback logic ----------
// If a local /assets/... image 404s on GitHub Pages, swap to RAW URL.
const fallbacks = {
  logoImg:   "https://raw.githubusercontent.com/YSayaovong/Blinker/main/assets/blinker-icon.4f9b2663.png",
  heroBg:    "https://raw.githubusercontent.com/YSayaovong/Blinker/main/assets/building.681ea6bf.png",
  previewImg:"https://raw.githubusercontent.com/YSayaovong/Blinker/main/assets/website.PNG"
};

for (const [id, rawUrl] of Object.entries(fallbacks)) {
  const img = document.getElementById(id);
  if (!img) continue;
  img.addEventListener('error', () => {
    if (img.dataset.fallbackApplied === '1') return; // avoid loops
    img.dataset.fallbackApplied = '1';
    img.src = rawUrl;
  }, { once: true });
}
