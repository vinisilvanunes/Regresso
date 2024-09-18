const { amostras } = require('./amostras')

function calcularRegressaoLinear(amostra) {
    const n = amostra.length;
    let somaX = 0, somaY = 0, somaXY = 0, somaX2 = 0;

    // Cálculo das somas
    for (let i = 0; i < n; i++) {
        const [x, y] = amostra[i];
        somaX += x;
        somaY += y;
        somaXY += x * y;
        somaX2 += x * x;
    }

    // Cálculo dos coeficientes da reta
    const m = (n * somaXY - somaX * somaY) / (n * somaX2 - somaX * somaX);
    const b = (somaY - m * somaX) / n;

    return { m, b };
}

function calcularR2(amostra, m, b) {
    const n = amostra.length;
    
    // Calcular a média de Y
    const mediaY = amostra.reduce((sum, [, y]) => sum + y, 0) / n;

    // Calcular a Soma dos Quadrados Totais (SST)
    const SST = amostra.reduce((sum, [, y]) => sum + Math.pow(y - mediaY, 2), 0);

    // Calcular a Soma dos Quadrados dos Resíduos (SSR)
    const SSR = amostra.reduce((sum, [x, y]) => {
        const yPredito = m * x + b;
        return sum + Math.pow(y - yPredito, 2);
    }, 0);

    // Calcular R^2
    const R2 = 1 - (SSR / SST);

    return R2;
}

function calcularParaAmostras(amostras) {
    let somaR2 = 0;
    let numAmostras = amostras.length;
    amostras.forEach((amostra, index) => {
        const { m, b } = calcularRegressaoLinear(amostra);
        const R2 = calcularR2(amostra, m, b);
        somaR2 += R2;
        console.log(`Amostra ${index + 1}:`);
        console.log(`  Equação da reta: y = ${m.toFixed(4)}x + ${b.toFixed(4)}`);
        console.log(`  Valor de R²: ${R2.toFixed(4)}`);
    });

    const mediaR2 = somaR2 / numAmostras;
    console.log(`\nMédia de R²: ${mediaR2.toFixed(4)}`);
}

calcularParaAmostras(amostras)