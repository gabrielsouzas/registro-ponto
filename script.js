/* Menu */
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

// Evento clique no menu
menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Evento rolagem da tela que esconde o menu
window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/* Login */

const input = document.querySelector('.login-input');
const button = document.querySelector('#login-button');
const form = document.querySelector('.login-form');

const inputPassword = document.querySelector('#id-password');
const inputName = document.querySelector('#id-name');
const dataHora = document.querySelector('#data-hora');

// DOM Modal
const modal = document.querySelector('.modal');
const modalText = document.querySelector('.modal h2');
const modalSpan = document.querySelector('.modal span');
const modalButton = document.querySelector('.modal button');
var modalEvent = "";

/* Pega o target através da desestruturação de objeto, que veio do event*/
const validateInput = ({target}) => {
    if (target.value.length > 2) {
        /* Remove o atributo disabled para habilitar o botão*/
        button.removeAttribute('disabled');
        return;
    }
    button.setAttribute('disabled', '')
}


const handleSubmit = (event) => {
    /* Evita o funcionamento default, que no caso seria o de recarregamento da tela */
    event.preventDefault();

    var currentDate = new Date();

    /* O browser possui uma ferramenta chamada Local Storage, que armazena dados da sessão, através dessa ferramenta será possivel armazenar os dados informados pelo usuário*/

    /* Pega o que o usuario digitou e salva no Local Storage pelo método localStorage.setItem(), que precisa de dois parâmetros, o primeiro é a chave do valor que será salvo e o segundo é o proprio valor*/
    //localStorage.setItem('userpass', inputName.value + ':' + inputPassword.value);
    
    let dados = {
        name: "",
        password: "",
        date: "",
        type: "",
        hours: ""
    }

    if (localStorage.hasOwnProperty("registroponto")) {
        dados = JSON.parse(localStorage.getItem("registroponto"));
        
        if (dados.name == inputName.value) {
            if (dados.password == inputPassword.value) {
                
                if (dados.type == "entrada") {
                    var timeTrab = (Date.parse(currentDate)) - 
                                   (Date.parse(new Date(dados.date)));

                    //console.log(timeTrab);
                    //console.log(millisToHoursMinutesAndSeconds(timeTrab));
                    dados.hours = dados.hours + timeTrab;

                    dados.date = currentDate;

                    dados.type = "saida";

                    modalText.innerHTML = "Saída";
                } else {
                    dados.date = currentDate;

                    dados.type = "entrada";

                    modalText.innerHTML = "Entrada";
                }

            } else {
                alert("Senha para o úsuario incorreta!");
            }
        }
    } else {
        dados.type = "entrada";
        dados.name = inputName.value;
        dados.password = inputPassword.value;
        dados.date = currentDate;
        dados.hours = 0;

        modalText.innerHTML = "Entrada";
    }

    /* Salva o item */
    localStorage.setItem("registroponto", JSON.stringify(dados))      

    // Mostra o modal
    modalSpan.innerHTML = "Total de horas: " + convertMsToTime(dados.hours);
    modal.style.display = 'block';
}


//console.log(changeTimeZone(new Date(), 'America/Sao_Paulo'))
//console.log(Date.parse(new Date()));
//console.log(new Date(""));

/*console.log(new Date(1669309896000))
console.log(millisToMinutesAndSeconds(Date.parse(new Date("Thu Nov 24 2022 15:30:38 GMT-0300")) - 1669309896000));*/

// Função que coloca dois digitos
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
// Outra função que coloca dois digitos
function twoDigitsTime(time) {
    return (time < 10 ? '0' : '') + time;
}
  
// Função que converte Milissegundos para Tempo
function convertMsToTime(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
  
    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;
  
    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
      seconds,
    )}`;
}

/* Executa a função abaixo toda vez que algo for digitado no input através da função 'input'
Esse eventListener chama a função declarada na constante validateInput */
input.addEventListener('input', validateInput);

/* Executa a função abaixo toda vez que o form receber dados pelo 'submit*/
form.addEventListener('submit', handleSubmit);


// Modal

function clicouOk() {
    modal.style.display = 'none';
}

atualizaRelogio();

/* Data e Hora atuais */
function atualizaRelogio(){ 
    var momentoAtual = new Date();
    
    var vhora = momentoAtual.getHours();
    var vminuto = momentoAtual.getMinutes();
    var vsegundo = momentoAtual.getSeconds();
    
    var vdia = momentoAtual.getDate();
    var vmes = momentoAtual.getMonth() + 1;
    var vano = momentoAtual.getFullYear();
    
    if (vdia < 10){ vdia = "0" + vdia;}
    if (vmes < 10){ vmes = "0" + vmes;}
    if (vhora < 10){ vhora = "0" + vhora;}
    if (vminuto < 10){ vminuto = "0" + vminuto;}
    if (vsegundo < 10){ vsegundo = "0" + vsegundo;}

    dataFormat = vdia + "/" + vmes + "/" + vano;
    horaFormat = vhora + " : " + vminuto + " : " + vsegundo;

    dataHora.innerHTML = dataFormat + " - " + horaFormat;
    //document.getElementById("data").innerHTML = dataFormat;
    //document.getElementById("hora").innerHTML = horaFormat;

    setTimeout("atualizaRelogio()",1000);
}

/* Botões limpar e imprimir horas */

const resetButton = document.querySelector('#reset-button');
const printButton = document.querySelector('#print-button');

resetButton.addEventListener('click', () => {
    
    // Verifica se exite o registro no localStorage
    if (localStorage.hasOwnProperty("registroponto")) {
        dados = JSON.parse(localStorage.getItem("registroponto"));
        
        // Verifica as credenciais
        if (dados.name == inputName.value) {
            if (dados.password == inputPassword.value) {
                // Mostra o modal
                modalSpan.innerHTML = "Confirma a exclusão?";
                modalButton.innerHTML = "Sim";
                modal.style.display = 'block';
                modalEvent = "excluir";
            } else {
                // Mostra o modal
                modalSpan.innerHTML = "Senha para o úsuario incorreta!";
                modalButton.innerHTML = "OK";
                modal.style.display = 'block';
            }
        } else {
            // Mostra o modal
            modalSpan.innerHTML = "Usuário não encontrado!";
            modalButton.innerHTML = "OK";
            modal.style.display = 'block';
        }
    } else {
        // Mostra o modal
        modalSpan.innerHTML = "Registro de horas não encontrado!";
        modalButton.innerHTML = "OK";
        modal.style.display = 'block';
        
    }
});

modalButton.addEventListener('click', () => {
    if (modalEvent == "excluir") {
        // Exclui
        localStorage.removeItem("registroponto");
        modal.style.display = 'none';
        modalEvent = "";
    }
})

