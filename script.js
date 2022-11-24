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
const button = document.querySelector('.login-button');
const form = document.querySelector('.login-form');

const inputPassword = document.querySelector('#id-password');
const inputName = document.querySelector('#id-name');
const dataHora = document.querySelector('#data-hora');

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

    /*
    dados.name = inputName.value;
    dados.password = inputPassword.value;
    dados.date = dataHora.innerHTML;*/

    if (localStorage.hasOwnProperty("registroponto")) {
        dados = JSON.parse(localStorage.getItem("registroponto"));
        if (dados.name == inputName.value) {
            if (dados.password == inputPassword.value) {
                console.log("Achou")
            } else {
                console.log("Senha para o úsuario incorreta!");
            }
        }
    } else {
        dados.type = "entrada";
        dados.name = inputName.value;
        dados.password = inputPassword.value;
    }

    /* Adiciona um novo valor no array criado */
    //dados.push({date: dataHora.innerHTML})
    dados.date = dataHora.innerHTML;

    if (dados.type == "saida") {
        
    }

    /* Salva o item */
    localStorage.setItem("registroponto", JSON.stringify(dados))      
    
    /* Redireciona o usuario para a pagina principal do jogo */
    //window.location = 'pages/game.html'

    // Mostra o modal
    modal.style.display = 'block';
}

console.log(new Date());
//console.log(Date.parse(new Date()) - 1669309896000);
console.log(new Date(1669309896000))
console.log((Date.parse(new Date()) - 1669309896000)/60000);

/*Thu Nov 24 2022 14:11:36 GMT-0300 (Horário Padrão de Brasília)
1669309896000*/

/* Executa a função abaixo toda vez que algo for digitado no input através da função 'input'
Esse eventListener chama a função declarada na constante validateInput */
input.addEventListener('input', validateInput);

/* Executa a função abaixo toda vez que o form receber dados pelo 'submit*/
form.addEventListener('submit', handleSubmit);


// Modal

const modal = document.querySelector('.modal');
const modalText = document.querySelector('.modal h2');
const modalButton = document.querySelector('.modal button');

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

    dataFormat = vdia + " / " + vmes + " / " + vano;
    horaFormat = vhora + " : " + vminuto + " : " + vsegundo;

    dataHora.innerHTML = dataFormat + " - " + horaFormat;
    //document.getElementById("data").innerHTML = dataFormat;
    //document.getElementById("hora").innerHTML = horaFormat;

    setTimeout("atualizaRelogio()",1000);
}