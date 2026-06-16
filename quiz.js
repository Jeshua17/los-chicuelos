// Preguntas del quiz
const preguntas = [
    {
        texto: "¿Qué harías si tuvieras superpoderes?",
        opciones: [
            { texto: "Dominar el mundo y que todos me teman", personaje: "Homelander" },
            { texto: "Destruir a los corruptos sin importar los métodos", personaje: "Billy Butcher" },
            { texto: "Ayudar a los inocentes y ser un símbolo de esperanza", personaje: "Starlight" },
            { texto: "Proteger a mis seres queridos a toda costa", personaje: "Queen Maeve" },
            { texto: "Usarlos para vengar una injusticia personal", personaje: "Hughie" }
        ]
    },
    {
        texto: "¿Cuál es tu frase favorita?",
        opciones: [
            { texto: "Soy el que puede hacer lo que quiera", personaje: "Homelander" },
            { texto: "Hay que ensuciarse las manos para cambiar las cosas", personaje: "Billy Butcher" },
            { texto: "La luz siempre vence a la oscuridad", personaje: "Starlight" },
            { texto: "A veces hay que elegir entre lo correcto y lo fácil", personaje: "Queen Maeve" },
            { texto: "No soy un héroe, solo alguien que no se rinde", personaje: "Hughie" }
        ]
    },
    {
        texto: "¿Cómo reaccionas ante la injusticia?",
        opciones: [
            { texto: "La aplasto sin piedad", personaje: "Homelander" },
            { texto: "La enfrento con violencia si es necesario", personaje: "Billy Butcher" },
            { texto: "Busco una solución pacífica pero firme", personaje: "Starlight" },
            { texto: "Dudo entre mis principios y lo que debo hacer", personaje: "Queen Maeve" },
            { texto: "Busco aliados para enfrentarla", personaje: "Hughie" }
        ]
    },
    {
        texto: "Tu mayor defecto es...",
        opciones: [
            { texto: "Mi ego y necesidad de ser amado", personaje: "Homelander" },
            { texto: "Mi obsesión por la venganza", personaje: "Billy Butcher" },
            { texto: "Mi ingenuidad y confianza en los demás", personaje: "Starlight" },
            { texto: "Mi indecisión y miedo al qué dirán", personaje: "Queen Maeve" },
            { texto: "Mi falta de confianza en mí mismo", personaje: "Hughie" }
        ]
    },
    {
        texto: "¿Qué te motiva a seguir luchando?",
        opciones: [
            { texto: "El poder y el reconocimiento", personaje: "Homelander" },
            { texto: "La venganza contra los que me hicieron daño", personaje: "Billy Butcher" },
            { texto: "Hacer del mundo un lugar mejor", personaje: "Starlight" },
            { texto: "Proteger a los que no pueden protegerse solos", personaje: "Queen Maeve" },
            { texto: "Las personas que amo", personaje: "Hughie" }
        ]
    },
    {
        texto: "En un equipo, tú eres...",
        opciones: [
            { texto: "El líder que toma todas las decisiones", personaje: "Homelander" },
            { texto: "El que hace el trabajo sucio", personaje: "Billy Butcher" },
            { texto: "La conciencia del grupo", personaje: "Starlight" },
            { texto: "La voz de la razón", personaje: "Queen Maeve" },
            { texto: "El que se asegura de que todos estén a salvo", personaje: "Hughie" }
        ]
    },
    {
        texto: "¿Qué es lo más importante para ti?",
        opciones: [
            { texto: "El poder absoluto", personaje: "Homelander" },
            { texto: "La justicia, aunque sea violenta", personaje: "Billy Butcher" },
            { texto: "La honestidad y la bondad", personaje: "Starlight" },
            { texto: "La lealtad y el deber", personaje: "Queen Maeve" },
            { texto: "La familia y los amigos", personaje: "Hughie" }
        ]
    }
];

// Datos de los personajes (descripciones)
const personajesInfo = {
    "Homelander": {
        emoji: "🇺🇸💀",
        descripcion: "Eres narcisista, poderoso y te encanta ser el centro de atención. Tienes una necesidad insaciable de ser amado y adorado, pero detrás de esa fachada hay un lado oscuro y peligroso. Cuidado con tu ego...",
        frase: "Puedo hacer lo que quiera, cuando quiera, a quien quiera.",
        poder: "💥 Visión de rayos X | Vuelo | Súper fuerza"
    },
    "Billy Butcher": {
        emoji: "🧥⚡",
        descripcion: "Eres rebelde, implacable y no te importa ensuciarte las manos por lo que crees justo. Tu sed de venganza es tu motor, pero también tu mayor debilidad. Eres un líder nato, aunque a veces demasiado extremo.",
        frase: "Hay dos tipos de personas en este mundo: los que tienen el poder y los que lo sufren.",
        poder: "🔫 Estrategia | Determinación | Fuerza de voluntad"
    },
    "Starlight": {
        emoji: "⭐✨",
        descripcion: "Eres bondadosa, empática y siempre buscas hacer el bien. Aunque el mundo intente corromperte, mantienes tus principios intactos. Eres la luz en la oscuridad, pero cuidado con ser demasiado ingenua.",
        frase: "La verdadera fuerza viene de hacer lo correcto, incluso cuando nadie te ve.",
        poder: "💫 Luz cegadora | Energía pura | Corazón noble"
    },
    "Queen Maeve": {
        emoji: "👑⚔️",
        descripcion: "Eres fuerte, leal y luchas entre lo que debes hacer y lo que realmente quieres. Tienes un gran sentido del deber, pero a veces dudas de ti misma. Necesitas reconectar con tu verdadera esencia.",
        frase: "A veces el mayor acto de valentía es simplemente seguir adelante.",
        poder: "🛡️ Súper fuerza | Resistencia | Maestría en combate"
    },
    "Hughie": {
        emoji: "😨💙",
        descripcion: "Eres valiente a tu manera, aunque tengas miedo. No eres el más fuerte físicamente, pero tu corazón y lealtad te hacen especial. Te preocupas por los demás y siempre buscas hacer lo correcto, incluso si tiemblas.",
        frase: "No soy un héroe. Solo soy un tipo normal al que pasaron cosas malas.",
        poder: "🧠 Inteligencia técnica | Lealtad | Coraje inesperado"
    }
};

