const dolar = 6.3;

let usdInput = document.querySelector("#usd");
let brlInput = document.querySelector("#brl");

// Atualiza o valor formatado no campo ao sair do foco 
usdInput.addEventListener("blur", () => {
    convert("usd-to-brl");
    usdInput.value = formatCurrency(usdInput.value)
});

brlInput.addEventListener("blur", () => {
    convert("brl-to-usd");
    brlInput.value = formatCurrency(brlInput.value)
});

// Define o valor inicial
usdInput.value = "1000,00";

convert("usd-to-brl");

// Funções
function formatCurrency(value) {
    let fixedValue = fixValue(value);
    let options = {
        useGrouping: false,
        minimumFractionDigits: 2,
    };
    let formatter = new Intl.NumberFormat("pt-BR", options);

    return formatter.format(fixedValue);
}

function fixValue(value) {
    // Corrige para aceitar valores com vírgula ou ponto como separadores decimais
    let fixedValue = value.replace(",", ".");
    let floatValue = parseFloat(fixedValue);

    // Garante que valores inválidos retornem 0
    if (isNaN(floatValue)) {
        floatValue = 0;
    }
    return floatValue;
}


function convert(type){
    if(type == "usd-to-brl"){
        let fixedValue = fixValue(usdInput.value);

        let result = fixedValue * dolar;
        result = result.toFixed(2);

        brlInput.value = formatCurrency(result);
    }

    if(type == "brl-to-usd"){
        let fixedValue = fixValue(brlInput.value);

        let result = fixedValue / dolar;
        result = result.toFixed(2);

        usdInput.value = formatCurrency(result);
    }
}