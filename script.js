function rungeKutta() {
    // Obtener los valores de los campos de entrada
    let y0 = parseFloat(document.getElementById("y0").value);
    let x0 = parseFloat(document.getElementById("x0").value);
    let h = parseFloat(document.getElementById("h").value);
    let n = parseInt(document.getElementById("n").value);
    let ecuacion = document.getElementById("ecuacion").value;

    if (isNaN(y0) || isNaN(x0) || isNaN(h) || isNaN(n) || !ecuacion.trim()) {
        alert("Por favor, ingresa valores válidos.");
        return;
    }

    // Crear la función a partir de la ecuación ingresada
    function f(x, y) {
        // Obtener la ecuación desde el formulario
        let ecuacion = document.getElementById("ecuacion").value;
    
        try {
            // Crear una expresión con math.js
            const expr = math.parse(ecuacion);
    
            // Compilar la expresión para evaluarla con valores de x y y
            const compiledExpr = expr.compile();
    
            // Evaluar la expresión con los valores de x y y
            return compiledExpr.evaluate({ x: x, y: y });
        } catch (error) {
            alert("Error en la ecuación. Por favor revisa la sintaxis.");
            throw error; // Detener ejecución en caso de error
        }
    }

    // Método de Runge-Kutta
    let results = [];
    let x = x0;
    let y = y0;

    // Iterar y calcular los valores
    for (let i = 0; i < n; i++) {
        let k1 = h*f(x, y);
        let k2 = h * f(x + (h / 2), y +(k1 / 2));
        let k3 = h * f(x + (h / 2), y + (k2 / 2));
        let k4 = h * f(x + h, y + k3);
        y1 = y + (k1 + (2 * k2) + (2 * k3) + k4) / 6;

        let k1Visual = f(x, y);
        let k2Visual = f(x + (h / 2), y +(k1Visual *(h/ 2)));
        let k3Visual = f(x + (h / 2), y + (k2Visual *(h/ 2)));
        let k4Visual = f(x + h, (y + k3Visual*h));

        y = y + (k1Visual + (2 * k2Visual) + (2 * k3Visual) + k4Visual) / 6; 
        x = x + h;

        // Guardar el resultado de cada iteración
        results.push({
            iteration: i+1, 
            x: x.toFixed(2),
            y1: y1.toFixed(4), 
            k1Visual: k1Visual.toFixed(4),
            k2Visual: k2Visual.toFixed(4),
            k3Visual: k3Visual.toFixed(4),
            k4Visual: k4Visual.toFixed(4)
            });
    }

    // Mostrar los resultados en un elemento HTML
    let resultContainer = document.getElementById("resultado");
    // Mostrar los resultados en la tabla
    let resultBody = document.getElementById("resultBody");
    resultBody.innerHTML = ""; // Limpiar los resultados previos
6
    results.forEach(result => {
        resultBody.innerHTML += `
            <tr>
                <td>${result.iteration}</td>
                <td>${result.x}</td>
                <td>${result.y}</td>
                <td>${result.k1Visual}</td>
                <td>${result.k2Visual}</td>
                <td>${result.k3Visual}</td>
                <td>${result.k4Visual}</td>
            </tr>`;
    });
}

// Asignar la función al botón de calcular
document.querySelector("button").addEventListener("click", function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe
    rungeKutta();
});
