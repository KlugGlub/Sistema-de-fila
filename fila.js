// Parâmetros da simulação
const tempoSimuladoMinutos = 100; // Tempo total da simulação em minutos
const mediaChegadasPorMinuto = 1; // Média de chegadas por minuto
const mediaAtendimentoPorMinuto = 0.8; // Média de atendimentos por minuto

// Inicialização
let fila = [];
let tempoAtual = 0;
let clientesAtendidos = 0; // Contador de clientes atendidos

// Função para gerar variável aleatória exponencial
function gerarExponencial(media) {
  return -Math.log(1 - Math.random()) / media;
}

// Simulação
while (tempoAtual < tempoSimuladoMinutos) {
  const proximaChegada = gerarExponencial(mediaChegadasPorMinuto);
  const proximaSaida = gerarExponencial(mediaAtendimentoPorMinuto);

  if (proximaChegada < proximaSaida) {
    // Chegada de cliente
    fila.push(tempoAtual + proximaChegada);
    console.log(`Cliente chegou em ${tempoAtual + proximaChegada} minutos. Fila atual: ${'*'.repeat(fila.length)}`);
  } else {
    // Saída de cliente
    const clienteAtendido = fila.shift();
    console.log(`Cliente atendido em ${tempoAtual + proximaSaida} minutos. Fila atual: ${'*'.repeat(fila.length)}`);
    clientesAtendidos++; // Incrementa o contador de clientes atendidos
  }

  tempoAtual += Math.min(proximaChegada, proximaSaida);
}

const tempoTotalEmFila = fila.reduce((total, chegada) => total + chegada, 0);
const tempoMedioEmFila = tempoTotalEmFila / clientesAtendidos; // Usa o contador de clientes atendidos

console.log(`Tempo médio em fila: ${tempoMedioEmFila.toFixed(2)} minutos`);
console.log(`Número de clientes atendidos: ${clientesAtendidos}`); // Exibe o contador atualizado

