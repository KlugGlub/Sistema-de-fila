//Parâmetros 
let medPessoasPorMinuto = 2
let medAtendimetno = 1.3
let tempoSimulado = 450


//Inicialização
let fila = []
let estadoServidor = 0
let relogio = 0
let numFila = 0
let ultimoEvento;

//proximos eventos
let proximaChegada = gerarChegada()
let proximaSaida = 9999999


function gerarLCG() {
  let a = 8 ** 5
  let seed = 12345
  let c = 15
  let m = 75 ** 31 - 1

  seed = (a * seed + c) % m;
  return seed / m;
}
function gerarExponencial(media){
  const numeroGerado = -Math.log(gerarLCG()) / media;
  return numeroGerado;
}

function gerarChegada(){
  gerarLCG()
}
function gerarSaida(){
  gerarLCG()
}


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
        ultimoEvento = proximaChegada
        proximaChegada = gerarChegada()
        proximaSaida = gerarSaida()
        relogio += proximaChegada
        console.log("Tempo: " + relogio)
        console.log("Último Evento: ${ultimoEvento}")
        console.log("Fila:  ${fila.length}")

      }
  } else {  //processa Saída
    if(numFila > 0){

      proximaSaida = gerarSaida()
      numFila--
      tempoSaida = fila.shift()
      console.log("Fila:  ${fila.length}")

    } else {
      servidor = 0
      proximaSaida = 9999
      proximaChegada = gerarChegada()
    }
  }
}