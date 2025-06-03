<?php
require_once 'config.php';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reserva Pendiente - DriveAr</title>
    <link rel="icon" type="image/x-icon" href="images/favicon.ico">
    <link rel="stylesheet" href="estilos.css">
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

    <main class="pending-container">
        <div class="pending-block">
            <div class="pending-icon">
                <i class="fas fa-clock"></i>
            </div>
            <h1>Reserva Pendiente</h1>
            <div class="decorative-line"></div>
            <p>Tu reserva está siendo procesada. Te notificaremos por correo electrónico cuando se confirme.</p>
            <div class="reservation-details">
                <h2>Detalles de la Reserva</h2>
                <div class="details-grid">
                    <div class="detail-item">
                        <i class="fas fa-car"></i>
                        <span>Volvo C40 Ultimate</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-calendar"></i>
                        <span>Fecha de inicio: <?php echo $_GET['start_date'] ?? 'No especificada'; ?></span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-calendar-check"></i>
                        <span>Fecha de fin: <?php echo $_GET['end_date'] ?? 'No especificada'; ?></span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-money-bill-wave"></i>
                        <span>Total: $<?php echo $_GET['amount'] ?? '0'; ?></span>
                    </div>
                </div>
            </div>
            <div class="action-buttons">
                <a href="index.html" class="btn-primary">Volver al Inicio</a>
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

    <button id="scroll-top" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
        <i class="fas fa-arrow-up"></i>
    </button>
    <script src="main.js"></script>
</body>
</html> 