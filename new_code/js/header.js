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
