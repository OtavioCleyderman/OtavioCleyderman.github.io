//Trabalho de Estatistica/Prof Me Maria Luisa - Grupo 09/Segundo semestre de 2020//
// Implementação dos botões de inserção até o dia 07/09/2020 //
// Implementação das tabelas(fr%,fac,fac%) até o dia 14/09/2020 //
// Implementação medidas separatrizes até o dia 28/09/2020 //
// Implementação média,moda e mediana até o dia 29/09/2020 //
// Implementação desvio padrão e coeficiente de variação até o dia 05/10/2020 //
//Trabalho-02 Estrutura de Dados/Prof Me Fausto Cintra-Grupo 09/Segundo semestre de 2020//
//Trabalho-02 Estrutura de Dados/Inserir Algoritimo de Ordenação quickSort até 18/11/20(6,0 pontos)//
function inserirDados() {
  let nome_ordem = document.getElementById('nome_ordem');
  let ordem = document.getElementById('ordem_valores');
  let up_input = document.getElementById('arquivo');
  let up_botao = document.getElementById('btn-upload-csv');
  let nome = document.getElementById('nome_variavel');
  let dados = document.getElementById('dados_variavel');
  let botao = document.getElementById('calcular');
  let tipo_tabela = document.getElementById('tipo_tabela').value;
  limparResultados();
  mostrarSelectSeparatrizes();

  if (tipo_tabela === 'nominal') {
    nome_ordem.style.display = 'none';
    ordem.style.display = 'none';
  }
  if (tipo_tabela === 'ordinal') {
    nome_ordem.style.display = 'block';
    ordem.style.display = 'block';
  }
  if (tipo_tabela === 'discreta') {
    nome_ordem.style.display = 'none';
    ordem.style.display = 'none';
  }
  if (tipo_tabela === 'continua') {
    nome_ordem.style.display = 'none';
    ordem.style.display = 'none';
  } 
}

function mostrarSelectSeparatrizes(mostrar = true) {
  let tipo_separatriz = document.getElementById('tipo_separatriz');
  tipo_separatriz.style.display = mostrar ? 'block' : 'none';
}

// Após selecionar o tipo de separatriz mostrar as opções de cálculo //
function mostrarOpcaoSeparatriz() {
  let valor_separatriz = document.getElementById('valor_separatriz');
  let tipo_separatriz = document.getElementById('tipo_separatriz').value;
  valor_separatriz.style.display = 'block';

  if (tipo_separatriz === 'quartil') {
    valor_separatriz.placeholder = 'Digite um valor entre 1 e 4';
  } else if (tipo_separatriz === 'quintil') {
    valor_separatriz.placeholder = 'Digite um valor entre 1 e 5';
  } else if (tipo_separatriz === 'decil') {
    valor_separatriz.placeholder = 'Digite um valor entre 1 e 10';
  } else if (tipo_separatriz === 'percentil') {
    valor_separatriz.placeholder = 'Digite um valor entre 1 e 100';
  } else if (tipo_separatriz === '') {
    valor_separatriz.style.display = 'none';
  }
}

function calcular() {
  if (document.getElementById('tipo_tabela').value === 'nominal') {
    criarTabelaNom();
  }
  if (document.getElementById('tipo_tabela').value === 'ordinal') {
    criarTabelaOrd();
  }
  if (document.getElementById('tipo_tabela').value === 'discreta') {
    criarTabelaDiscreta();
  }
  if (document.getElementById('tipo_tabela').value === 'continua') {
    criarTabelaContinua();
  }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  //  console.log(color);
  return color;
}

function tratamentoDeDados() {
  //Recebendo dados do input //
  let dadosVar = document.getElementById('dados_variavel').value;
  //dividindo os dados //
  // let array_variavel = variavel;
  let array_dados_variavel = dadosVar.split(';').map(Number);
  //alfabeticamente
  array_dados_variavel = Ordem(array_dados_variavel);
  //calcular quantidade de cada item
  const quantidade_dados = array_dados_variavel.reduce((acumulador, atual) => {
    acumulador[atual] = acumulador[atual] ? acumulador[atual] + 1 : 1;
    return acumulador;
  }, {});

  // Array vazia que irá conter {nome: 'nome_digitado', valor: valor_digitado}
  let array_valores = [];
  // contador auxiliar
  // percorrer todos os nomes digitados e adicionar na array "final" que será ordenada alfabeticamente
  let valor_anterior;
  array_dados_variavel.forEach((dados_variavel) => {
    if (dados_variavel != valor_anterior) {
      array_valores.push({
        valor: dados_variavel,
        qtde: quantidade_dados[dados_variavel],
      });
    }
    valor_anterior = dados_variavel;
  });

  let total_dados = [];
  array_valores.forEach((t) => {
    total_dados.push(parseFloat(t.qtde));
  });

  // Somatório total
  let resultado = total_dados.reduce(
    (acumulador, item) => acumulador + item,
    0
  );

  //calculo FA
  //cont aux q
  let k = 0;
  let l = 0;
  // o primeiro valor
  // enquanto percorre, soma quantidade
  array_valores.forEach((element) => {
    element.fi = element.qtde;
    element.fr_porcento = (element.qtde * 100) / resultado;
    //Caso base, caso seja primeira vez no laco o FA eh o valor do item mesmo
    if (k == 0) {
      element.fa = parseFloat(element.qtde);
      //caso seja um item depois do primeiro, soma o valor do FA do anterior com o atual
    } else if (k > 0) {
      //fa anterior q-1                        //valor do item atual
      element.fa =
        parseFloat(array_valores[k - 1].fa) + parseFloat(element.qtde);
    }
    k++;
    if (l == 0) {
      element.fa_porcento = parseFloat(element.fr_porcento);
    } else if (l > 0) {
      element.fa_porcento =
        parseFloat(array_valores[l - 1].fa_porcento) +
        parseFloat(element.fr_porcento);
    }
    l++;
  });

  return array_valores;
}

