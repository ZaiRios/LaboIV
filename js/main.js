// Mostrar el botón de scroll-top al hacer scroll
window.addEventListener('scroll', function() {
    const scrollBtn = document.getElementById('scroll-top');
    if (window.scrollY > 200) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});

// Función para mostrar el modal de login
function showLoginForm(e) {
    e.preventDefault();
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.classList.add('show');
    }
}

// Función para cerrar el modal de login
function closeLoginModal() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.classList.remove('show');
    }
}

// Función para verificar el estado de login
function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('isAdminLoggedIn') === 'true';
    const adminHeaderLink = document.getElementById('adminHeaderLink');
    const hamburgerAuthLink = document.getElementById('hamburgerAuthLink');
    
    if (adminHeaderLink) {
        adminHeaderLink.style.display = isLoggedIn ? 'block' : 'none';
    }
    
    if (hamburgerAuthLink) {
        hamburgerAuthLink.textContent = isLoggedIn ? 'Cerrar Sesión' : 'Ingreso/Registro';
        hamburgerAuthLink.onclick = isLoggedIn ? logout : showLoginForm;
    }
}

// Función para cerrar sesión
function logout(e) {
    e.preventDefault();
    sessionStorage.removeItem('isAdminLoggedIn');
    checkLoginStatus();
    // Cerrar el menú hamburguesa
    const menuContent = document.querySelector('.menu-content');
    if (menuContent) {
        menuContent.style.display = 'none';
    }
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Configuración del menú hamburguesa
    const hamburger = document.querySelector('.hamburger-menu');
    const menuContent = document.querySelector('.menu-content');
    
    if (hamburger && menuContent) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            menuContent.style.display = menuContent.style.display === 'block' ? 'none' : 'block';
        });

        // Cerrar el menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !menuContent.contains(e.target)) {
                menuContent.style.display = 'none';
            }
        });
    }

    // Configuración del formulario de login
    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === 'A' && password === 'A') {
                sessionStorage.setItem('isAdminLoggedIn', 'true');
                checkLoginStatus();
                closeLoginModal();
                window.location.href = 'admin.html';
            } else {
                alert('Credenciales incorrectas. Por favor, intente nuevamente.');
            }
        });
    }

    // Verificar estado de login al cargar la página
    checkLoginStatus();
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

// Function to capitalize first letter of each sentence
function capitalizeSentences(text) {
    return text.replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase());
}

// Add event listeners to all input fields and textarea
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', function(e) {
            const start = this.selectionStart;
            const end = this.selectionEnd;
            const oldValue = this.value;
            const newValue = capitalizeSentences(oldValue);
            
            if (oldValue !== newValue) {
                this.value = newValue;
                // Restore cursor position
                this.setSelectionRange(start, end);
            }
        });
    });
});

// Función para verificar si el usuario está logueado
function isUserLoggedIn() {
    return sessionStorage.getItem('isLoggedIn') === 'true';
}

// Función para manejar el clic en "Ser Anfitrión"
function handleAnfitrionClick(e) {
    if (!isUserLoggedIn()) {
        e.preventDefault();
        showLoginModal();
    }
}

// Agregar event listeners para los enlaces de "Ser Anfitrión"
document.addEventListener('DOMContentLoaded', function() {
    const anfitrionLinks = document.querySelectorAll('a[href="publicar.html"]');
    anfitrionLinks.forEach(link => {
        link.addEventListener('click', handleAnfitrionClick);
    });
}); 

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