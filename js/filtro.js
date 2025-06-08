function filtrarPorUbicacion() {
    const ubicacion = document.getElementById('ubicacion-select').value;
    
    if (!ubicacion) {
        alert('Por favor, seleccione una ubicación');
        return;
    }

    // Guardar la ubicación seleccionada en localStorage
    localStorage.setItem('ubicacionSeleccionada', ubicacion);
    
    // Redirigir a la página de resultados
    window.location.href = 'resultados.html';
}

// Función para filtrar los autos en la página de resultados
function filtrarAutosPorUbicacion() {
    const ubicacion = localStorage.getItem('ubicacionSeleccionada');
    if (!ubicacion) return;

    const carCards = document.querySelectorAll('.car-card');
    
    carCards.forEach(card => {
        const link = card.querySelector('.ver-detalles');
        const href = link.getAttribute('href');
        
        // Obtener el contenido del archivo de detalle
        fetch(href)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const ubicacionAuto = doc.querySelector('.ubicacion').textContent.trim();
                
                // Mostrar u ocultar según la ubicación
                if (ubicacion === 'caba' && ubicacionAuto.includes('CABA')) {
                    card.style.display = 'block';
                } else if (ubicacion === 'buenos-aires' && !ubicacionAuto.includes('CABA')) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Error al cargar el detalle del auto:', error);
                card.style.display = 'none';
            });
    });
}

// Ejecutar el filtrado cuando se carga la página de resultados
if (window.location.pathname.includes('resultados.html')) {
    document.addEventListener('DOMContentLoaded', filtrarAutosPorUbicacion);
} 