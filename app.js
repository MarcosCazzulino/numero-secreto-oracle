
//Declaración de variables Numero Secreto y contador de Intentos
let numeroSecreto;
let intentos;
let numeros_sorteados = [];

//Función para asignar/modificar texto al H1 y al parrafo
function asignarTexto(elemento, texto){
    let elemHTML = document.querySelector(elemento);
    elemHTML.innerHTML = texto;
};

//Función para comparar el numero secreto y el número del usuario
function verificarNumero(){
    // Obtenemos el valor del input y lo convertimos a number
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    // Comparación
    if(numeroDeUsuario === numeroSecreto){
        asignarTexto('p', `¡Felicidades! Encontraste el número en ${intentos} ${(intentos == 1) ? 'intento' : 'intentos'}`);
        // Removemos el atributo disabled cuando acierta el número
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(numeroDeUsuario > numeroSecreto){
        asignarTexto('p', 'El número secreto es menor');
        } else{
        asignarTexto('p', 'El número secreto es mayor');
        }

        // Incrementamos el contador en 1 y limpiamos el input cuando no acierta
        intentos++;
        limpiarCaja();
    }
    return;
};

// Función para vaciar el input
function limpiarCaja(){
    document.getElementById('valorUsuario').value = "";
}

// Función para generar el número secreto
function numeroAleatorio(){
    // Almacenamos el número random en una variable
    let numeroGenerado = Math.floor(Math.random() * 10) + 1;

    console.log(numeroGenerado);
    console.log(numeros_sorteados);
    if (numeros_sorteados.length == 5) {
        asignarTexto('p', 'Ya jugaste 5 veces. Refresca la página para reiniciar el juego');
    } else{
        // Caso recursivo, se evalúa si el array contiene al número generado
        if (numeros_sorteados.includes(numeroGenerado)){
            return numeroAleatorio();
        } else{ // Caso de corte, se agrega el número a la lista
            numeros_sorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
};

// Función para restablecer los elementos a su estado inicial.
function estadoInicial(){
    asignarTexto('h1', 'Adivina el Número Secreto');
    asignarTexto('p', 'Elige un número del 1 al 10');
    numeroSecreto = numeroAleatorio();
    intentos = 1
}

// Función para reiniciar el juego
function reiniciarJuego(){
    limpiarCaja();
    estadoInicial();
    // Agregamos el atributo disabled al botón Nuevo Juego
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
}

// Colocamos el juego en su estado inicial.
estadoInicial();