function tratamentoDeDadosNominal() {
  //recebendo dados do input
  let dadosVar = document.getElementById('dados_variavel').value;
  //dividindo os dados
  // let array_variavel = variavel;
  let array_dados_variavel = dadosVar.split(';');
  //alfabeticamente
  array_dados_variavel = Ordem(array_dados_variavel);
  //calcular quantidade de cada item
  const quantidade_dados = array_dados_variavel.reduce((acumulador, atual) => {
    acumulador[atual] = acumulador[atual] ? acumulador[atual] + 1 : 1;
    return acumulador;
  }, {});

  // Array vazia que irá conter {nome: 'nome_digitado', valor: valor_digitado}
  let array_valores = [];
  // contador auxiliar
  // percorrer todos os nomes digitados e adicionar na array "final" que será ordenada alfabeticamente //
  let valor_anterior;
  array_dados_variavel.forEach((dados_variavel) => {
    if (dados_variavel != valor_anterior) {
      array_valores.push({
        valor: dados_variavel,
        qtde: quantidade_dados[dados_variavel],
      });
    }
    valor_anterior = dados_variavel;
  });

  let total_dados = [];
  array_valores.forEach((t) => {
    total_dados.push(parseFloat(t.qtde));
  });

  // Somatório total
  let resultado = total_dados.reduce(
    (acumulador, item) => acumulador + item,
    0
  );

  //calculo FA
  //cont aux q
  let k = 0;
  let l = 0;
  // o primeiro valor
  // enquanto percorre, soma quantidade
  array_valores.forEach((element) => {
    element.fi = element.qtde;
    element.fr_porcento = (element.qtde * 100) / resultado;
    //Caso base, caso seja primeira vez no laco o FA eh o valor do item mesmo
    if (k == 0) {
      element.fa = parseFloat(element.qtde);
      //caso seja um item depois do primeiro, soma o valor do FA do anterior com o atual
    } else if (k > 0) {
      //fa anterior q-1                        //valor do item atual
      element.fa =
        parseFloat(array_valores[k - 1].fa) + parseFloat(element.qtde);
    }
    k++;
    if (l == 0) {
      element.fa_porcento = parseFloat(element.fr_porcento);
    } else if (l > 0) {
      element.fa_porcento =
        parseFloat(array_valores[l - 1].fa_porcento) +
        parseFloat(element.fr_porcento);
    }
    l++;
  });

  return array_valores;
}

//criando tabela discreta
function criarTabelaDiscreta() {
  limparResultados();
  let div_tabela_discreta = document.getElementById(
    'div_tabela_discreta_nominal_ordinal'
  );
  div_tabela_discreta.style.display = 'block';

  const tipo_desvio = document.getElementById('tipo_desvio').value;
  let corpo = document.querySelector('tbody');
  //limpar tela
  corpo.innerHTML = '';
  let array_valores = tratamentoDeDados();
  let media_discreta = media(array_valores);
  let valor_moda = moda();
  let valor_mediana = mediana();
  let desvio_padrao;
  if (tipo_desvio == 'populacao') {
    desvio_padrao = desvioPadraoPopulacao(array_valores, media_discreta);
  } else if (tipo_desvio == 'amostra') {
    desvio_padrao = desvioPadraoAmostra(array_valores, media_discreta);
  }
  coeficiente_variacao = coeficienteVariacaoDiscreta(
    desvio_padrao,
    media_discreta
  );
  //mostrar nome tabela
  let nome_tabela = document.getElementById('nome_tabela');

  nome_tabela.innerHTML = 'Quantitativa Discreta';
  //motrar mediana
  texto_mediana.innerHTML = `Mediana: ${valor_mediana} <br>`;
  //motrar media
  texto_media.innerHTML = `Media: ${media_discreta.toFixed(2)} <br>`;
  //mostrar moda
  let texto_moda = document.getElementById('texto_moda');
  texto_moda.innerHTML = `Moda: ${valor_moda.toFixed(2)} <b>`;
  //motrar desvio padrao
  let texto_desvio_padrao = document.getElementById('texto_desvio_padrao');
  texto_desvio_padrao.innerHTML = `Desvio Padrão ${desvio_padrao} <b>`;
  //mostrar coeficiente de varancia
  let texto_coeficiente = document.getElementById('texto_coeficiente_variacao');
  texto_coeficiente.innerHTML = `Coeficiente de Variacao ${coeficiente_variacao.toFixed(
    2
  )} <b>`;
  // O que tem aqui é q esse loop cria uma linha <tr>, com algumas colunas (células) <td>
  // que depois dá pra usar aqui abaixo
  // let soma_total = array_valores.reduce((soma_total, array_valores) => soma_total + array_valores, 0);
  //   console.log(soma_total);
  array_valores.forEach((e) => {
    let linha = document.createElement('tr');
    let campoDados = document.createElement('tr');
    let campo_fr_porcento = document.createElement('td');
    let campo_fa = document.createElement('td');
    let campo_fa_porcento = document.createElement('td');
    let campoVariavel = document.createElement('td');
    let texto_fa = document.createTextNode(e.fa);
    let texto_fr_porcento = document.createTextNode(Math.floor(e.fr_porcento));
    let texto_fa_porcento = document.createTextNode(Math.floor(e.fa_porcento));
    let textoVariavel = document.createTextNode(e.valor);
    let texto_fi = document.createTextNode(e.fi);
    campoDados.appendChild(texto_fi);
    campoVariavel.appendChild(textoVariavel);
    campo_fr_porcento.appendChild(texto_fr_porcento);
    campo_fa.appendChild(texto_fa);
    campo_fa_porcento.appendChild(texto_fa_porcento);
    linha.appendChild(campoVariavel);
    linha.appendChild(campoDados);
    linha.appendChild(campo_fr_porcento);
    linha.appendChild(campo_fa);
    linha.appendChild(campo_fa_porcento);
    corpo.appendChild(linha);
  });
  gerarGraficoDiscreta();
}

