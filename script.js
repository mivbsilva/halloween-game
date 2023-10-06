const minutosElemt = document.getElementById('minutos');
const segundosElemt = document.getElementById('segundos');
const milissegundosElemt = document.getElementById('milissegundos');
const iniciarElemt = document.getElementById('botao');
const jogo = document.querySelector('.jogo-oculto');
let iniciar = false;
let intervalo;
//função que inclui imagens como vetor nas divs
function exibeImagens() {
    const cardsIniciais = document.querySelectorAll('.cardInicial');

    let imagens = [
        './img/alien.png',
        './img/chucky.png',
        './img/frankenstein.png',
        './img/fred.png',
        './img/freira.png',
        './img/ghostface.png',
        './img/hannibal.png',
        './img/iluminado.png',
        './img/it.png',
        './img/jason.png',
        './img/jigsaw.png',
        './img/leatherface.png',
        './img/michael.png',
        './img/ogrito.png',
        './img/pinhead.png'
    ]

    if (cardsIniciais.length === imagens.length) {
        cardsIniciais.forEach((card, i) => {
            const imagem = document.createElement('img');
            imagem.setAttribute('src', imagens[i]);
            card.appendChild(imagem);
        })
    }
}

//função que inclui imagens embaralhadas como vetor nas divs
function exibeImagensEmbaralhadas() {
    const cardsFinais = document.querySelectorAll('.cardFinal');
    let imagensEmbaralhadas = [
        './img/fred.png',
        './img/hannibal.png',
        './img/predador.png',
        './img/ghostface.png',
        './img/ogrito.png',
        './img/samara.png',
        './img/it.png',
        './img/alien.png',
        './img/jason.png',
        './img/thefisherman.png',
        './img/chucky.png',
        './img/us.png',
        './img/pinhead.png',
        './img/leatherface.png',
        './img/frankenstein.png'
    ]

    if (cardsFinais.length === imagensEmbaralhadas.length) {
        cardsFinais.forEach((card, i) => {
            const imagem = document.createElement('img');
            imagem.setAttribute('src', imagensEmbaralhadas[i]);
            card.appendChild(imagem);
        })
    }

    if (jogo.classList.contains('jogo-oculto')) {
        jogo.classList.replace('jogo-oculto', 'jogo');
    }
}

//funcionamento cronometro e, junto dele, incluí o display none na div do jogo

iniciarElemt.addEventListener('click', comecaTimer);
function comecaTimer() {
    exibeImagens();
    if (!iniciar) {
        iniciar = true;
        let minutos = 0;
        let segundos = 3;
        let milissegundos = 0;

        intervalo = setInterval(() => {
            if (minutos === 0 && segundos === 0 && milissegundos === 0) {
                clearInterval(intervalo);
                iniciar = false;
                if (jogo.classList.contains('jogo')) {
                    jogo.classList.replace('jogo', 'jogo-oculto');
                }
                iniciarElemt.classList.add('botao-oculto');
                const botaoEmbaralhar = document.createElement('button');
                botaoEmbaralhar.setAttribute('id', 'botao');
                botaoEmbaralhar.innerText = 'Embaralhar!';
                const controle = document.querySelector('.controle');
                controle.appendChild(botaoEmbaralhar);
                const cards = document.querySelectorAll('.cardInicial');
                cards.forEach((card) => {
                    if (card.classList.contains('cardInicial')) {
                        card.classList.replace('cardInicial', 'cardFinal');
                    }
                });
                botaoEmbaralhar.addEventListener('click', exibeImagensEmbaralhadas);
                return;
            }

            if (jogo.classList.contains('jogo-oculto')) {
                jogo.classList.replace('jogo-oculto', 'jogo');
            }

            if (milissegundos === 0) {
                if (segundos === 0) {
                    minutos--;
                    segundos = 2;
                } else {
                    segundos--;
                }
                milissegundos = 990;
            } else {
                milissegundos -= 10;
            }

            minutosElemt.textContent = minutos;
            segundosElemt.textContent = segundos;
            milissegundosElemt.textContent = milissegundos;
        }, 10);
    }
}