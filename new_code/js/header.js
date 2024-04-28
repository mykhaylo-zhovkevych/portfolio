/* document.addEventListener('DOMContentLoaded', () => {
    const listItems = document.querySelectorAll('.list');
    console.log('List items found:', listItems.length);

    function activeLink(event) {
        console.log('Active link triggered on:', event.currentTarget); // Check which element triggered the event

        // Debug each iteration
        listItems.forEach(item => {
            console.log('Removing active from:', item);
            item.classList.remove('active');
        });

        event.currentTarget.classList.add('active');
        console.log('Added active to:', event.currentTarget);
    }

    listItems.forEach(item => {
        console.log('Adding event listener to:', item);
        item.addEventListener('click', activeLink);
    });
}); */

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

    // Initialize the position based on the active item on load
    const activeItem = document.querySelector('.list.active');
    if (activeItem) {
        moveIndicator(activeItem);
    }
});
