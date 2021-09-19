let seuVotoPara = document.querySelector('.divisao-1-title span');
let cargo = document.querySelector('.divisao-1-cargo span');
let descricao = document.querySelector('.divisao-1-info');
let aviso = document.querySelector('.divisao-2');
let divisaoRight = document.querySelector('.divisao-1-right');
let numeros = document.querySelector('.divisao-1-digitos');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function comecarEtapa() {

    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numeros pisca"></div>';

        } else {
            numeroHtml += '<div class="numeros"></div>';
        }

    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    divisaoRight.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];

    let candidato = etapa.candidatos.filter((item) => {
        return item.numero === numero;
    });

    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome} <br> Partido: ${candidato.partido}`;
        aviso.style.display = 'block';

        let fotosHtml = '';
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="divisao-1-candidato-image vice"><img src="./images/${candidato.fotos[i].url}" alt="${candidato.fotos[i].legenda}">${candidato.nome}</div>`;
            } else {
                fotosHtml += `<div class="divisao-1-candidato-image"><img src="./images/${candidato.fotos[i].url}" alt="${candidato.fotos[i].legenda}">${candidato.nome}</div>`;
            }

        }
        divisaoRight.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }

}

function clicou(itemNumero) {
    let numeroPiscando = document.querySelector('.numeros.pisca');
    if (numeroPiscando !== null) {
        numeroPiscando.innerHTML = itemNumero;
        numero = `${numero}${itemNumero}`;

        numeroPiscando.classList.remove('pisca');
        if (numeroPiscando.nextElementSibling !== null) {
            numeroPiscando.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }

    }
}

function branco() {
    if (numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    } else {
        alert('Para digitar em BRACO, não pode ter digitado nenhum número!!')
    }
}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if (votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if (votoConfirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM!!!</div>';
            console.log(votos)
        }
    }
}

comecarEtapa();