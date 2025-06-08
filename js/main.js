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
    if (e) e.preventDefault();
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.classList.add('show');
    }
    // Cerrar el menú hamburguesa después de mostrar el modal
    const menuContent = document.querySelector('.menu-content');
    if (menuContent) {
        menuContent.style.display = 'none';
    }
}

// Función para cerrar el modal de login
function closeLoginModal() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.classList.remove('show');
    }
}

// Función para cerrar sesión
function logout(e) {
    if (e) e.preventDefault();
    sessionStorage.removeItem('isAdminLoggedIn');
    window.location.href = 'index.html';
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

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Configuración del modal de login
    const loginModal = document.getElementById('loginModal');
    const closeButton = document.querySelector('.login-modal-close');
    
    if (loginModal && closeButton) {
        // Cerrar modal con la cruz
        closeButton.addEventListener('click', closeLoginModal);
        
        // Cerrar modal al hacer clic fuera
        loginModal.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                closeLoginModal();
            }
        });
    }

    // Configuración del menú hamburguesa
    const hamburger = document.querySelector('.hamburger-menu');
    const menuContent = document.querySelector('.menu-content');
    
    if (hamburger && menuContent) {
        let menuTimeout;

        // Mostrar el menú al pasar el mouse
        hamburger.addEventListener('mouseenter', function() {
            clearTimeout(menuTimeout);
            menuContent.style.display = 'block';
        });

        // Mantener el menú visible mientras el mouse esté sobre el contenido
        menuContent.addEventListener('mouseenter', function() {
            clearTimeout(menuTimeout);
            menuContent.style.display = 'block';
        });

        // Función para ocultar el menú con un pequeño retraso
        function hideMenu() {
            menuTimeout = setTimeout(function() {
                menuContent.style.display = 'none';
            }, 300);
        }

        // Ocultar el menú cuando el mouse sale del menú
        hamburger.addEventListener('mouseleave', function(e) {
            const toElement = e.relatedTarget;
            if (!menuContent.contains(toElement)) {
                hideMenu();
            }
        });

        // Ocultar el menú cuando el mouse sale del contenido
        menuContent.addEventListener('mouseleave', function(e) {
            const toElement = e.relatedTarget;
            if (!hamburger.contains(toElement)) {
                hideMenu();
            }
        });

        // Prevenir que el menú se oculte cuando el mouse está sobre el enlace
        const authLink = document.getElementById('hamburgerAuthLink');
        if (authLink) {
            authLink.addEventListener('mouseenter', function() {
                clearTimeout(menuTimeout);
                menuContent.style.display = 'block';
            });
        }
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
    e.preventDefault();
    window.location.href = 'publicar.html';
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

// Menú hamburguesa para móviles
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navUl = document.querySelector('nav ul');
    const menuContent = document.querySelector('.menu-content');
    
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navUl.classList.toggle('show');
            menuContent.classList.toggle('show');
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navUl.contains(e.target) && !menuContent.contains(e.target)) {
                hamburger.classList.remove('active');
                navUl.classList.remove('show');
                menuContent.classList.remove('show');
            }
        });

        // Prevenir que el menú se cierre al hacer clic dentro
        navUl.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        menuContent.addEventListener('click', function(e) {
            e.stopPropagation();
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