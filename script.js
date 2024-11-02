document.addEventListener("DOMContentLoaded", () => {
    const botonJugar = document.getElementById("botonJugar");
    const seleccionDificultad = document.getElementById("seleccionDificultad");
    const tablero = document.getElementById("tablero");
    const divCombinacionUsuario = document.getElementById("combinacionUsuario");
    const divResultados = document.getElementById("divResultados");
    const vaciarBoton = document.getElementById("vaciarBoton");
    const enviarBoton = document.getElementById("enviarBoton");
    const runes = ["blue", "green", "red", "black", "gray", "yellow"];
    let CombinacionCorrecta = [];
    let combinacionUsuario = [];
    let dificultad;

    // Event listener para iniciar el juego y elegir dificultad
    botonJugar.addEventListener("click", () => {
        botonJugar.style.display = "none";
        seleccionDificultad.style.display = "block";
    });

    // Función para generar combinación correcta
    const getCombinacionAlAzar = (length) => {
        const combinacion = [];
        for (let i = 0; i < length; i++) {
            combinacion.push(runes[Math.floor(Math.random() * runes.length)]);
        }
        console.log(combinacion)
        return combinacion;
    };

    // Al seleccionar dificultad
    seleccionDificultad.addEventListener("click", (event) => {
        if (event.target.classList.contains("dificultad")) {
            dificultad = event.target.dataset.level;
            const combinacionLength = { Facil: 3, Moderada: 4, Dificil: 5, Dios: 6 }[dificultad];
            CombinacionCorrecta = getCombinacionAlAzar(combinacionLength);
            seleccionDificultad.style.display = "none";
            tablero.style.display = "block";
        }
    });

    // Al hacer clic en una runa
    document.querySelectorAll(".rune").forEach((rune) => {
        rune.addEventListener("click", () => {
            const color = rune.dataset.color;
            console.log(color)
            combinacionUsuario.push(color);
            updateDivCombinacionUsuario();
        });
    });

    const updateDivCombinacionUsuario = () => {
        divCombinacionUsuario.innerHTML = "";
        combinacionUsuario.forEach(color => {
            const colorDiv = document.createElement("div");
            colorDiv.style.backgroundColor = color; // Establece el color de fondo
            colorDiv.classList.add("rune");         // Usa la clase "rune" para aplicar el estilo de círculo
            colorDiv.style.width = "30px";          // Ajusta el tamaño para que se vea bien en el display
            colorDiv.style.height = "30px";
            divCombinacionUsuario.appendChild(colorDiv);
        });
    };


    // Limpiar combinación del usuario
    vaciarBoton.addEventListener("click", () => {
        combinacionUsuario = [];
        updateDivCombinacionUsuario();
    });

    // Evaluar combinación
    enviarBoton.addEventListener("click", () => {
        let correctPosition = 0;
        let colorCorrectoPosicionIncorrecta = 0;
        const copyVariableCombinacionCorrecta = [...CombinacionCorrecta];
        const copyVariableCombinacionUsuario = [...combinacionUsuario];

        // Crear un circulo para construir el html e imprimir en el div3
        // Crear círculo para la posición correcta
        const circulos = [];

        copyVariableCombinacionUsuario.forEach(a => {
            console.log('asss: ' + a);
            const combinacionUsuario = document.createElement("div");
            combinacionUsuario.classList.add("result-circle");
            combinacionUsuario.style.width = "30px";
            combinacionUsuario.style.marginBottom = "2px";
            combinacionUsuario.style.backgroundColor = a;
            combinacionUsuario.style.height = "30px";
            combinacionUsuario.style.border = "1px solid white";
            combinacionUsuario.style.borderRadius = "50%";

            circulos.push(combinacionUsuario);

        });

        console.log(copyVariableCombinacionUsuario)
        // Primero contar las coincidencias en posición y color exactos
        for (let i = 0; i < copyVariableCombinacionCorrecta.length; i++) {
            if (copyVariableCombinacionUsuario[i] === copyVariableCombinacionCorrecta[i]) {
                correctPosition++;
                copyVariableCombinacionCorrecta[i] = copyVariableCombinacionUsuario[i] = null; // Marcar como usado
            }
        }

        // Luego contar los colores correctos en posiciones incorrectas
        for (let i = 0; i < copyVariableCombinacionCorrecta.length; i++) {
            if (copyVariableCombinacionUsuario[i] && copyVariableCombinacionCorrecta.includes(copyVariableCombinacionUsuario[i])) {
                colorCorrectoPosicionIncorrecta++;
                copyVariableCombinacionCorrecta[copyVariableCombinacionCorrecta.indexOf(copyVariableCombinacionUsuario[i])] = null; // Marcar como usado
            }
        }

        // Mostrar resultados en el log
        const divBase = document.createElement("div");

        // Crear círculo para la posición correcta
        const circuloPosCorrecta = document.createElement("div");
        circuloPosCorrecta.classList.add("result-circle", "green-circle");
        circuloPosCorrecta.style.width = "20px"; // Ajusta el tamaño del círculo
        circuloPosCorrecta.style.marginBottom = "2px";
        circuloPosCorrecta.style.height = "20px"; // Ajusta el tamaño del círculo
        circuloPosCorrecta.style.borderRadius = "50%"; // Hace que el div sea un círculo
        circuloPosCorrecta.innerText = correctPosition; // Este texto puede ser opcional

        // Crear círculo para el color correcto en posición incorrecta
        const circuloColorCorrectoPosIncorrecta = document.createElement("div");
        circuloColorCorrectoPosIncorrecta.classList.add("result-circle", "yellow-circle");
        circuloColorCorrectoPosIncorrecta.style.width = "20px"; // Ajusta el tamaño del círculo
        circuloColorCorrectoPosIncorrecta.style.marginBottom = "2px";
        circuloColorCorrectoPosIncorrecta.style.height = "20px"; // Ajusta el tamaño del círculo
        circuloColorCorrectoPosIncorrecta.style.borderRadius = "50%"; // Hace que el div sea un círculo
        circuloColorCorrectoPosIncorrecta.innerText = colorCorrectoPosicionIncorrecta; // Este texto puede ser opcional

        // Agregar círculos y combinación al div base
        // Suponiendo que circulos es un array de elementos div
        divBase.append(circuloPosCorrecta, circuloColorCorrectoPosIncorrecta); // Primero agrega los círculos individuales

        // Agregar cada círculo en el array circulos a divBase
        circulos.forEach(circulo => {
            divBase.appendChild(circulo);
        });

        // Finalmente, agrega divBase a divResultados
        divResultados.appendChild(divBase);

        // Limpiar combinación del usuario para el próximo intento
        combinacionUsuario = [];
        updateDivCombinacionUsuario();
    });
});