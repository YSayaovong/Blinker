document.addEventListener('DOMContentLoaded', () => {
  const q    = document.getElementById('q');
  const btn  = document.getElementById('searchBtn');
  const car  = document.querySelector('.car');   // <div class="car">

  if (!q || !btn || !car) return;

  // Make sure car begins off-screen to the right
  function prime() {
    car.style.transform = 'translateX(120%)';
    car.style.willChange = 'transform';
  }

  let anim = null;

  function runCar() {
    // Cancel any in-flight animation
    if (anim && typeof anim.cancel === 'function') anim.cancel();

    // Always start from the right
    prime();

    // Animate with Web Animations API (bypasses CSS class/keyframe issues)
    anim = car.animate(
      [
        { transform: 'translateX(120%)' },
        { transform: 'translateX(0%)' }
      ],
      {
        duration: 2600,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)', // ease-out feel
        fill: 'forwards'
      }
    );

    anim.onfinish = () => {
      car.style.transform = 'translateX(0%)'; // lock the final position
      anim = null;
    };
  }

  function handle(e) {
    if (e.type === 'keydown') {
      if (e.key !== 'Enter') return;
      e.preventDefault();
    }
    runCar();
  }

  // Wire up events once DOM is ready
  prime();
  btn.addEventListener('click', handle);
  q.addEventListener('keydown', handle);
});
