/* ---------- Data (demo) ---------- */
const VEHICLES = [
  {
    id: 1, year: 2021, make: 'Volkswagen', model: 'T-Roc',
    km: 20, body: 'Wagon', trans: 'Automatic',
    price: 3390,
    img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 2, year: 2018, make: 'Kia', model: 'Cerato',
    km: 80282, body: 'Hatchback', trans: 'Auto Seq Sportshift',
    price: 1590,
    img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 3, year: 2021, make: 'MG', model: 'HS',
    km: 20, body: 'Wagon', trans: 'Auto Dual Clutch',
    price: 2434,
    img: 'https://images.unsplash.com/photo-1617814079634-3d1f3bfa2a71?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 4, year: 2020, make: 'Kia', model: 'Sportage',
    km: 32000, body: 'SUV', trans: 'Automatic',
    price: 2290,
    img: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 5, year: 2022, make: 'Volkswagen', model: 'Tiguan',
    km: 5000, body: 'SUV', trans: 'Automatic',
    price: 2890,
    img: 'https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 6, year: 2019, make: 'Subaru', model: 'XV',
    km: 48000, body: 'Wagon', trans: 'Automatic',
    price: 1990,
    img: 'https://images.unsplash.com/photo-1605557635309-4f8a2b0ea57a?q=80&w=1200&auto=format&fit=crop'
  }
];

/* ---------- Utilities ---------- */
const $ = (sel, root=document) => root.querySelector(sel);
const fmtCurrency = (n) => `$${n.toLocaleString()}`;
const fmtKm = (n) => `${n.toLocaleString()} km`;

/* ---------- Browse page logic ---------- */
function initBrowse() {
  const grid = $('#grid');
  if (!grid) return; // not on browse page

  // Elements
  const qInput = $('#q');
  const priceMax = $('#priceMax');
  const priceLabel = $('#priceRangeLabel');
  const nores = $('#no-results');

  // Seed query from URL (?q=...)
  const urlQ = new URLSearchParams(location.search).get('q') || '';
  qInput.value = urlQ;

  function card(v) {
    return `
      <article class="card">
        <img class="card__img" src="${v.img}" alt="${v.year} ${v.make} ${v.model}">
        <div class="card__body">
          <a href="#" class="card__title">${v.year} ${v.make} ${v.model}</a>
          <div class="specs">
            <span>🚗</span><span>${fmtKm(v.km)}</span>
            <span>🚙</span><span>${v.body}</span>
            <span>⚙️</span><span>${v.trans}</span>
          </div>
          <div class="price">${fmtCurrency(v.price)}</div>
        </div>
      </article>
    `;
  }

  function render() {
    const q = qInput.value.trim().toLowerCase();
    const max = Number(priceMax.value);

    priceLabel.textContent = `$0 to ${fmtCurrency(max)}`;

    const list = VEHICLES.filter(v => {
      const matchesQ = !q || `${v.year} ${v.make} ${v.model} ${v.body} ${v.trans}`.toLowerCase().includes(q);
      const matchesPrice = v.price <= max;
      return matchesQ && matchesPrice;
    });

    grid.innerHTML = list.map(card).join('');
    nores.classList.toggle('hidden', list.length > 0);
  }

  qInput.addEventListener('input', render);
  priceMax.addEventListener('input', render);

  render();
}

/* ---------- Home page (no special JS, form goes to browse) ---------- */
function init() {
  initBrowse();
}
document.addEventListener('DOMContentLoaded', init);
