<?php
require_once 'config.php';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error en la Reserva - DriveAr</title>
    <link rel="icon" type="image/x-icon" href="images/favicon.ico">
    <link rel="stylesheet" href="css/estilos.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <header>
        <a href="index.html">
            <img src="images/Logo_DriveAr.png" alt="Logo DriveAr" class="logo">
        </a>
        <nav>
            <ul>
                <li><a href="index.html">Inicio</a></li>
                <li><a href="#">Cómo Funciona</a></li>
                <li><a href="#">Preguntas Frecuentes</a></li>
                <li><a href="Contacto.html">Contacto</a></li>
                <li><a href="#">Ser Anfitrión</a></li>
                <div class="hamburger-menu">
                    <span></span>
                    <div class="menu-content">
                        <a href="#">Ingreso/Registro</a>
                    </div>
                </div>
            </ul>
        </nav>
    </header>

    <main class="failure-container">
        <div class="failure-block">
            <div class="failure-icon">
                <i class="fas fa-times-circle"></i>
            </div>
            <h1>Error en la Reserva</h1>
            <div class="decorative-line"></div>
            <p>Lo sentimos, ha ocurrido un error al procesar tu reserva. Por favor, intenta nuevamente o contacta a nuestro servicio de atención al cliente.</p>
            <div class="error-details">
                <h2>Detalles del Error</h2>
                <p class="error-message"><?php echo $_GET['error'] ?? 'Error desconocido'; ?></p>
            </div>
            <div class="action-buttons">
                <a href="javascript:history.back()" class="btn-primary">Intentar Nuevamente</a>
                <a href="Contacto.html" class="btn-secondary">Contactar Soporte</a>
            </div>
        </div>
    </main>

    <footer>
        <div class="social-icons">
            <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
        </div>
        <nav>
            <a href="index.html">Inicio</a>
            <a href="#">Como funciona</a>
            <a href="#">Preguntas frecuentes</a>
            <a href="Contacto.html">Contacto</a>
        </nav>
        <div style="margin-top: 10px;">
            &copy; 2025 DriveAR. Todos los derechos reservados.
        </div>
        <div style="margin-top: 10px;">
            <a href="#">Política de privacidad</a> | <a href="#">Términos de uso</a>
        </div>
    </footer>

    <button id="scroll-top" onclick="window.scrollTo({top: 0, behavior: 'smooth'})" style="position: fixed; bottom: 20px; right: 20px; background-color: #b06d13; color: white; border: none; padding: 10px; border-radius: 5px; cursor: pointer;">
        <i class="fas fa-arrow-up"></i>
    </button>
    <script src="js/main.js"></script>
</body>
</html> 