// Variables globales
let respuestasUsuario = [];
let preguntaActual = 0;

// Función para mostrar la pregunta actual
function mostrarPregunta() {
    const pregunta = preguntas[preguntaActual];
    const container = document.getElementById('preguntaContainer');
    
    // Calcular progreso
    const progreso = ((preguntaActual) / preguntas.length) * 100;
    
    let html = `
        <div class="progreso">
            <div class="progreso-bar" style="width: ${progreso}%"></div>
        </div>
        <div class="contador-preguntas">
            Pregunta ${preguntaActual + 1} de ${preguntas.length}
        </div>
        <div class="pregunta-texto">
            ${pregunta.texto}
        </div>
        <div class="opciones">
    `;
    
    pregunta.opciones.forEach((opcion, index) => {
        const seleccionada = respuestasUsuario[preguntaActual] === index;
        const claseSeleccionada = seleccionada ? 'opcion-seleccionada' : '';
        html += `
            <div class="opcion ${claseSeleccionada}" onclick="seleccionarOpcion(${index})">
                ${opcion.texto}
            </div>
        `;
    });
    
    html += `
        </div>
        <div class="btn-siguiente">
            <button id="siguienteBtn" ${respuestasUsuario[preguntaActual] !== undefined ? '' : 'disabled'}>
                ${preguntaActual === preguntas.length - 1 ? '✨ VER MI RESULTADO ✨' : '➡ SIGUIENTE PREGUNTA'}
            </button>
        </div>
    `;
    
    container.innerHTML = html;
    
    // Agregar evento al botón siguiente
    const siguienteBtn = document.getElementById('siguienteBtn');
    if (siguienteBtn) {
        siguienteBtn.addEventListener('click', siguientePregunta);
    }
}

// Función para seleccionar una opción
function seleccionarOpcion(index) {
    respuestasUsuario[preguntaActual] = index;
    
    // Actualizar la UI para mostrar la selección
    const opciones = document.querySelectorAll('.opcion');
    opciones.forEach((opcion, i) => {
        if (i === index) {
            opcion.classList.add('opcion-seleccionada');
        } else {
            opcion.classList.remove('opcion-seleccionada');
        }
    });
    
    // Habilitar el botón siguiente
    const siguienteBtn = document.getElementById('siguienteBtn');
    if (siguienteBtn) {
        siguienteBtn.disabled = false;
    }
}

// Función para ir a la siguiente pregunta
function siguientePregunta() {
    if (respuestasUsuario[preguntaActual] === undefined) {
        return;
    }
    
    if (preguntaActual < preguntas.length - 1) {
        preguntaActual++;
        mostrarPregunta();
    } else {
        calcularResultado();
    }
}

// Función para calcular el personaje más votado
function calcularResultado() {
    // Contar votos por personaje
    const votos = {};
    
    respuestasUsuario.forEach((respuestaIndex, preguntaIndex) => {
        const personaje = preguntas[preguntaIndex].opciones[respuestaIndex].personaje;
        votos[personaje] = (votos[personaje] || 0) + 1;
    });
    
    // Encontrar el personaje con más votos
    let personajeGanador = null;
    let maxVotos = 0;
    
    for (const [personaje, count] of Object.entries(votos)) {
        if (count > maxVotos) {
            maxVotos = count;
            personajeGanador = personaje;
        }
    }
    
    // Mostrar resultado
    mostrarResultado(personajeGanador);
}

// Función para mostrar el resultado final
function mostrarResultado(personaje) {
    const info = personajesInfo[personaje];
    const container = document.getElementById('preguntaContainer');
    const resultadoContainer = document.getElementById('resultadoContainer');
    const reiniciarBtn = document.getElementById('reiniciarBtn');
    
    // Ocultar preguntas y mostrar resultado
    container.style.display = 'none';
    resultadoContainer.style.display = 'block';
    reiniciarBtn.style.display = 'block';
    
    // Llenar el resultado
    resultadoContainer.innerHTML = `
        <div class="resultado-emoji">${info.emoji}</div>
        <div class="resultado-nombre">${personaje}</div>
        <div class="resultado-descripcion">${info.descripcion}</div>
        <div class="resultado-frase">"${info.frase}"</div>
        <div class="resultado-poder">${info.poder}</div>
    `;
    
    // Guardar en localStorage para compartir el resultado después
    localStorage.setItem('ultimoQuizPersonaje', personaje);
    
    // Efecto de confeti simulado (opcional, solo diversión)
    console.log(`🎉 Resultado: ${personaje} - ${info.descripcion}`);
}

// Función para reiniciar el quiz
function reiniciarQuiz() {
    respuestasUsuario = [];
    preguntaActual = 0;
    
    // Mostrar preguntas de nuevo
    const container = document.getElementById('preguntaContainer');
    const resultadoContainer = document.getElementById('resultadoContainer');
    const reiniciarBtn = document.getElementById('reiniciarBtn');
    
    container.style.display = 'block';
    resultadoContainer.style.display = 'none';
    reiniciarBtn.style.display = 'none';
    
    mostrarPregunta();
}

// Inicializar el quiz cuando carga la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarPregunta();
});