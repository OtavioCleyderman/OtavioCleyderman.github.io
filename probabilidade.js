function DistribuicaoBinomial() {

    let n = document.getElementById("amostra").value;
    let p = document.getElementById("sucesso").value;
    let q = document.getElementById("fracasso").value;
    let k = document.getElementById("evento").value;

    let evento = k.split(";").map(Number);

    // console.log(evento);

    let media = n * p;
    let texto_media = document.getElementById("texto_media");
    // console.log(media)
    texto_media.innerHTML = `Media: ${media} <br>`;

    let desvio_padrao = Math.sqrt(n * p * q)
    let texto_desvio_padrao = document.getElementById("texto_desvio_padrao");
    // console.log(dp)

    let coeficiente_variancia = (desvio_padrao / media) * 100;
    texto_coeficiente_variancia.innerHTML = `Coeficiente Variância: ${coeficiente_variancia.toFixed(2)} % <br>`;

    let probabilidade_total = 0;
    evento.forEach((e) => {
        let fatorial_numerador = (fatorial(e)) * (fatorial(n - e));
        let analisecombinatoria = (fatorial(n) / fatorial_numerador);

        let calculo = (analisecombinatoria * (Math.pow(p, e)) * (Math.pow(q, (n - e)))) * 100;
        // console.log(`calculo ${calculo}`);
        probabilidade_total += calculo;
        // console.log(`calculo_total ${calculototal}`);
    });

    let texto_probabilidade = document.getElementById("texto_probabilidade");
    texto_probabilidade.innerHTML = `Probabilidade: ${probabilidade_total.toFixed(2)} % <br>`
}

function fatorial(n) {
    if ( n < 2) {
        return 1;
    }
    return n *  fatorial(n-1);
}