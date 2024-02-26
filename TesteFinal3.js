const Cliente = {
  nome : "Wendel C B",
  datanascimento : "14/10/2004",
   documento: {
    tipo : "rg",
    numero : 1023131321,
   },
   endereço: {
    cep : 4125000,
    estado : "Bahia",
    cidade : "Salvador",
    bairro : "Stella maris",
    logradouro :"Rua THZ",
    Numero : 560 ,
    complemento : "AZ",
   },
   tipo :"Brasileiro",
   rendamensal : 15000,
   ativo : false,

Validardados() {
   const maiorde18  = consultaridade(this.datanascimento)
   const tipoDocumento = consultardocumento(this.documento.tipo)
   const numeroValido = consultarnumero(this.documento.numero)

   const dadosValidos = maiorde18 && tipoDocumento && numeroValido

   if (dadosValidos) {
    this.ativarconta()
    }
   },
ativarconta() {
this.ativo = true
this.numerodaconta = gerarnumerodaconta()
this.saldo = 0
this.cartao = obtertipodecartão(this.rendamensal)

},

acrescentarsaldo(valor,moeda){
    if(!this.ativo) {
        console.error("a conta precisa estar ativa")
        return
    }

    moeda = moeda.toUpperCase()
    if (moeda === "BRL"){
        this.saldo += valor
        return

    } if(moeda === "EUR" || moeda === "USD"){
        this.saldo += converterparareal(valor,moeda)
        return

    }
    console.error("As unicas moedas sao BRL , USD , EUR")
},

removersaldo(valor){
    if(!this.ativo){
        console.error("Sua conta não esta ativa")
        return
    }
if (valor>saldo){
console.error(`é impossivel realizar este saque pois seu saldo é de ${this.saldo}`)
return

}
this.saldo -= valor

}
}

Cliente.Validardados()
console.log(Cliente.ativo)

Cliente.acrescentarsaldo(20, "EUR")
console.log(Cliente.saldo)

Cliente.removersaldo(200)
console.log(Cliente.saldo)

function maiorde18(datanascimento) {
    const idade = obteridade(datanascimento)
    return idade >= 18
}

function consultaridade(stringDataNascimento) {
const [diaNascimento,mesNascimento,anoNascimento] = stringDataNascimento.split(`/`)
const objetoDataNascimento = new Date (anoNascimento, Number(mesNascimento) -1, diaNascimento)
const idadeEmMilissegundos = new Date ().getTime() - objetoDataNascimento.getTime()
const idadeEmAnos = milissegundosParaAnos(idadeEmMilissegundos)
return idadeEmAnos

}

function milissegundosParaAnos(milissegundos){
    return milissegundos / (1000 * 60 * 60 * 24 * 365)
}

function consultardocumento(tipoDocumento) {
    const tiposAceitos = ["RG", "CNH", "PASSAPORTE"]
    const tipoValido = tiposAceitos.some(tipoAceito => tipoDocumento.toUpperCase() === tipoAceito)
    return tipoValido
}
function consultarnumero (numeroDocumento){
    if (!numeroDocumento){
        return false  
    }
    const numeroAleatorio = Math.random()
    return numeroAleatorio > 0.5
}

function gerarNumeroConta(){
    return Math.floor(Math.random() * (100000 - 10000) + 10000)
}

function obterTipoCartao(rendamensal) {
    return rendamensal < 10000 ? "STANDART" : "BLACK"

}

function converterparareal(valor, moeda){
    const COTACAO = {
        EUR: 5.60, 
        DOL: 5,

    }
    return Number((valor * COTACAO[moeda]).toFixed(2))
}
