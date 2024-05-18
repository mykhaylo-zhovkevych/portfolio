document.addEventListener('DOMContentLoaded', () => {
    const listItems = document.querySelectorAll('.list');
    const indicator = document.querySelector('.indicator');  

    function activeLink(event) {
        listItems.forEach(item => item.classList.remove('active'));
        event.currentTarget.classList.add('active');
        moveIndicator(event.currentTarget);
    }

     function moveIndicator(activeItem) {
        const rect = activeItem.getBoundingClientRect();
        const navRect = document.querySelector('.navigation').getBoundingClientRect();
        const leftPosition = rect.left - navRect.left + (rect.width / 2) - (indicator.offsetWidth / 2);
        indicator.style.transform = `translateX(${leftPosition}px)`;
    } 

    listItems.forEach(item => item.addEventListener('click', activeLink));


});

// auto-resizable
let lastWindowWidth = window.innerWidth;
function hasSignificantResize(newWidth) {
  // Definieren Sie einen Schwellenwert für eine "signifikante" Änderung
  const threshold = 100; // Beispiel: 100 Pixel Unterschied
  return Math.abs(newWidth - lastWindowWidth) > threshold;
}
window.addEventListener('resize', () => {
  const currentWidth = window.innerWidth;
 
  if (hasSignificantResize(currentWidth)) {
    window.scrollTo(0, 0);
    lastWindowWidth = currentWidth;
    window.location.reload();
  }
});


// span for section01
document.addEventListener('DOMContentLoaded', (event) => {
  const iconSpan = document.getElementById('icon-cycle');
  const icons = [
    '<i class="devicon-java-plain"></i>',
    '<i class="devicon-javascript-plain"></i>',
    '<i class="devicon-c-plain"></i>',
    '<i class="devicon-html5-plain"></i>',
    '<i class="devicon-css3-plain"></i>',
    '<i class="devicon-bash-plain"></i>',
    '<i class="devicon-spring-plain"></i>',
    '<i class="devicon-linux-plain"></i>',
    '<i class="devicon-mysql-plain"></i>'
  ];
  let currentIndex = 0;

  function cycleIcons() {
    iconSpan.style.opacity = 0; 

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % icons.length;
      iconSpan.innerHTML = icons[currentIndex];
      iconSpan.style.opacity = 1; 
    }, 500); 
  }

  setInterval(cycleIcons, 2000);
});