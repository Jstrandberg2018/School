// First, let's modify the HTML to add a hamburger button
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.classList.add('hamburger');
    hamburgerBtn.innerHTML = '☰';
    nav.insertBefore(hamburgerBtn, nav.firstChild);

    // Style the hamburger button
    hamburgerBtn.style.display = 'none';
    hamburgerBtn.style.background = 'none';
    hamburgerBtn.style.border = 'none';
    hamburgerBtn.style.color = 'white';
    hamburgerBtn.style.fontSize = '1.5rem';
    hamburgerBtn.style.cursor = 'pointer';
    hamburgerBtn.style.padding = '0.5rem';

    const navList = nav.querySelector('ul');
    let isMenuOpen = false;

    // Handle responsive behavior
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            hamburgerBtn.style.display = 'block';
            navList.style.display = isMenuOpen ? 'flex' : 'none';
        } else {
            hamburgerBtn.style.display = 'none';
            navList.style.display = 'flex';
            isMenuOpen = false;
        }
    }

    // Toggle menu on hamburger click
    hamburgerBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            navList.style.display = 'flex';
        } else {
            navList.style.display = 'none';
        }
    });

    // Check screen size on load and resize
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');

    hamburger.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Reset nav display on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navList.style.display = 'flex';
        } else if (!navList.classList.contains('active')) {
            navList.style.display = 'none';
        }
    });
});