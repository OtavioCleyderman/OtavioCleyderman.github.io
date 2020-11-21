//Trabalho de Estatistica/Prof Me Maria Luisa - Grupo 09/Segundo semestre de 2020//
// Correlação e Regressão - implementação até o dia 16/11/2020 //
//  Para gerar os gráficos do trabalho integrado, foi utilizado o chart.js                                  //
//  O Chart.js é uma biblioteca muito utilizada pela comunidade, excelente e muito fácil de utilizar       //
//  Mesmo se você não tiver conhecimentos avançados de Javascript você vai conseguir criar gráficos bons, bonitos e responsivos       //

function dadosX() {
    let valor_x = document.getElementById("valor_x").value;
    x_split = valor_x.split(";").map(Number);

    return x_split;
}
//      Recebe os dados          //
function dadosY () {
    let valor_y = document.getElementById("valor_y").value;
    y_split = valor_y.split(";").map(Number);

    return y_split;
}
//      Função para fazer a soma de X  //
function somatorioX() {
    const valor_x = dadosX();
    let total_x = valor_x.reduce(
        (acumulador, item) => acumulador + item,
        0
      );
    
    return total_x;
}
//      Função para fazer a soma de Y  //
function somatorioY() {
    const valor_y = dadosY()
    let total_y = valor_y.reduce(
        (acumulador, item) => acumulador + item,
        0
      );

    return total_y;
}
//      Função para fazer a soma de X²  //
function somatorioXisQuadrado(){
    const valor_x = dadosX();
    const quadrado_elemento = valor_x.map((elemento) => elemento ** 2);

    let total_quadrado = quadrado_elemento.reduce(
        (acumulador, item) => acumulador + item,
        0
      );

    return total_quadrado;

}
//      Função para fazer a soma de Y²  //
function somatorioYQuadrado() {
    let valor_y = dadosY();
    const quadrado_elemento = valor_y.map((elemento) => elemento ** 2); // arrow function //
    let total_quadrado = quadrado_elemento.reduce(
        (acumulador, item) => acumulador + item,
        0
      );
    
    return total_quadrado;
}
//      Realizar a multiplicação de X por Y  //
function xisVezesY() {
    const valor_x = dadosX();
    const valor_y = dadosY();
    let total_multiplicado = 0;
    const n = x_split.length
    for (var i=0; i < x_split.length; i++){
        total_multiplicado += valor_x[i] * valor_y[i];   
    }

    return total_multiplicado;
}
//      Faz o cálculo da regressão  //
function calcularRegressao() {
    //y = ax + b, achar o (a), achar o (b)
    const n_x_split = dadosX().length;
    const valor_x = somatorioX();
    const valor_y = somatorioY();
    const xis_quadrado = somatorioXisQuadrado();
    const y_quadrado = somatorioYQuadrado();
    const x_y = xisVezesY();

    let a_cima = (n_x_split * x_y) - (valor_x * valor_y);
    //      1º Multiplica a quantidade de dados de X por X*Y  //
    //      2º multiplica o somatório de X e Y               //
    //      3º subitrai os dois resultados obtidos          //

    let a_baixo = (n_x_split * xis_quadrado) - (valor_x * valor_x);
    //      1º Multiplica a quantidade de dados de X por X² //
    //      2º multiplica o somatório de X por X           //
    //      3ºsubitrai os dois resultados obtidos         //
    let a = a_cima / a_baixo;
    let y_b = valor_y / n_x_split;
    let x_b = valor_x / n_x_split;
    let b = y_b - (a * x_b);
    //      Mostra os resultados da Regressão  //
    console.log(a.toFixed(2));
    console.log(b.toFixed(2));
    let texto_resultado = `Regressão: Y = ${a.toFixed(2)} * X + ${b.toFixed(2)} <br>`
    //      Seleciona arquvivos do HTML que serão mostrados  //
    let escolhaxy = document.getElementById("selectprojecao");
    let valorxy = document.getElementById("valorprojecao");
    let botaoproj = document.getElementById("botãoprojecao");
    let resultado = document.getElementById("resultadoprojecao");
    escolhaxy.style.display = "block";
    valorxy.style.display = "block";
    botaoproj.style.display = "block";
    //      Chama uma função para realizar o calculo e passa seus devidos parâmetros e mostra o resultado  //
    if(valorxy.value != ""){
        resultado.innerHTML = Math.round(calcularProjecao(escolhaxy.value,valorxy.value,a,b))
    }
    return texto_resultado;
}
//      Função para realizar o calculo da projeção  //
function calcularProjecao(exy,vxy,valora,valorb){
    let result = 0
    if(exy === "X"){
        result = (valora * vxy) + valorb
        return result
    }else{
        result = (vxy - valorb) / valora
        return result
    }
}
//  Função para realizar o calculo da Correlação  //
function calcularCorrelacao() {
    const n_x_split = dadosX().length;
    const valor_x = somatorioX();
    const valor_y = somatorioY();
    const xis_quadrado = somatorioXisQuadrado();
    const y_quadrado = somatorioYQuadrado();
    const x_y = xisVezesY();
    let texto_regressao = calcularRegressao();

    let r_cima = (n_x_split * x_y) - (valor_x * valor_y);
    let r_baixo = Math.sqrt((n_x_split * xis_quadrado) - (valor_x*valor_x)) * Math.sqrt((n_x_split * y_quadrado) - (valor_y*valor_y));
    let r = r_cima / r_baixo;
    //  Mostra os resultados obtidos  //
    let texto_html = document.getElementById("texto_regressao");
    texto_html.innerHTML = texto_regressao;

    let texto_correlacao = document.getElementById("texto_correlacao");
    texto_correlacao.innerHTML = `Correlacao: ${Math.round((r * 100))} % <br> Projeção Futura:`;

}

function getRandomColor() {
    var letters = "0123456789ABCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function drawChart() {
    let valor_x = dadosX();
    let valor_y = dadosY();

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Y');
    valor_x.forEach((x, idx) => {
        data.addRows([
            [x, valor_y[idx]],
        ]);
    });

    var options = {
        title: 'Correlação',
        hAxis: {title: 'X', minValue: Math.min(valor_x), maxValue: Math.max(valor_x)},
        vAxis: {title: 'Y', minValue: Math.min(valor_y), maxValue: Math.max(valor_y)},
        legend: 'none',
        trendlines: { 0: {} }
    };

    var chart = new google.visualization.ScatterChart(document.getElementById('myChart'));

    chart.draw(data, options);
}
