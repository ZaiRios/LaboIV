// Mostrar el botón de scroll-top al hacer scroll
window.addEventListener('scroll', function() {
    const scrollBtn = document.getElementById('scroll-top');
    if (window.scrollY > 200) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});

// Menú hamburguesa para móviles (opcional, si se quiere hacer funcional)
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            const menu = hamburger.querySelector('.menu-content');
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        });
        document.body.addEventListener('click', function() {
            const menu = hamburger.querySelector('.menu-content');
            if (menu) menu.style.display = 'none';
        });
    }
});

// Sticky header con colores invertidos
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 10) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
}); 