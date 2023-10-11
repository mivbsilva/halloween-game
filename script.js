const minutosElemt = document.getElementById('minutos');
const segundosElemt = document.getElementById('segundos');
const milissegundosElemt = document.getElementById('milissegundos');
const iniciarElemt = document.querySelector('.botao');
const jogo = document.querySelector('.jogo-oculto');
const divResultado = document.querySelector('.resultado-oculto');
const botaoReset = document.createElement('button');
const controle = document.querySelector('.controle');
const gridJogo = document.querySelector('.jogo');


//função que inclui imagens como vetor nas divs
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
];

function exibeImagens(){
    const cardsIniciais = document.querySelectorAll('.cardInicial');    
    if(cardsIniciais.length === imagens.length){
        cardsIniciais.forEach((card, i) => {
            const imagem = document.createElement('img');
            imagem.setAttribute('src', imagens[i]);
            card.appendChild(imagem);
        });
    };
};

//função que atualiza os atributos src das imagens com base no novo array de imagens
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
];

function chamaImagensEmbaralhadas(){
    const cardsFinais = document.querySelectorAll('.cardFinal');
    
    if(cardsFinais.length === imagensEmbaralhadas.length){
        cardsFinais.forEach((card, i) => {
            const imagem = card.querySelector('img');
            imagem.setAttribute('src', imagensEmbaralhadas[i]);
        });
    };

    if(jogo.classList.contains('jogo-oculto')){
        jogo.classList.replace('jogo-oculto', 'jogo');
    };
};

function ocultaJogo(){
    if(jogo.classList.contains('jogo')){
        jogo.classList.replace('jogo', 'jogo-oculto');
    };
};

function desocultaJogo(){
    if(jogo.classList.contains('jogo-oculto')){
        jogo.classList.replace('jogo-oculto', 'jogo');
    };
};

//função que recomeça o jogo
function reiniciarJogo(){
    const f5 = document.createElement('a');
    f5.setAttribute('href', 'index.html');
    f5.setAttribute('class', 'link-botao-restart');
    f5.innerText = 'Recomecar';
    botaoReset.appendChild(f5);
}

//funcionamento cronometro e jogo
iniciarElemt.addEventListener('click', comecaTimer);
let iniciar = false;
let intervalo;

function comecaTimer(){
    exibeImagens();
    if(!iniciar){
        iniciar = true;
        let minutos = 0;
        let segundos = 2;
        let milissegundos = 0;

        intervalo = setInterval(() => {
            if(minutos === 0 && segundos === 0 && milissegundos === 0){
                clearInterval(intervalo);
                iniciar = false;

                ocultaJogo();

                iniciarElemt.classList.add('botao-oculto');
                const botaoEmbaralhar = document.createElement('button');
                botaoEmbaralhar.setAttribute('class', 'botao');
                botaoEmbaralhar.innerText = 'Embaralhar';
                controle.appendChild(botaoEmbaralhar);
                const cards = document.querySelectorAll('.cardInicial');
                cards.forEach((card) => {
                    if(card.classList.contains('cardInicial')){
                        card.classList.replace('cardInicial', 'cardFinal');
                    };
                });

                botaoEmbaralhar.addEventListener('click', chamaImagensEmbaralhadas);
                const personagens = document.querySelectorAll('.cardFinal');
                qtdImagens = imagensEmbaralhadas.length;

                personagens.forEach((elemento, i) => {
                    elemento.addEventListener('click', event => {
                        const imagem = elemento.querySelector('img');
                        const src = imagem.getAttribute('src');
                        if(src !== './img/predador.png' && src !== './img/samara.png' && src !== './img/thefisherman.png' && src !== './img/us.png'){
                            elemento.remove();
                            qtdImagens--;
                            console.log(qtdImagens);
                            if(qtdImagens == 4){
                                
                                jogo.innerHTML = '';
                                jogo.classList.replace('jogo', 'jogo-block');
                                const textoGanhou = document.createElement('p');
                                textoGanhou.setAttribute('class', 'estilo-resultado');    
                                textoGanhou.innerText = 'Você ganhou!';
                                jogo.appendChild(textoGanhou);
                                botaoEmbaralhar.classList.add('botao-oculto');
                                botaoReset.setAttribute('class', 'botao');
                                controle.appendChild(botaoReset);
                                reiniciarJogo();
                            };
                        }else{
                            jogo.innerHTML = '';
                            jogo.classList.replace('jogo', 'jogo-block');
                            const textoGameOver = document.createElement('p');
                            textoGameOver.setAttribute('class', 'estilo-resultado');    
                            textoGameOver.innerText = 'Game Over!';
                            jogo.appendChild(textoGameOver);
                            botaoEmbaralhar.classList.add('botao-oculto');
                            botaoReset.setAttribute('class', 'botao');
                            controle.appendChild(botaoReset);
                            reiniciarJogo();                            
                        }
                    });
                });
                return;
            };

            desocultaJogo();

            if(milissegundos === 0){
                if(segundos === 0){
                    minutos--;
                    segundos = 1;
                }else{
                    segundos--;
                };

                milissegundos = 990;
            }else{
                milissegundos -= 10;
            };

            minutosElemt.textContent = minutos;
            segundosElemt.textContent = segundos;
            milissegundosElemt.textContent = milissegundos;
        }, 10);
    };
};