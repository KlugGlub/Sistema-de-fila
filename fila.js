
// Parâmetros da simulação
const tempoSimuladoMinutos = 100; // Tempo total da simulação em minutos
const mediaChegadasPorMinuto = 1; // Média de chegadas por minuto
const mediaAtendimentoPorMinuto = 0.8; // Média de atendimentos por minuto

// Inicialização
let fila = [];
let tempoAtual = 0;
let clientesAtendidos = 0; // Contador de clientes atendidos
let caixaOcupado = false; // Estado inicial do caixa: desocupado
let numerosGerados = []; // Array para armazenar os números gerados

// Parâmetros do LCG
const m = 75 ** 31 - 1; // Módulo
const a = 8 ** 5; // Multiplicador
const c = 15; // Incremento
let seed = 12345; // Semente inicial

//Valores para os parâmetros
//(m = 75 **31} - 1) (a = 8^5)  (c = 15) (X = 12345)



// Função para gerar número pseudoaleatório entre 0 e 1
function gerarLCG() {
  seed = (a * seed + c) % m;
  return seed / m;
}

// Função para gerar variável aleatória exponencial
function gerarExponencial(media) {
  const numeroGerado = -Math.log(1 - gerarLCG()) / media;
  numerosGerados.push(numeroGerado); // Adiciona o número gerado ao array
  return numeroGerado;
}


// Simulação
while (tempoAtual < tempoSimuladoMinutos) {
  const proximaChegada = gerarExponencial(mediaChegadasPorMinuto);
  const proximaSaida = gerarExponencial(mediaAtendimentoPorMinuto);

  if (!caixaOcupado && proximaChegada < proximaSaida) {
    // Chegada de cliente e caixa desocupado
    caixaOcupado = true;
    console.log(`Caixa ocupado em ${tempoAtual + proximaChegada} minutos.`);
  } else if (caixaOcupado && proximaChegada < proximaSaida) {
    // Chegada de cliente e caixa ocupado
    fila.push(tempoAtual + proximaChegada);
    console.log(`Cliente chegou em ${tempoAtual + proximaChegada} minutos. Fila atual: ${'*'.repeat(fila.length)}`);
  } else {
    // Saída de cliente
    const clienteAtendido = fila.shift();
    console.log(`Cliente atendido em ${tempoAtual + proximaSaida} minutos. Fila atual: ${'*'.repeat(fila.length)}`);
    clientesAtendidos++; // Incrementa o contador de clientes atendidos
    caixaOcupado = false; // Caixa fica desocupado após atendimento
  }

  tempoAtual += Math.min(proximaChegada, proximaSaida);
}

// Cálculos finais
const tempoTotalEmFila = fila.reduce((total, chegada) => total + chegada, 0);
const tempoMedioEmFila = tempoTotalEmFila / clientesAtendidos;
const tempoOcupadoServidor = clientesAtendidos * mediaAtendimentoPorMinuto;

console.log(`Tempo médio em fila: ${tempoMedioEmFila.toFixed(2)} minutos`);
console.log(`Número de clientes atendidos: ${clientesAtendidos}`);
console.log(`Tempo ocupado pelo servidor (caixa): ${tempoOcupadoServidor.toFixed(2)} minutos`);

