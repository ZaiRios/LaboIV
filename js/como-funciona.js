// Funcionalidad para el botón de scroll
document.addEventListener('DOMContentLoaded', function() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
});

// Funcionalidad para el menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const menuContent = document.querySelector('.menu-content');
    
    hamburger.addEventListener('click', function() {
        menuContent.classList.toggle('active');
    });
}); 