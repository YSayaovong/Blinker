const vehicles = [
  {id:1, make:'Toyota', model:'RAV4 Hybrid', type:'SUV',   price:299, img:'https://images.unsplash.com/photo-1619767886558-efdc259cde1e?q=80&w=1600&auto=format&fit=crop'},
  {id:2, make:'Subaru',  model:'Forester',    type:'SUV',   price:249, img:'https://images.unsplash.com/photo-1605557635309-4f8a2b0ea57a?q=80&w=1600&auto=format&fit=crop'},
  {id:3, make:'Volkswagen', model:'Golf',     type:'Hatch', price:199, img:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop'},
  {id:4, make:'Polestar',  model:'2',         type:'EV',    price:399, img:'https://images.unsplash.com/photo-1668695278799-39140f6a9f8e?q=80&w=1600&auto=format&fit=crop'},
  {id:5, make:'Toyota',   model:'Camry',      type:'Sedan', price:219, img:'https://images.unsplash.com/photo-1524125913555-1c45255d054b?q=80&w=1600&auto=format&fit=crop'},
  {id:6, make:'Subaru',   model:'Impreza',    type:'Hatch', price:209, img:'https://images.unsplash.com/photo-1624116048723-11b1fc4fc22f?q=80&w=1600&auto=format&fit=crop'}
];

const grid = document.getElementById('grid');
const nores = document.getElementById('no-results');

function cardHTML(v){
  return `<div class="card bg-white rounded-2xl overflow-hidden">
    <img src="${v.img}" alt="${v.make} ${v.model}" class="h-44 w-full object-cover">
    <div class="p-4">
      <div class="flex items-center justify-between">
        <h4 class="font-semibold">${v.make} ${v.model}</h4>
        <div class="text-teal-700 font-bold">$${v.price}<span class="text-xs font-medium text-slate-500">/wk</span></div>
      </div>
      <div class="mt-1 text-sm text-slate-600">${v.type}</div>
      <button class="mt-3 w-full px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-700">Subscribe</button>
    </div>
  </div>`;
}

function render(){
  const make  = document.getElementById('filter-make').value;
  const type  = document.getElementById('filter-type').value;
  const price = +document.getElementById('filter-price').value || Infinity;
  const q     = document.getElementById('filter-search').value.toLowerCase();

  const list = vehicles.filter(v =>
    (!make || v.make === make) &&
    (!type || v.type === type) &&
    (v.price <= price) &&
    (!q || `${v.make} ${v.model}`.toLowerCase().includes(q))
  );
  grid.innerHTML = list.map(cardHTML).join('');
  nores.classList.toggle('hidden', list.length > 0);
}

['filter-make','filter-type','filter-price','filter-search'].forEach(id =>
  document.getElementById(id).addEventListener('input', render)
);

render();
document.getElementById('y').textContent = new Date().getFullYear();
