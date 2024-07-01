//Parâmetros 
let medPessoasPorMinuto = 2
let medAtendimetno = 1.3
let tempoSimulado = 450


//Inicialização
let fila = []
let servidor = 0
let relogio = 0
let numFila = 0
let ultimoEvento;

//proximos eventos
let proximaChegada = gerarChegada()
let proximaSaida = 9999999


function gerarLCG() {
  let a = 50
  let seed = 100
  let c = 12
  let m = 20*2 - 1

  seed = (a * seed + c) % m;
  return seed / m;
}
function gerarExponencial(media){
  const numeroGerado = -Math.log(gerarLCG()) / media;
  return numeroGerado;
}

function gerarChegada(){
  return gerarExponencial(medPessoasPorMinuto)
}
function gerarSaida(){
  return gerarExponencial(medAtendimetno)
}

console.log(gerarChegada())


//Simulação
while(relogio < tempoSimulado){
  if(proximaChegada < proximaSaida){ //processa Chegada
      if(servidor == 0){

        servidor = 1
        proximaSaida = gerarSaida()
        relogio += proximaChegada

      } else {

        fila.push(proximaChegada)
        numFila++
        proximaChegada = gerarChegada()
        proximaSaida = gerarSaida()
      }
  } else {  //processa Saída
    if(numFila > 0){

      proximaSaida = gerarSaida()
      numFila--
      tempoSaida = fila.shift()

    } else {
      servidor = 0
      proximaSaida = 9999
      proximaChegada = gerarChegada()
    }
  }
}