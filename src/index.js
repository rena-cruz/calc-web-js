const TAMANHO_MAXIMO_VISOR = 16;

var ligado = false;
var listaOperacoes = [];
var limparVisor = false;

function LigarCalc(){
    ligado = true;
    let visor = document.getElementById("visor");
    visor.value = 0;
}

function DesligarCalc(){
    ligado = false;
    listaOperacoes = [];
    let visor = document.getElementById("visor");
    visor.value = null;
}

function DigitarNumeros(numeroDigitado){
    if(!ligado) { return; }
    let visor = document.getElementById("visor");
    
    if(visor.value.length >= TAMANHO_MAXIMO_VISOR){ return; }
    if (limparVisor) {
        visor.value = numeroDigitado;
        limparVisor = false;
    }else{
        visor.value += numeroDigitado;
    }
    visor.value = RemoverZerosEsquerda(visor.value.replace(',','.')).replace('.',',');
}

function DigitarPonto(){
    if(!ligado) { return; }
    let visor = document.getElementById("visor");

    if(visor.value.length >= TAMANHO_MAXIMO_VISOR){ return; }
    visor.value += ",";
}

function RemoverZerosEsquerda(valorAtualVisor){
    let valorNumericoVisor = parseFloat(valorAtualVisor);
    return valorNumericoVisor.toString();
}

function Operador(operadorDigitado){
    let visor = document.getElementById("visor");
    listaOperacoes.push(parseFloat(visor.value.replace(',','.')));
    listaOperacoes.push(operadorDigitado);
    limparVisor = true; 
}

function Igual(){
    let visor = document.getElementById("visor");
    listaOperacoes.push(parseFloat(visor.value.replace(',','.')));

    let primeiroOperando = null;
    let Operador = "";
    let segundoOperando = null;
    for (let i = 0; i < listaOperacoes.length; i++) {
        if (i%2==0) {
            if (primeiroOperando === null) {
                primeiroOperando = listaOperacoes[i];  
            }else{
                segundoOperando = listaOperacoes[i]; 
            }
        }else{
            Operador = listaOperacoes[i];
        }

        if (primeiroOperando !== null && segundoOperando !== null) {
            switch (Operador) {
                case '+':
                    primeiroOperando = primeiroOperando + segundoOperando;
                    segundoOperando = null;
                    break;
                case '-':
                    primeiroOperando = primeiroOperando - segundoOperando;
                    segundoOperando = null;
                    break;
                case '*':
                    primeiroOperando = primeiroOperando * segundoOperando;
                    segundoOperando = null;
                    break;
                case '/':
                    primeiroOperando = primeiroOperando / segundoOperando;
                    segundoOperando = null;
                    break;
                default:
                    break;
            }
        }
    }
    visor.value = primeiroOperando.toString().replace('.',',');
    listaOperacoes = [];
}