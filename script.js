const API_URL = "https://jsonplaceholder.typicode.com/users";
const grid = document.getElementById("grid");
const statusEl = document.getElementById("status");
const searchInput = document.getElementById("searchInput");

let robots = [];
let filtered = [];

function debounce(fn, ms = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(null, args), ms);
  };
}

function makeCard({ id, name, username, email }) {
  const uname = (username || name || String(id) || "").toString();
  const url = new URL("https://robohash.org/" + encodeURIComponent(uname));
  url.searchParams.set("size", "200x200");
  url.searchParams.set("set", "set2");

  const art = document.createElement("article");
  art.className = "card";
  art.tabIndex = 0;

  const img = document.createElement("img");
  img.src = url.toString();
  img.alt = `${name || "robot"} avatar`;
  img.loading = "lazy";
  img.decoding = "async";
  img.referrerPolicy = "no-referrer";

  const h3 = document.createElement("h3");
  h3.textContent = name || "(no name)";

  const pUser = document.createElement("p");
  pUser.className = "sub";
  pUser.textContent = username || "";

  const pEmail = document.createElement("p");
  pEmail.className = "muted";
  pEmail.textContent = email || "";

  art.append(img, h3, pUser, pEmail);
  return art;
}

function clearGrid() {
  grid.replaceChildren();
}

function render(list) {
  clearGrid();
  if (!list.length) {
    statusEl.textContent = "No matches.";
    statusEl.classList.remove("hidden");
    return;
  }
  statusEl.classList.add("hidden");
  const frag = document.createDocumentFragment();
  list.forEach(item => frag.appendChild(makeCard(item)));
  grid.appendChild(frag);
}

function applyFilter(q) {
  const query = q.trim().toLowerCase();
  filtered = !query
    ? robots.slice()
    : robots.filter(r =>
        (r.name || "").toLowerCase().includes(query) ||
        (r.username || "").toLowerCase().includes(query) ||
        (r.email || "").toLowerCase().includes(query)
      );
  render(filtered);
}

async function loadRobots() {
  try {
    statusEl.textContent = "Loading robots…";
    const res = await fetch(API_URL, { method: "GET", mode: "cors" });
    if (!res.ok) throw new Error(`Network error: ${res.status}`);
    const data = await res.json();
    robots = Array.isArray(data) ? data : [];
    filtered = robots.slice();
    statusEl.classList.add("hidden");
    render(filtered);
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Unable to load data. Check your internet and refresh.";
    statusEl.classList.remove("hidden");
  }
}

searchInput.addEventListener("input", debounce(e => applyFilter(e.target.value), 150));
loadRobots();
