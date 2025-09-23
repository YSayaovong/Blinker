// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Elements
const form  = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
const body  = document.body;

// Show car when user is about to type
function showCar(){
  body.classList.add('show-car');
  body.classList.remove('car-exit');
}
input.addEventListener('focus', showCar);
input.addEventListener('input', showCar);

// On Search button: slide car out to the right
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  body.classList.remove('show-car');
  body.classList.add('car-exit');

  // optional: do something with the query
  // const q = input.value.trim();
  // if (q) window.location.hash = '#fleet';
});

// If the field is abandoned and empty, reset (car hidden offscreen left)
input.addEventListener('blur', ()=>{
  if (!input.value.trim()){
    body.classList.remove('show-car','car-exit');
  }
});
