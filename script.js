// Verificar cuando carga la página
window.onload = function() {
    // Recuperar el usuario logueado
    const usuarioData = localStorage.getItem('usuarioLogueado');
    
    if (usuarioData) {
        const usuario = JSON.parse(usuarioData);
        const welcomeElement = document.getElementById('welcomeUser');
        if (welcomeElement) {
            welcomeElement.innerHTML = `🎉 ¡BIENVENIDO ${usuario.nombre.toUpperCase()}! 🎉`;
        }
        
        // Mostrar personaje del quiz si existe
        if (usuario.personajeQuiz) {
            const quizResultElement = document.getElementById('quizResultado');
            if (quizResultElement) {
                quizResultElement.innerHTML = `🏆 Tu personaje en el quiz es: ${usuario.personajeQuiz}`;
            }
        }
        
        console.log(`Usuario ${usuario.nombre} ha iniciado sesión`);
    } else {
        // Si no hay usuario logueado, redirigir al login
        window.location.href = 'login.html';
    }
};

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    window.location.href = 'login.html';
}

// Asignar evento al botón de cerrar sesión
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        cerrarSesion();
    });
}

      // Cerrar sesión desde el menú
        function cerrarSesion() {
            localStorage.removeItem('usuarioLogueado');
            window.location.href = 'login.html';
        }
        const logoutBtn = document.getElementById('logoutBtnMenu');
        if (logoutBtn) logoutBtn.addEventListener('click', (e) => { e.preventDefault(); cerrarSesion(); });