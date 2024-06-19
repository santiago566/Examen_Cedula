const express = require('express');
const app = express();
const port = 3000;

// Ruta para separar los dígitos en posiciones pares e impares
app.get('/Cedula/:numero', (req, res) => {
    const { numero } = req.params;

    const pares = [];
    const impares = [];
    let resultado;

    for (let i = 0; i < numero.length; i++) {
        if (i % 2 === 0) {
            pares.push(parseInt(numero[i]));
        } else {
            impares.push(parseInt(numero[i]));
        }
    }

    // pop sirve para eliminar el ultimo valor de un array y lo obtine cuando lo llaman
    resultado = impares.pop();

    // Multiplicar por dos y restar 9 si es mayor a 9
    for (let i = 0; i < pares.length; i++) {
        pares[i] *= 2;
        if (pares[i] > 9) {
            pares[i] -= 9;
        }
    }

    // Los números impares restantes
    const rimpares = impares.reduce((a, b) => a + b, 0);
    const rpares = pares.reduce((a, b) => a + b, 0);
    const R=rimpares+rpares;
    const residuo = R % 10;
    const Validar = 10-residuo;
    const mensaje = (Validar === resultado) ? 'correcto' : 'incorrecto';
    ;

    res.json({
        rpares,
        rimpares,
        R,
        resultado,
        Validar,
        mensaje
    });
});

// Falta el paréntesis de cierre para app.listen
app.listen(port, () => {
    console.log(`Servidor corriendo `);
});
