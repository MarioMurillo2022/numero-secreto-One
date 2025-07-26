let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
    let titulo = document.querySelector(elemento);
    titulo.innerHTML = (texto);
};

function verificarIntento() {
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);
    // console.log(intentos);

    if (numeroUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el número secreto en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        // Mostrar confeti 🎉
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 }
        });

    } else {
        if (numeroUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'el número secreto es menor');
        } else {
            asignarTextoElemento('p', 'el número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
};

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
};

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    // console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles. Reiniciando...');
        document.querySelector('#intentar').setAttribute('disabled', 'true');
        // Recargar después de 3 segundos
        setTimeout(() => {
            location.reload();
        }, 3000);
    } else {
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
};

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

function reiniciarJuego() {
    //LimpiarCaja
    limpiarCaja();
    //Indicar mensajes en intervalos de numeros
    //Generar el número aleatorio
    //Inicializar el número de intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
}

condicionesIniciales();
