/* ---------- Data (could be fetched; kept inline for GitHub Pages) ---------- */
const CARS = [
  { id:1, make:"Toyota", model:"RAV4", year:2022, price:789, segment:"SUV", img:"https://images.unsplash.com/photo-1605559424843-9e4a2c90e1a7?q=80&w=1200&auto=format&fit=crop" },
  { id:2, make:"Tesla", model:"Model 3", year:2023, price:999, segment:"EV",  img:"https://images.unsplash.com/photo-1549921296-3b4a6b6ca56b?q=80&w=1200&auto=format&fit=crop" },
  { id:3, make:"Ford",   model:"F-150", year:2021, price:859, segment:"Truck", img:"https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=1200&auto=format&fit=crop" },
  { id:4, make:"Honda",  model:"Civic", year:2020, price:699, segment:"Sedan", img:"https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1200&auto=format&fit=crop" },
  { id:5, make:"Hyundai",model:"Ioniq 5",year:2024, price:949, segment:"EV",  img:"https://images.unsplash.com/photo-1658287881755-0a8e8e0bbc54?q=80&w=1200&auto=format&fit=crop" },
  { id:6, make:"Chevy",  model:"Tahoe", year:2019, price:829, segment:"SUV",  img:"https://images.unsplash.com/photo-1605559424885-078d0e3ba6b2?q=80&w=1200&auto=format&fit=crop" },
  { id:7, make:"BMW",    model:"3 Series",year:2022,price:989, segment:"Sedan",img:"https://images.unsplash.com/photo-1549923746-9e7d9a2a8f3f?q=80&w=1200&auto=format&fit=crop" },
  { id:8, make:"Ford",   model:"Maverick",year:2024,price:799, segment:"Truck",img:"https://images.unsplash.com/photo-1618500296574-5a83f6a3a9b4?q=80&w=1200&auto=format&fit=crop" },
  { id:9, make:"Kia",    model:"EV6",   year:2023, price:919, segment:"EV",   img:"https://images.unsplash.com/photo-1659036874627-30a26aa9f3a2?q=80&w=1200&auto=format&fit=crop" }
];

/* ---------- State ---------- */
let page = 1, perPage = 6;
const $ = s => document.querySelector(s);
const grid = $("#grid");
const favKey = "blink:favorites";
const favorites = new Set(JSON.parse(localStorage.getItem(favKey) || "[]"));

/* ---------- Utilities ---------- */
function filterSort(items){
  const q = $("#q").value.trim().toLowerCase();
  const seg = $("#segment").value;
  const sort = $("#sort").value;

  let out = items.filter(x =>
    (!seg || x.segment === seg) &&
    (!q || `${x.make} ${x.model}`.toLowerCase().includes(q))
  );

  const [field, dir] = sort.split("-");
  out.sort((a,b)=>{
    let va = field === "price" ? a.price : a.year;
    let vb = field === "price" ? b.price : b.year;
    return dir === "asc" ? va - vb : vb - va;
  });
  return out;
}
function paginate(items){ 
  const total = Math.ceil(items.length / perPage) || 1;
  page = Math.max(1, Math.min(page, total));
  const start = (page-1)*perPage;
  return { slice: items.slice(start, start+perPage), total };
}

/* ---------- Render ---------- */
function render(){
  const filtered = filterSort(CARS);
  const { slice, total } = paginate(filtered);

  grid.innerHTML = slice.map(c => `
    <article class="card" role="listitem">
      <img class="card__img" src="${c.img}" alt="${c.year} ${c.make} ${c.model}" />
      <div class="card__body">
        <h3 class="card__title">${c.year} ${c.make} ${c.model}</h3>
        <p class="card__meta">${c.segment} • From $${c.price}/mo</p>
        <span class="badge">In Stock</span>
      </div>
      <div class="card__row">
        <button class="btn" data-view="${c.id}">View</button>
        <button class="btn ${favorites.has(c.id)?'btn--primary':''}" data-fav="${c.id}">
          ${favorites.has(c.id)?'★ Favorited':'☆ Favorite'}
        </button>
      </div>
    </article>
  `).join("");

  $("#prev").disabled = page <= 1;
  $("#next").disabled = page >= total;
  $("#pageLabel").textContent = `Page ${page} / ${total}`;
  $("#favLink").textContent = `Favorites (${favorites.size})`;
}

/* ---------- Events ---------- */
$("#filters").addEventListener("input", () => { page = 1; render(); });
$("#resetBtn").addEventListener("click", e => {
  e.preventDefault();
  $("#q").value = ""; $("#segment").value = ""; $("#sort").value = "price-asc";
  page = 1; render();
});
$("#prev").onclick = () => { page--; render(); };
$("#next").onclick = () => { page++; render(); };

grid.addEventListener("click", e => {
  const id = +e.target.dataset.view || +e.target.dataset.fav;
  if(!id) return;
  const car = CARS.find(c => c.id === id);

  if (e.target.hasAttribute("data-view")) {
    openModal(car);
  } else if (e.target.hasAttribute("data-fav")) {
    if (favorites.has(id)) favorites.delete(id); else favorites.add(id);
    localStorage.setItem(favKey, JSON.stringify([...favorites]));
    render();
  }
});

/* ---------- Modal (accessible) ---------- */
const modal = $("#modal"), modalBody = $("#modalBody");
let lastFocus;
function openModal(car){
  lastFocus = document.activeElement;
  modalBody.innerHTML = `
    <h3 id="modalTitle" style="margin:0 0 8px">${car.year} ${car.make} ${car.model}</h3>
    <img class="card__img" src="${car.img}" alt="">
    <p class="card__meta">Segment: ${car.segment} • From $${car.price}/mo</p>
    <button class="btn btn--primary" onclick="alert('Demo requested!')">Request Demo</button>
  `;
  modal.setAttribute("aria-hidden","false");
  modal.querySelector(".modal__close").focus();
}
function closeModal(){
  modal.setAttribute("aria-hidden","true");
  lastFocus && lastFocus.focus();
}
modal.addEventListener("click", e => { if (e.target.dataset.close !== undefined) closeModal(); });
document.addEventListener("keydown", e => { if(e.key==="Escape" && modal.getAttribute("aria-hidden")==="false") closeModal(); });

/* ---------- Contact form validation (HTML5 + JS) ---------- */
$("#contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.currentTarget;
  if (!form.reportValidity()) return;
  $("#formMsg").textContent = "Thanks! We’ll be in touch shortly.";
  form.reset();
});

/* ---------- Mobile nav ---------- */
const toggle = document.querySelector(".nav__toggle");
toggle.addEventListener("click", () => {
  const nav = document.getElementById("nav");
  const expanded = nav.getAttribute("aria-expanded") === "true";
  nav.setAttribute("aria-expanded", String(!expanded));
  toggle.setAttribute("aria-expanded", String(!expanded));
});

/* ---------- Footer year & initial render ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
render();
