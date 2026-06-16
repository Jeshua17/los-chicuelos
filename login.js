// login.js - Con conexión a MySQL mediante API

const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', async function() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (email === "") {
        alert("❌ Por favor, ingresa tu correo electrónico");
        return;
    }

    if (password === "") {
        alert("❌ Por favor, ingresa tu contraseña");
        return;
    }

    // Mostrar mensaje de "cargando"
    const mensajeDiv = document.getElementById('mensajeBienvenida');
    mensajeDiv.style.display = "block";
    mensajeDiv.innerHTML = "⏳ Verificando credenciales...";
    mensajeDiv.style.backgroundColor = "rgba(0,0,0,0.7)";

    // Deshabilitar botón para evitar doble envío
    loginBtn.disabled = true;

    try {
        // Llamar a la API de login
        const respuesta = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                correo: email,
                contraseña: password
            })
        });

        const data = await respuesta.json();

        if (respuesta.ok && data.success) {
            // Guardar usuario en localStorage
            localStorage.setItem('usuarioLogueado', JSON.stringify({
                id: data.usuario.id_usuario,
                nombre: data.usuario.nombre_usuario,
                email: data.usuario.correo
            }));

            mensajeDiv.innerHTML = `🎉 ¡BIENVENIDO ${data.usuario.nombre_usuario.toUpperCase()}! 🎉<br>⚡ Redirigiendo al cuartel ⚡`;
            mensajeDiv.style.backgroundColor = "rgba(139, 0, 0, 0.95)";

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        } else {
            mensajeDiv.innerHTML = `❌ ${data.mensaje || "Credenciales incorrectas"}`;
            mensajeDiv.style.backgroundColor = "rgba(139, 0, 0, 0.7)";
            loginBtn.disabled = false;
        }

    } catch (error) {
        console.error("Error de conexión:", error);
        mensajeDiv.innerHTML = "❌ Error de conexión con el servidor. ¿Está corriendo node server.js?";
        mensajeDiv.style.backgroundColor = "rgba(139, 0, 0, 0.7)";
        loginBtn.disabled = false;
    }
});