// Função geradora do gráfico //
function gerarGraficoDiscreta() {
  array_valores = tratamentoDeDados();
  array_label = [];
  array_data = [];
  colors = [];

  // Pode se gerar as cores tambem por aqui //
  array_valores.forEach((e) => {
    array_label.push(e.valor);
    array_data.push(Math.round(e.fr_porcento));
    colors.push(getRandomColor());
  });
  let dadosVar = document.getElementById('dados_variavel').value;
  let nome = document.getElementById('nome_variavel').value;
  let array_dados_variavel = dadosVar.split(';').map(Number);
  array_dados_variavel = Ordem(array_dados_variavel);
  let ctx = document.getElementById('myChart');
  let grafico = new Chart(ctx, {
    // Tipo grafico //
    type: 'bar',
    // Data para o grafico //
    data: {
      labels: array_label,
      datasets: [
        {
          label: nome,
          backgroundColor: colors,
          borderColor: 'rgba(0, 0, 0, 0.1)',
          data: array_data,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

function media(valores) {
  // Cálculo de média para variável discreta/continua
  let total_qtde = valores.reduce(
    (acumulador, item) => acumulador + item.qtde,
    0
  );
  let total_valores = valores.reduce(
    (acumulador, item) => acumulador + item.valor * item.qtde,
    0
  );
  let media = total_valores / total_qtde;

  return media;
}

//calculando moda
function moda() {
  let dadosVar = document.getElementById('dados_variavel').value;
  let array_dados_variavel = dadosVar.split(';').map(Number);
  array_dados_variavel = Ordem(array_dados_variavel);
  let entrada = array_dados_variavel;
  let maior = null;
  let ocorrenciasMaior = -1;
  let contagem = 1;
  for (let i = 1; i <= entrada.length; i++) {
    if (i < entrada.length && entrada[i] == entrada[i - contagem]) contagem++;
    else if (contagem > ocorrenciasMaior) {
      maior = entrada[i - 1];
      ocorrenciasMaior = contagem;
    }
  }

  return maior;
}
function mediana() {
  let dadosVar = document.getElementById('dados_variavel').value;
  let array_dados_variavel = dadosVar.split(';').map(Number);
  array_dados_variavel = Ordem(array_dados_variavel);
  let md = array_dados_variavel;
  let valor_mediana = '';
  var posicao = md.length / 2;
  let qtde = md.length;
  let pos_elemento = '';
  //console.log(posicao);
  if (qtde % 2 == 0) {
    if (md[posicao - 1] == md[posicao]) {
      //Se for igual ele já declara que aquela é a mediana
      valor_mediana = md[posicao];
      return valor_mediana;
    } else {
      //Se não for aqui ele mostra o calculo da mediana
      valor_mediana = (md[posicao] + md[posicao - 1]) / 2;
      return valor_mediana;
    }
  } else {
    //Se a posição for impar , ele da o numero da posição direto arredondando a posição com a função pronta math.round, mostrando a posicao do elemento
    pos_elemento = Math.ceil(posicao) - 1;
    //pegar a posicao do elemento e mostrar o valor do elemento
    return md[pos_elemento];
  }
}
function desvioPadraoAmostra(valores, media) {
  // somatorio fi
  let somatorio_fi = valores.reduce(
    (acumulador, item) => acumulador + item.qtde,
    0
  );

  let somatorio_valores = valores.reduce(
    (acumulador, item) =>
      acumulador + Math.pow(item.valor - media, 2) * item.qtde,
    0
  );

  let desvio_padrao = Math.sqrt(somatorio_valores / (somatorio_fi - 1)).toFixed(
    2
  );

  return desvio_padrao;
}

function desvioPadraoPopulacao(valores, media) {
  // somatorio fi
  let somatorio_fi = valores.reduce(
    (acumulador, item) => acumulador + item.qtde,
    0
  );

  let somatorio_valores = valores.reduce(
    (acumulador, item) =>
      acumulador + Math.pow(item.valor - media, 2) * item.qtde,
    0
  );

  let desvio_padrao = Math.sqrt(somatorio_valores / somatorio_fi).toFixed(2);

  return desvio_padrao;
}

function coeficienteVariacaoDiscreta(desvio_padrao, media) {
  let cv = Math.round((desvio_padrao / media) * 100);

  return cv;
}

function criarTabelaNom() {
  limparResultados();
  let div_tabela_discreta = document.getElementById(
    'div_tabela_discreta_nominal_ordinal'
  );
  div_tabela_discreta.style.display = 'block';

  let corpo = document.querySelector('tbody');
  //limpar tela
  corpo.innerHTML = '';
  array_valores = tratamentoDeDadosNominal();
  valor_moda = modaOrdinal();
  let valor_mediana = medianaNominal();
  //mostrar mediana na tela
  texto_mediana.innerHTML = `Mediana: ${valor_mediana} <br>`;
  //mostrar media na tela
  texto_media.innerHTML = 'Media: Nao tem <br>';
  // nome tabela
  let nome_tabela = document.getElementById('nome_tabela');
  nome_tabela.innerHTML = 'Qualitativa Nominal';
  //mostrar moda na tela
  let texto_moda = document.getElementById('texto_moda');
  texto_moda.innerHTML = `Moda: ${valor_moda} <b>`;
  //motrar desvio padrao
  let texto_desvio_padrao = document.getElementById('texto_desvio_padrao');
  texto_desvio_padrao.innerHTML = `Desvio Padrão: Nao tem <b>`;
  //mostrar coeficiente de varancia
  let texto_coeficiente = document.getElementById('texto_coeficiente_variacao');
  texto_coeficiente.innerHTML = `Coeficiente de Variacao: Nao tem <b>`;
  // O que tem aqui é q esse loop cria uma linha <tr>, com algumas colunas (células) <td>
  // que depois dá pra usar aqui abaixo
  array_valores.forEach((e) => {
    let linha = document.createElement('tr');
    let campoDados = document.createElement('tr');
    let campo_fr_porcento = document.createElement('td');
    let campo_fa = document.createElement('td');
    let campo_fa_porcento = document.createElement('td');
    let campoVariavel = document.createElement('td');
    let texto_fa = document.createTextNode(e.fa);
    let texto_fr_porcento = document.createTextNode(Math.floor(e.fr_porcento));
    let texto_fa_porcento = document.createTextNode(Math.floor(e.fa_porcento));
    let textoVariavel = document.createTextNode(e.valor);
    let texto_fi = document.createTextNode(e.fi);
    campoDados.appendChild(texto_fi);
    campoVariavel.appendChild(textoVariavel);
    campo_fr_porcento.appendChild(texto_fr_porcento);
    campo_fa.appendChild(texto_fa);
    campo_fa_porcento.appendChild(texto_fa_porcento);
    linha.appendChild(campoVariavel);
    linha.appendChild(campoDados);
    linha.appendChild(campo_fr_porcento);
    linha.appendChild(campo_fa);
    linha.appendChild(campo_fa_porcento);
    corpo.appendChild(linha);
  });

  gerarGraficoQualitativaNominal();
}

function gerarGraficoQualitativaNominal() {
  array_valores = tratamentoDeDadosNominal();
  array_label = [];
  array_data = [];
  colors = [];

  // Pode se gerar as cores tambem aqui //
  array_valores.forEach((e) => {
    array_label.push(e.valor);
    array_data.push(e.fr_porcento);
    colors.push(getRandomColor());
  });

  let dadosVar = document.getElementById('dados_variavel').value;
  let nome = document.getElementById('nome_variavel').value;
  let array_dados_variavel = dadosVar.split(';');
  array_dados_variavel = Ordem(array_dados_variavel);
  let ctx = document.getElementById('myChart');
  let grafico = new Chart(ctx, {
    // Tipo de grafico //
    type: 'pie',
    // Data para o grafico //
    data: {
      labels: array_label,
      datasets: [
        {
          label: nome,
          backgroundColor: colors,
          borderColor: 'rgba(0, 0, 0, 0.1)',
          data: array_data,
        },
      ],
    },
  });
}

function tratamentoDeDadosContinua() {
  //organizar em ordem crescente done
  //descobrir a amplitude
  let dadosVar = document.getElementById('dados_variavel').value;
  let array_dados_variavel = dadosVar.split(';').map(Number);
  array_dados_variavel = Ordem(array_dados_variavel);
  let at = array_dados_variavel.slice(-1) - array_dados_variavel[0];
  //quantidade de classes
  let classe = [];
  let qtde_classes = Math.floor(Math.sqrt(array_dados_variavel.length));
  classe[0] = qtde_classes - 1;
  classe[1] = qtde_classes;
  classe[2] = qtde_classes + 1;

  let aux = true;
  let qtde_linha = 0;
  let intervalo_classes = 0;
  while (aux) {
    at++;
    // for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (at % classe[j] == 0 && at / classe[j] > 1) {
        aux = false;
        qtde_linha = classe[j];
        intervalo_classes = at / classe[j];
        break;
      }
    }
    // }
  }

  let array_final_continua = [];
  // montar tabela com as linhas separando intervalos de classe
  let valor_anterior = array_dados_variavel[0] - 1;
  // precisamos navegar a qtde de classes separando pelo valor do intervalo
  for (let i = 0; i < qtde_linha; i++) {
    let limite_classe = valor_anterior + intervalo_classes;

    qtde_itens_intervalo = array_dados_variavel.filter(
      (item) => item >= valor_anterior && item < limite_classe
    );
    array_final_continua.push({
      valor: `${valor_anterior} |----- ${limite_classe}`,
      qtde: qtde_itens_intervalo.length,
      xi: Math.ceil((limite_classe + valor_anterior) / 2),
      intervalo_classes: intervalo_classes,
      limite_inferior: valor_anterior,
    });

    valor_anterior = valor_anterior + intervalo_classes;
    // a quantide de itens por intervalor é o FI
  }

  let total_dados = [];
  array_final_continua.forEach((t) => {
    total_dados.push(parseFloat(t.qtde));
  });

  // Somatório total
  let resultado = total_dados.reduce(
    (acumulador, item) => acumulador + item,
    0
  );

  //calculo FA
  //cont aux q
  let k = 0;
  let l = 0;
  // o primeiro valor
  // enquanto percorre, soma quantidade
  array_final_continua.forEach((element) => {
    element.fi = element.qtde;
    element.fr_porcento = (element.qtde * 100) / resultado;
    //Caso base, caso seja primeira vez no laco o FA eh o valor do item mesmo
    if (k == 0) {
      element.fa = parseFloat(element.qtde);
      //caso seja um item depois do primeiro, soma o valor do FA do anterior com o atual
    } else if (k > 0) {
      //fa anterior q-1                        //valor do item atual
      element.fa =
        parseFloat(array_final_continua[k - 1].fa) + parseFloat(element.qtde);
    }
    k++;
    if (l == 0) {
      element.fa_porcento = parseFloat(element.fr_porcento);
    } else if (l > 0) {
      element.fa_porcento =
        parseFloat(array_final_continua[l - 1].fa_porcento) +
        parseFloat(element.fr_porcento);
    }
    l++;
  });

  return array_final_continua;
}

function criarTabelaContinua() {
  limparResultados();
  let div_tabela_continua = document.getElementById('div_tabela_continua');
  div_tabela_continua.style.display = 'block';

  let corpo = document.getElementById('tabela_continua');
  //limpar tela
  corpo.innerHTML = '';
  let array_valores = tratamentoDeDadosContinua();
  let media_continua = mediaContinua(array_valores);
  let valor_moda = modaContinua();
  let valor_mediana = medianaContinua();
  let desvio_padrao = desvioPadraoPopulacaoContinua(
    array_valores,
    media_continua
  );
  let coeficiente_variacao_continua = coeficienteVariacaoDiscreta(
    desvio_padrao,
    media_continua
  );

  //motrar desvio padrao
  let texto_desvio_padrao = document.getElementById('texto_desvio_padrao');
  texto_desvio_padrao.innerHTML = `Desvio Padrão ${desvio_padrao} <b>`;
  //mostrar coeficiente de varancia
  let texto_coeficiente = document.getElementById('texto_coeficiente_variacao');
  texto_coeficiente.innerHTML = `Coeficiente de Variacao ${coeficiente_variacao_continua.toFixed(
    2
  )} <b>`;
  //mostrar nome tabela
  let nome_tabela = document.getElementById('nome_tabela');

  nome_tabela.innerHTML = 'Quantitativa Continua';
  //motrar mediana
  texto_mediana.innerHTML = `Mediana: ${valor_mediana} <br>`;
  //motrar media
  texto_media.innerHTML = `Media: ${media_continua.toFixed(2)} <br>`;
  //mostrar moda
  let texto_moda = document.getElementById('texto_moda');
  texto_moda.innerHTML = `Moda: ${valor_moda.toFixed(2)} <br>`;
  // O que tem aqui é q esse loop cria uma linha <tr>, com algumas colunas (células) <td>
  // que depois dá pra usar aqui abaixo
  // let soma_total = array_valores.reduce((soma_total, array_valores) => soma_total + array_valores, 0);
  //   console.log(soma_total);
  array_valores.forEach((e) => {
    let linha = document.createElement('tr');
    let campoDados = document.createElement('tr');
    let campo_fr_porcento = document.createElement('td');
    let campo_fa = document.createElement('td');
    let campo_fa_porcento = document.createElement('td');
    let campoVariavel = document.createElement('td');
    let campo_xi = document.createElement('td');
    let texto_xi = document.createTextNode(e.xi);
    let texto_fa = document.createTextNode(e.fa);
    let texto_fr_porcento = document.createTextNode(Math.floor(e.fr_porcento));
    let texto_fa_porcento = document.createTextNode(Math.floor(e.fa_porcento));
    let textoVariavel = document.createTextNode(e.valor);
    let texto_fi = document.createTextNode(e.fi);
    campoDados.appendChild(texto_fi);
    campoVariavel.appendChild(textoVariavel);
    campo_fr_porcento.appendChild(texto_fr_porcento);
    campo_fa.appendChild(texto_fa);
    campo_fa_porcento.appendChild(texto_fa_porcento);
    campo_xi.appendChild(texto_xi);
    linha.appendChild(campoVariavel);
    linha.appendChild(campoDados);
    linha.appendChild(campo_fr_porcento);
    linha.appendChild(campo_fa);
    linha.appendChild(campo_fa_porcento);
    linha.appendChild(campo_xi);
    corpo.appendChild(linha);
  });
  gerarGraficoContinua();
}

function mediaContinua(valores) {
  let total_qtde = valores.reduce(
    (acumulador, item) => acumulador + item.qtde,
    0
  );

  let total_valores = valores.reduce(
    (acumulador, item) => acumulador + item.xi * item.qtde,
    0
  );

  let media = total_valores / total_qtde;

  return media;
}

function desvioPadraoPopulacaoContinua(valores, media) {
  // somatorio fi
  let somatorio_fi = valores.reduce(
    (acumulador, item) => acumulador + item.qtde,
    0
  );

  let somatorio_valores = valores.reduce(
    (acumulador, item) => acumulador + Math.pow(item.xi - media, 2) * item.qtde,
    0
  );

  let desvio_padrao = Math.sqrt(somatorio_valores / somatorio_fi).toFixed(2);

  return desvio_padrao;
}

function gerarGraficoContinua() {
  let array_valores = tratamentoDeDadosContinua();
  let array_label = [];
  let array_data = [];
  let nome_variavel = document.getElementById('nome_variavel').value;

  array_valores.forEach((e) => {
    array_label.push(e.valor);
    array_data.push(e.qtde);
  });

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: array_label,
      datasets: [
        {
          label: nome_variavel,
          data: array_data,
          backgroundColor: getRandomColor(),
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            categoryPercentage: 1.0,
            barPercentage: 1.0,
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

function tratamentoDeDadosOrdinal() {
  //recebendo dados do input
  let dadosVar = document.getElementById('dados_variavel').value;
  let ordem_dados = document.getElementById('ordem_valores').value.split(';');
  let dados_incorretos = false;
  //dividindo os dados
  // let array_variavel = variavel;
  let array_dados_variavel = dadosVar.split(';');
  //alfabeticamente
  array_dados_variavel = Ordem(array_dados_variavel);
  ///console.log(array_dados_variavel);
  //calcular quantidade de cada item
  const quantidade_dados = array_dados_variavel.reduce((acumulador, atual) => {
    acumulador[atual] = acumulador[atual] ? acumulador[atual] + 1 : 1;
    return acumulador;
  }, {});

  // Array vazia que irá conter {nome: 'nome_digitado', valor: valor_digitado}
  let array_valores = [];
  // contador auxiliar
  // percorrer todos os nomes digitados e adicionar na array "final" que será ordenada alfabeticamente
  let valor_anterior;
  array_dados_variavel.forEach((dados_variavel) => {
    if (dados_variavel != valor_anterior) {
      array_valores.push({
        valor: dados_variavel,
        qtde: quantidade_dados[dados_variavel],
      });
    }
    valor_anterior = dados_variavel;
  });

  // TODO: ordenar de acordo com usuário
  // percorrer array de valores e verificar se "batem" com os dados ordenados
  ordem_dados.forEach((valor) => {
    if (array_dados_variavel.includes(valor) !== true) {
      dados_incorretos = true;
      return;
    }
  });

  if (dados_incorretos === true) {
    alert('Os valores digitados não estão nos dados!!!');
    return false;
  }

  let array_valores_ordenado = [];
  ordem_dados.forEach((valor_ordem) => {
    array_valores.forEach((item) => {
      if (item.valor === valor_ordem) {
        array_valores_ordenado.push(item);
      }
    });
  });

  let total_dados = [];
  array_valores_ordenado.forEach((t) => {
    total_dados.push(parseFloat(t.qtde));
  });

  // Somatório total
  let resultado = total_dados.reduce(
    (acumulador, item) => acumulador + item,
    0
  );

  //calculo FA
  //cont aux q
  let k = 0;
  let l = 0;
  // o primeiro valor
  // enquanto percorre, soma quantidade
  array_valores_ordenado.forEach((element) => {
    element.fi = element.qtde;
    element.fr_porcento = (element.qtde * 100) / resultado;
    //Caso base, caso seja primeira vez no laco o FA eh o valor do item mesmo
    if (k == 0) {
      element.fa = parseFloat(element.qtde);
      //caso seja um item depois do primeiro, soma o valor do FA do anterior com o atual
    } else if (k > 0) {
      //fa anterior q-1                        //valor do item atual
      element.fa =
        parseFloat(array_valores_ordenado[k - 1].fa) + parseFloat(element.qtde);
    }
    k++;
    if (l == 0) {
      element.fa_porcento = parseFloat(element.fr_porcento);
    } else if (l > 0) {
      element.fa_porcento =
        parseFloat(array_valores_ordenado[l - 1].fa_porcento) +
        parseFloat(element.fr_porcento);
    }
    l++;
  });

  return array_valores_ordenado;
}

function modaOrdinal() {
  let dadosVar = document.getElementById('dados_variavel').value;
  let array_dados_variavel = dadosVar.split(';');
  array_dados_variavel = Ordem(array_dados_variavel);
  let entrada = array_dados_variavel;
  let maior = null;
  let ocorrenciasMaior = -1;
  let contagem = 1;
  for (let i = 1; i <= entrada.length; i++) {
    if (i < entrada.length && entrada[i] == entrada[i - contagem]) contagem++;
    else if (contagem > ocorrenciasMaior) {
      maior = entrada[i - 1];
      ocorrenciasMaior = contagem;
    }
  }

  return maior;
}

function medianaNominal() {
  let dadosVar = document.getElementById('dados_variavel').value;
  let array_dados_variavel = dadosVar.split(';');
  array_dados_variavel = Ordem(array_dados_variavel);
  let md = array_dados_variavel;
  let valor_mediana = '';
  var posicao = md.length / 2;
  let qtde = md.length;
  let pos_elemento = '';
  //console.log(posicao);
  if (qtde % 2 == 0) {
    if (md[posicao - 1] == md[posicao]) {
      //Se for igual ele já declara que aquela é a mediana
      valor_mediana = md[posicao];
      return valor_mediana;
    } else {
      //Se não for aqui ele mostra o calculo da mediana
      valor_mediana = (md[posicao] + md[posicao - 1]) / 2;
      return valor_mediana;
    }
  } else {
    //Se a posição for impar , ele da o numero da posição direto arredondando a posição com a função pronta math.round, mostrando a posicao do elemento
    pos_elemento = Math.ceil(posicao) - 1;
    //pegar a posicao do elemento e mostrar o valor do elemento
    return md[pos_elemento];
  }
}

function criarTabelaOrd() {
  limparResultados();
  let corpo = document.querySelector('tbody');
  let div_tabela_discreta = document.getElementById(
    'div_tabela_discreta_nominal_ordinal'
  );
  div_tabela_discreta.style.display = 'block';

  array_valores = tratamentoDeDadosOrdinal();

  if (array_valores === false) {
    return;
  }

  valor_moda = modaOrdinal();
  let valor_mediana = medianaNominal();
  //mostrar mediana na tela
  texto_mediana.innerHTML = `Mediana: ${valor_mediana} <br>`;
  //mostrar media na tela
  texto_media.innerHTML = 'Media: Nao tem <br>';
  // nome tabela
  let nome_tabela = document.getElementById('nome_tabela');
  nome_tabela.innerHTML = 'Qualitativa Ordinal/Nominal';
  //mostrar moda na tela
  let texto_moda = document.getElementById('texto_moda');
  texto_moda.innerHTML = `Moda: ${valor_moda} <b>`;
  //motrar desvio padrao
  let texto_desvio_padrao = document.getElementById('texto_desvio_padrao');
  texto_desvio_padrao.innerHTML = `Desvio Padrão: Nao tem <b>`;
  //mostrar coeficiente de varancia
  let texto_coeficiente = document.getElementById('texto_coeficiente_variacao');
  texto_coeficiente.innerHTML = `Coeficiente de Variacao: Nao tem <b>`;
  // O que tem aqui é q esse loop cria uma linha <tr>, com algumas colunas (células) <td>
  // que depois dá pra usar aqui abaixo
  array_valores.forEach((e) => {
    let linha = document.createElement('tr');
    let campoDados = document.createElement('tr');
    let campo_fr_porcento = document.createElement('td');
    let campo_fa = document.createElement('td');
    let campo_fa_porcento = document.createElement('td');
    let campoVariavel = document.createElement('td');
    let texto_fa = document.createTextNode(e.fa);
    let texto_fr_porcento = document.createTextNode(Math.floor(e.fr_porcento));
    let texto_fa_porcento = document.createTextNode(Math.floor(e.fa_porcento));
    let textoVariavel = document.createTextNode(e.valor);
    let texto_fi = document.createTextNode(e.fi);
    campoDados.appendChild(texto_fi);
    campoVariavel.appendChild(textoVariavel);
    campo_fr_porcento.appendChild(texto_fr_porcento);
    campo_fa.appendChild(texto_fa);
    campo_fa_porcento.appendChild(texto_fa_porcento);
    linha.appendChild(campoVariavel);
    linha.appendChild(campoDados);
    linha.appendChild(campo_fr_porcento);
    linha.appendChild(campo_fa);
    linha.appendChild(campo_fa_porcento);
    corpo.appendChild(linha);
  });
  gerarGraficoQualitativaOrdinal();
}

//Função geradora do grafico //
function gerarGraficoQualitativaOrdinal() {
  array_valores = tratamentoDeDadosOrdinal();
  array_label = [];
  array_data = [];
  colors = [];

  // Pode se gerar as cores tambem aqui //
  array_valores.forEach((e) => {
    array_label.push(e.valor);
    array_data.push(e.fr_porcento);
    colors.push(getRandomColor());
  });

  let dadosVar = document.getElementById('dados_variavel').value;
  let nome = document.getElementById('nome_variavel').value;
  let array_dados_variavel = dadosVar.split(';');
  array_dados_variavel = Ordem(array_dados_variavel);
  let ctx = document.getElementById('myChart');
  let grafico = new Chart(ctx, {
    // Tipo de grafico //
    type: 'pie',
    data: {
      labels: array_label,
      datasets: [
        {
          label: nome,
          backgroundColor: colors,
          borderColor: 'rgba(0, 0, 0, 0.1)',
          data: array_data,
        },
      ],
    },
  });
}

//Trabalho-02 Estrutura de Dados/Prof Me Fausto Cintra-Grupo 09/Segundo semestre de 2020//
//Trabalho-02 Estrutura de Dados/Inserir Algoritimo de Ordenação quickSort(6,0 pontos) //
function troca(vet, i, j) {
  let aux = vet[i];
  vet[i] = vet[j];
  vet[j] = aux;
}

function Ordem(vet, fnComp, posIni = 0, posFim = vet.length - 1) {
  if (posFim > posIni) {
    const posPivot = posFim;
    let posDiv = posIni - 1;
    for (let i = posIni; i < posFim; i++) {
      if (vet[i] < vet[posPivot] && i != posDiv) {
        posDiv++;
        troca(vet, i, posDiv);
      }
    }
    posDiv++;
    troca(vet, posDiv, posPivot);

    Ordem(vet, fnComp, posIni, posDiv - 1);

    Ordem(vet, fnComp, posDiv + 1, posFim);
  }
  return vet;
}

//__________________________________________________________________________________//

// Essa função lê o CSV
function lerCSV() {
  let fileInput = document.getElementById('arquivo');
  let string_valores = '';
  Papa.parse(fileInput.files[0], {
    header: false,
    complete: function (results) {
      results.data[0].forEach((item) => {
        string_valores += item + ';';
      });
      document.getElementById('dados_variavel').value = string_valores.slice(
        0,
        -1
      );
    },
  });
}

function limparResultados() {
  let texto_media = document.getElementById('texto_media');
  texto_media.innerHTML = '';

  let discreta_nominal_ordinal = document.getElementById(
    'discreta_nominal_ordinal'
  );
  discreta_nominal_ordinal.innerHTML = '';

  let div_tabela_discreta = document.getElementById(
    'div_tabela_discreta_nominal_ordinal'
  );
  div_tabela_discreta.style.display = 'none';

  let div_tabela_continua = document.getElementById('div_tabela_continua');
  div_tabela_continua.style.display = 'none';

  let tabela_continua = document.getElementById('tabela_continua');
  tabela_continua.innerHTML = '';

  let texto_moda = document.getElementById('texto_moda');
  texto_moda.innerHTML = '';

  let texto_mediana = document.getElementById('texto_mediana');
  texto_mediana.innerHTML = '';

  let texto_desvio_padrao = document.getElementById('texto_desvio_padrao');
  texto_desvio_padrao.innerHTML = '';

  let texto_coeficiente_variacao = document.getElementById(
    'texto_coeficiente_variacao'
  );
  texto_coeficiente_variacao.innerHTML = '';

  let tipo_separatriz = document.getElementById('tipo_separatriz');
  tipo_separatriz.value = '';

  let valor_separatriz = document.getElementById('valor_separatriz');
  valor_separatriz.value = '';

  let valor_separatriz_calculado = document.getElementById(
    'valor_separatriz_calculado'
  );
  valor_separatriz_calculado.value = '';

  document.getElementById('container_grafico').innerHTML = '&nbsp;';
  document.getElementById('container_grafico').innerHTML =
    '<canvas id="myChart"></canvas>';
}

function quartilQualitativaNominal() {
  let dados = document.getElementById('dados_variavel').value.split(';');
  dados = Ordem(dados);
  let posicao = document.getElementById('valor_separatriz').value;
  let calculo = Math.ceil((25 * dados.length * posicao) / 100);
  let quartil = dados[calculo - 1];

  let valor_calculado = document.getElementById('valor_separatriz_calculado');
  valor_calculado.value = quartil;
  valor_calculado.style.display = 'block';
}
function quintilQualitativaNominal() {
  let dados = document.getElementById('dados_variavel').value.split(';');
  dados = Ordem(dados);
  let posicao = document.getElementById('valor_separatriz').value;
  let calculo = Math.ceil((20 * dados.length * posicao) / 100);
  let quintil = dados[calculo - 1];

  let valor_calculado = document.getElementById('valor_separatriz_calculado');
  valor_calculado.value = quintil;
  valor_calculado.style.display = 'block';
}

function decilQualitativaNominal() {
  let dados = document.getElementById('dados_variavel').value.split(';');
  dados = Ordem(dados);
  let posicao = document.getElementById('valor_separatriz').value;
  let calculo = Math.ceil((10 * dados.length * posicao) / 100);
  let decil = dados[calculo - 1];

  let valor_calculado = document.getElementById('valor_separatriz_calculado');
  valor_calculado.value = decil;
  valor_calculado.style.display = 'block';
}

function percentilNominal() {
  let dados = document.getElementById('dados_variavel').value.split(';');
  dados = Ordem(dados);
  let posicao = document.getElementById('valor_separatriz').value;
  let calculo = Math.ceil((dados.length * posicao) / 100);
  let percentil = dados[calculo - 1];

  let valor_calculado = document.getElementById('valor_separatriz_calculado');
  valor_calculado.value = percentil;
  valor_calculado.style.display = 'block';
}

function quartilDiscreta() {
  let dados = document.getElementById('dados_variavel').value.split(';');
  dados = Ordem(dados);
  let posicao = document.getElementById('valor_separatriz').value;
  let calculo = Math.ceil((25 * dados.length * posicao) / 100);
  let quartil = dados[calculo - 1];

  let valor_calculado = document.getElementById('valor_separatriz_calculado');
  valor_calculado.value = quartil;
  valor_calculado.style.display = 'block';
}
function quintilDiscreta() {
  let dados = document.getElementById('dados_variavel').value.split(';');
  dados = Ordem(dados);
  let posicao = document.getElementById('valor_separatriz').value;
  let calculo = Math.ceil((20 * dados.length * posicao) / 100);
  let quintil = dados[calculo - 1];

  let valor_calculado = document.getElementById('valor_separatriz_calculado');
  valor_calculado.value = quintil;
  valor_calculado.style.display = 'block';
}

function decilDiscreta() {
  let dados = document.getElementById('dados_variavel').value.split(';');
  dados = Ordem(dados);
  let posicao = document.getElementById('valor_separatriz').value;
  let calculo = Math.ceil((10 * dados.length * posicao) / 100);
  let decil = dados[calculo - 1];

  let valor_calculado = document.getElementById('valor_separatriz_calculado');
  valor_calculado.value = decil;
  valor_calculado.style.display = 'block';
}

function percentilDiscreta() {
  let dados = document.getElementById('dados_variavel').value.split(';');
  dados = Ordem(dados);
  let posicao = document.getElementById('valor_separatriz').value;
  let calculo = Math.ceil((dados.length * posicao) / 100);
  let percentil = dados[calculo - 1];

  let valor_calculado = document.getElementById('valor_separatriz_calculado');
  valor_calculado.value = percentil;
  valor_calculado.style.display = 'block';
}

function quartilOrdinal() {
  let array_valores = document
    .getElementById('dados_variavel')
    .value.split(';');
  let ordem_dados = document.getElementById('ordem_valores').value.split(';');
  let array_valores_ordenado = [];
  ordem_dados.forEach((valor_ordem) => {
    array_valores.forEach((item) => {
      if (item === valor_ordem) {
        array_valores_ordenado.push(item);
      }
    });
  });
  let posicao = document.getElementById('valor_separatriz').value;
  let calculo = Math.ceil((array_valores_ordenado.length * posicao) / 100);
  let quartil = array_valores_ordenado[calculo - 1];

  let valor_calculado = document.getElementById('valor_separatriz_calculado');
  valor_calculado.value = quartil;
  valor_calculado.style.display = 'block';
}

function quintilOrdinal() {
  let array_valores = document
    .getElementById('dados_variavel')
    .value.split(';');
  let ordem_dados = document.getElementById('ordem_valores').value.split(';');
  let array_valores_ordenado = [];
  ordem_dados.forEach((valor_ordem) => {
    array_valores.forEach((item) => {
      if (item === valor_ordem) {
        array_valores_ordenado.push(item);
      }
    });
  });
  let posicao = document.getElementById('valor_separatriz').value;
  let calculo = Math.ceil((array_valores_ordenado.length * posicao) / 100);
  let quintil = array_valores_ordenado[calculo - 1];

  let valor_calculado = document.getElementById('valor_separatriz_calculado');
  valor_calculado.value = quintil;
  valor_calculado.style.display = 'block';
}

function decilOrdinal() {
  let array_valores = document
    .getElementById('dados_variavel')
    .value.split(';');
  let ordem_dados = document.getElementById('ordem_valores').value.split(';');
  let array_valores_ordenado = [];
  ordem_dados.forEach((valor_ordem) => {
    array_valores.forEach((item) => {
      if (item === valor_ordem) {
        array_valores_ordenado.push(item);
      }
    });
  });
  let posicao = document.getElementById('valor_separatriz').value;
  let calculo = Math.ceil((array_valores_ordenado.length * posicao) / 100);
  let decil = array_valores_ordenado[calculo - 1];

  let valor_calculado = document.getElementById('valor_separatriz_calculado');
  valor_calculado.value = decil;
  valor_calculado.style.display = 'block';
}

function percentilOrdinal() {
  let array_valores = document
    .getElementById('dados_variavel')
    .value.split(';');
  let ordem_dados = document.getElementById('ordem_valores').value.split(';');
  let array_valores_ordenado = [];
  ordem_dados.forEach((valor_ordem) => {
    array_valores.forEach((item) => {
      if (item === valor_ordem) {
        array_valores_ordenado.push(item);
      }
    });
  });
  let posicao = document.getElementById('valor_separatriz').value;
  let calculo = Math.ceil((array_valores_ordenado.length * posicao) / 100);
  let percentil = array_valores_ordenado[calculo - 1];

  let valor_calculado = document.getElementById('valor_separatriz_calculado');
  valor_calculado.value = percentil;
  valor_calculado.style.display = 'block';
}

function quartilContinua() {
  let dados = tratamentoDeDadosContinua();
  const total_dados = dados[dados.length - 1].fa;
  let quartil_informado = document.getElementById('valor_separatriz').value;
  let posicao_absoluta = ((25 * total_dados * quartil_informado) / 100).toFixed(
    2
  );
  let idx_classe = 0;

  // aqui encontramos a classe que se refere a posição absoluta
  for (let i = 0; i < dados.length; i++) {
    if (posicao_absoluta <= dados[i].fa) {
      idx_classe = i;
      break;
    }
  }

  // quartil = limite_inferior_classe + ((Posição - FAC anterior) / FI_qtde_elementos) * intervalo_classes;
  let fac_anterior = 0;
  if (idx_classe == 0) {
    fac_anterior = 0;
  } else {
    fac_anterior = dados[idx_classe - 1].fa;
  }
  let quartil =
    dados[idx_classe].limite_inferior +
    ((posicao_absoluta - fac_anterior) / total_dados) *
      dados[idx_classe].intervalo_classes;
  let valor_calculado = document.getElementById('valor_separatriz_calculado');
  valor_calculado.value = quartil;
  valor_calculado.style.display = 'block';
}

function quintilContinua() {
  let dados = tratamentoDeDadosContinua();
  const total_dados = dados[dados.length - 1].fa;
  let quintil_informado = document.getElementById('valor_separatriz').value;
  let posicao_absoluta = ((25 * total_dados * quintil_informado) / 100).toFixed(
    2
  );
  let idx_classe = 0;

  // aqui encontramos a classe que se refere a posição absoluta
  for (let i = 0; i < dados.length; i++) {
    if (posicao_absoluta <= dados[i].fa) {
      idx_classe = i;
      break;
    }
  }

  // quartil = limite_inferior_classe + ((Posição - FAC anterior) / FI_qtde_elementos) * intervalo_classes;
  let fac_anterior = 0;
  if (idx_classe == 0) {
    fac_anterior = 0;
  } else {
    fac_anterior = dados[idx_classe - 1].fa;
  }
  let quintil =
    dados[idx_classe].limite_inferior +
    ((posicao_absoluta - fac_anterior) / total_dados) *
      dados[idx_classe].intervalo_classes;
  let valor_calculado = document.getElementById('valor_separatriz_calculado');
  valor_calculado.value = quintil;
  valor_calculado.style.display = 'block';
}

function decilContinua() {
  let dados = tratamentoDeDadosContinua();
  const total_dados = dados[dados.length - 1].fa;
  let decil_informado = document.getElementById('valor_separatriz').value;
  let posicao_absoluta = ((25 * total_dados * decil_informado) / 100).toFixed(
    2
  );
  let idx_classe = 0;

  // aqui encontramos a classe que se refere a posição absoluta
  for (let i = 0; i < dados.length; i++) {
    if (posicao_absoluta <= dados[i].fa) {
      idx_classe = i;
      break;
    }
  }

  // quartil = limite_inferior_classe + ((Posição - FAC anterior) / FI_qtde_elementos) * intervalo_classes;
  let fac_anterior = 0;
  if (idx_classe == 0) {
    fac_anterior = 0;
  } else {
    fac_anterior = dados[idx_classe - 1].fa;
  }
  let decil =
    dados[idx_classe].limite_inferior +
    ((posicao_absoluta - fac_anterior) / total_dados) *
      dados[idx_classe].intervalo_classes;
  let valor_calculado = document.getElementById('valor_separatriz_calculado');
  valor_calculado.value = decil;
  valor_calculado.style.display = 'block';
}

function percentilContinua() {
  let dados = tratamentoDeDadosContinua();
  const total_dados = dados[dados.length - 1].fa;
  let percentil_informado = document.getElementById('valor_separatriz').value;
  let posicao_absoluta = (
    (25 * total_dados * percentil_informado) /
    100
  ).toFixed(2);
  let idx_classe = 0;

  // aqui encontramos a classe que se refere a posição absoluta
  for (let i = 0; i < dados.length; i++) {
    if (posicao_absoluta <= dados[i].fa) {
      idx_classe = i;
      break;
    }
  }

  // quartil = limite_inferior_classe + ((Posição - FAC anterior) / FI_qtde_elementos) * intervalo_classes;
  let fac_anterior = 0;
  if (idx_classe == 0) {
    fac_anterior = 0;
  } else {
    fac_anterior = dados[idx_classe - 1].fa;
  }
  let percentil =
    dados[idx_classe].limite_inferior +
    ((posicao_absoluta - fac_anterior) / total_dados) *
      dados[idx_classe].intervalo_classes;
  let valor_calculado = document.getElementById('valor_separatriz_calculado');
  valor_calculado.value = percentil;
  valor_calculado.style.display = 'block';
}

function medianaContinua() {
  let dados = tratamentoDeDadosContinua();
  const total_dados = dados[dados.length - 1].fa;
  let posicao_absoluta = ((50 * total_dados) / 100).toFixed(2);
  let idx_classe = 0;

  // aqui encontramos a classe que se refere a posição absoluta
  for (let i = 0; i < dados.length; i++) {
    if (posicao_absoluta <= dados[i].fa) {
      idx_classe = i;
      break;
    }
  }

  // mediana = limite_inferior_classe + ((Posição - FAC anterior) / FI_qtde_elementos) * intervalo_classes;
  let fac_anterior = 0;
  if (idx_classe == 0) {
    fac_anterior = 0;
  } else {
    fac_anterior = dados[idx_classe - 1].fa;
  }
  let mediana =
    dados[idx_classe].limite_inferior +
    ((posicao_absoluta - fac_anterior) / total_dados) *
      dados[idx_classe].intervalo_classes;

  return mediana;
}

function modaContinua() {
  let dados = tratamentoDeDadosContinua();
  let idx_classe = 0;
  let maior_anterior = dados[0].fi;
  let maior_atual = 0;

  for (let i = 0; i < dados.length; i++) {
    maior_atual = dados[i].fi;
    if (maior_anterior < maior_atual) {
      maior_anterior = maior_atual;
      idx_classe = i;
    }
  }

  return dados[idx_classe].xi;
}

function calcularSeparatriz() {
  let tipo_tabela = document.getElementById('tipo_tabela').value;
  let tipo_separatriz = document.getElementById('tipo_separatriz').value;

  if (tipo_tabela === 'nominal') {
    if (tipo_separatriz === 'quartil') {
      quartilQualitativaNominal();
    } else if (tipo_separatriz === 'quintil') {
      quintilQualitativaNominal();
    } else if (tipo_separatriz === 'decil') {
      decilQualitativaNominal();
    } else if (tipo_separatriz === 'percentil') {
      percentilNominal();
    }
  }
  if (tipo_tabela === 'ordinal') {
    if (tipo_separatriz === 'quartil') {
      quartilOrdinal();
    } else if (tipo_separatriz === 'quintil') {
      quintilOrdinal();
    } else if (tipo_separatriz === 'decil') {
      decilOrdinal();
    } else if (tipo_separatriz === 'percentil') {
      percentilOrdinal();
    }
  }
  if (tipo_tabela === 'discreta') {
    if (tipo_separatriz === 'quartil') {
      quartilDiscreta();
    } else if (tipo_separatriz === 'quintil') {
      quintilDiscreta();
    } else if (tipo_separatriz === 'decil') {
      decilDiscreta();
    } else if (tipo_separatriz === 'percentil') {
      percentilDiscreta();
    }
  }
  if (tipo_tabela === 'continua') {
    if (tipo_separatriz === 'quartil') {
      quartilContinua();
    } else if (tipo_separatriz === 'quintil') {
      quintilContinua();
    } else if (tipo_separatriz === 'decil') {
      decilContinua();
    } else if (tipo_separatriz === 'percentil') {
      percentilContinua();
    }
  }
}
