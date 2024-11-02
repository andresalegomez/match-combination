document.addEventListener("DOMContentLoaded", () => {
    const botonJugar = document.getElementById("botonJugar");
    const seleccionDificultad = document.getElementById("seleccionDificultad");
    const tablero = document.getElementById("tablero");
    const divCombinacionUsuario = document.getElementById("combinacionUsuario");
    const divResultados = document.getElementById("divResultados");
    const vaciarBoton = document.getElementById("vaciarBoton");
    const enviarBoton = document.getElementById("enviarBoton");
    const runes = ["blue", "green", "red", "black", "white", "yellow"];
    let CombinacionCorrecta = [];
    let combinacionUsuario = [];
    let dificultad;

    // Event listener para iniciar el juego y elegir dificultad
    botonJugar.addEventListener("click", () => {
        botonJugar.style.display = "none";
        seleccionDificultad.style.display = "block";
    });

    // Función para generar combinación correcta sin runas repetidas
    const getCombinacionAlAzar = (length) => {
        const combinacion = [];
        while (combinacion.length < length) {
            const rune = runes[Math.floor(Math.random() * runes.length)];
            if (!combinacion.includes(rune)) {
                combinacion.push(rune);
            }
        }
        console.log(combinacion);
        return combinacion;
    };


    // Al seleccionar dificultad
    seleccionDificultad.addEventListener("click", (event) => {
        dificultad = event.target.dataset.level;
        const combinacionLength = { Facil: 3, Moderada: 4, Dificil: 5, Maxima: 6 }[dificultad];
        CombinacionCorrecta = getCombinacionAlAzar(combinacionLength);
        seleccionDificultad.style.display = "none";
        tablero.style.display = "block";

        let plantilla = [];

        for (let i = 0; i < combinacionLength; i++) {

            let divbase = document.createElement("div");
            divbase.classList.add("result-circle");
            divbase.style.width = "30px";
            divbase.style.marginBottom = "2px";
            divbase.style.backgroundColor = 'gray';
            divbase.style.height = "30px";
            divbase.style.border = "1px solid white";
            divbase.style.borderRadius = "50%";

            plantilla.push(divbase);

        }

        plantilla.forEach(p => {
            divCombinacionUsuario.append(p);
        });

        // copyVariableCombinacionUsuario.forEach(a => {


        // });
    });

    document.querySelectorAll(".rune").forEach((rune) => {
        rune.addEventListener("click", () => {
            const color = rune.dataset.color;
            console.log(color);

            // Verifica si la runa no está repetida en combinacionUsuario
                combinacionUsuario.push(color);
                updateDivCombinacionUsuario();

                // Verifica si el tamaño ha alcanzado el límite de dificultad
                if (combinacionUsuario.length === CombinacionCorrecta.length) {
                    enviarBoton.click(); 
                }
        });
    });


    const updateDivCombinacionUsuario = () => {
        divCombinacionUsuario.innerHTML = "";
        combinacionUsuario.forEach(color => {
            const colorDiv = document.createElement("div");
            colorDiv.style.backgroundColor = color;
            colorDiv.classList.add("rune");
            colorDiv.style.width = "30px";
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