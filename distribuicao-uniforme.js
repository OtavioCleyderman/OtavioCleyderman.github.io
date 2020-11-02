function calcular() {
    let inicial = document.getElementById("inicial").value;
    let final = document.getElementById("final").value;

    let intervalo = document.getElementById("intervalo");
    let intervalo_selecionado = intervalo.options[intervalo.selectedIndex].value;
    if (intervalo_selecionado === "maior") {
        probabilidade_final = maior(inicial, final);
    } else if (intervalo_selecionado === "menor") {
        probabilidade_final = menor(inicial, final);
    } else if (intervalo_selecionado === "entre") {
        probabilidade_final = entre();
    }
    let texto_probabilidade = document.getElementById("texto_probabilidade");
    texto_probabilidade.innerHTML = `Probabilidade: ${probabilidade_final.toFixed(2)} % <br>`

    let media = calcularMedia(inicial, final);
    let texto_media = document.getElementById("texto_media");
    texto_media.innerHTML = `Media: ${media.toFixed(2)} <br>`

    let valor_variancia = variancia(inicial, final);
    let texto_variancia = document.getElementById("texto_variancia");
    texto_variancia.innerHTML = `Variancia: ${valor_variancia.toFixed(2)} <br>`

    let dp = desviopadrao(valor_variancia);
    let texto_dp = document.getElementById("texto_dp");
    texto_dp.innerHTML = `Desvio Padrão: ${dp.toFixed(2)} <br>`
}


function calcularMedia(valor_inicial, valor_final) {
    var media = (parseFloat(valor_inicial) + parseFloat(valor_final)) / 2;

    return media;
}

function desviopadrao(variancia) {
    let dp = Math.sqrt(variancia);

    return dp;
}

function variancia(valor_inicial, valor_final) {
    let valor_variancia = ((parseFloat(valor_final) - parseFloat(valor_inicial)) * (parseFloat(valor_final) - parseFloat(valor_inicial)) / 12)

    return valor_variancia;
}

function maior(valor_inicial, valor_final){
    let valor_intervalo = document.getElementById("valor_intervalo").value;
    let intervalo = (valor_final - valor_intervalo);
    let probabilidade = ((1 / (valor_final - valor_inicial)) * intervalo) * 100;

    return probabilidade;
}

function entre(valor_inicial, valor_final){
    let valor_intervalo = document.getElementById("valor_intervalo").value;
    let valor_split = valor_intervalo.split(";").map(Number);
    let intervalo = valor_split[1] - valor_split[0];
    let probabilidade = ((1 / (valor_final - valor_inicial)) * intervalo) * 100;

    return probabilidade;
}

function menor(valor_inicial, valor_final){
    let valor_intervalo = document.getElementById("valor_intervalo").value;
    let intervalo = (valor_intervalo - valor_inicial);
    let probabilidade = ((1 / (valor_final - valor_inicial)) * intervalo) * 100;
   
    return probabilidade;

}