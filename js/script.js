const estado = 
{
  jogador: "",
  pontos: 0,
  tempo: 40,
  acertos: 0,
  vidas: 3,
  alvoAtual: -1,
  bonusAtual: false,
  jogando: false,
  intervaloTempo: null,
  intervaloAlvo: null
};

const elementos = {};

document.addEventListener("DOMContentLoaded", prepararPagina);

function prepararPagina() 
{
  guardarElementos();
  criarGrade();
  configurarEventos();
  atualizarPlacar();
}

function guardarElementos() 
{
  elementos.form = document.querySelector("#form-jogador");
  elementos.nome = document.querySelector("#nome-jogador");
  elementos.grade = document.querySelector("#grade");
  elementos.mensagem = document.querySelector("#mensagem");
  elementos.pontuacao = document.querySelector("#pontuacao");
  elementos.tempo = document.querySelector("#tempo");
  elementos.acertos = document.querySelector("#acertos");
  elementos.vidas = document.querySelector("#vidas");
  elementos.resultado = document.querySelector("#resultado");
  elementos.tituloResultado = document.querySelector("#titulo-resultado");
  elementos.textoResultado = document.querySelector("#texto-resultado");
  elementos.botaoReiniciar = document.querySelector("#botao-reiniciar");
}

function configurarEventos() 
{
  elementos.form.addEventListener("submit", iniciarJogo);
  elementos.botaoReiniciar.addEventListener("click", reiniciarJogo);
}

function criarGrade() 
{
  limparGrade();

  for (let posicao = 0; posicao < 16; posicao += 1) 
  {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "buraco vazio";
    botao.dataset.posicao = posicao;
    botao.setAttribute("aria-label", "Espaco vazio");
    botao.addEventListener("click", verificarClique);
    elementos.grade.appendChild(botao);
  }
}

function iniciarJogo(evento) 
{
  evento.preventDefault();

  const nome = elementos.nome.value.trim();

  if (nome === "") {
    trocarMensagem("Digite seu nome para comecar.");
    elementos.nome.focus();
    return;
  }

  estado.jogador = nome;
  estado.pontos = 0;
  estado.tempo = 40;
  estado.acertos = 0;
  estado.vidas = 3;
  estado.jogando = true;
  elementos.resultado.hidden = true;
  elementos.nome.disabled = true;
  elementos.form.querySelector("button").disabled = true;

  atualizarPlacar();
  sortearNovoAlvo();
  trocarMensagem("Clique no alvo. O alvo dourado vale mais pontos.");

  estado.intervaloTempo = setInterval(diminuirTempo, 1000);
  estado.intervaloAlvo = setInterval(sortearNovoAlvo, 1300);
}

function verificarClique(evento) 
{
  if (!estado.jogando) {
    return;
  }

  const botao = evento.currentTarget;
  const posicaoClicada = Number(botao.dataset.posicao);

  if (posicaoClicada === estado.alvoAtual) 
  {
    registrarAcerto(botao);
    return;
  }

  registrarErro(botao);
}

function registrarAcerto(botao) 
{
  const pontosGanhos = estado.bonusAtual ? 25 : 10;
  estado.pontos += pontosGanhos;
  estado.acertos += 1;
  botao.classList.add("acerto");

  // Eu coloquei o alvo bonus para criar uma regra propria sem complicar o jogo.
  trocarMensagem("Acertou! +" + pontosGanhos + " pontos.");
  atualizarPlacar();
  sortearNovoAlvo();
}

function registrarErro(botao) 
{
  estado.pontos = Math.max(0, estado.pontos - 5);
  estado.vidas -= 1;
  botao.classList.add("erro");
  trocarMensagem("Errou. Voce perdeu 5 pontos e 1 vida.");
  atualizarPlacar();

  if (estado.vidas <= 0) {
    finalizarJogo("Suas vidas acabaram.");
  }
}

function diminuirTempo()
 {
  estado.tempo -= 1;
  atualizarPlacar();

  if (estado.tempo <= 0) {
    finalizarJogo("O tempo acabou.");
  }
}

function sortearNovoAlvo() 
{
  if (!estado.jogando) {
    return;
  }

  limparBuracos();
  estado.alvoAtual = Math.floor(Math.random() * 16);
  estado.bonusAtual = Math.random() < 0.25;

  const buraco = elementos.grade.children[estado.alvoAtual];
  const imagem = document.createElement("img");
  imagem.src = estado.bonusAtual ? "images/alvo-bonus.svg" : "images/alvo-normal.svg";
  imagem.alt = estado.bonusAtual ? "Alvo bonus" : "Alvo comum";

  // Eu crio a imagem pelo DOM para cumprir a regra de nao montar a tela com HTML pronto.
  buraco.classList.remove("vazio");
  buraco.setAttribute("aria-label", imagem.alt);
  buraco.appendChild(imagem);
}

function limparBuracos()
 {
  const buracos = elementos.grade.querySelectorAll(".buraco");

  buracos.forEach(function limpar(buraco) {
    buraco.className = "buraco vazio";
    buraco.setAttribute("aria-label", "Espaco vazio");

    while (buraco.firstChild) {
      buraco.removeChild(buraco.firstChild);
    }
  });
}

function limparGrade() 
{
  while (elementos.grade.firstChild) 
    {
    elementos.grade.removeChild(elementos.grade.firstChild);
  }
}

function atualizarPlacar() 
{
  elementos.pontuacao.textContent = estado.pontos;
  elementos.tempo.textContent = estado.tempo;
  elementos.acertos.textContent = estado.acertos;
  elementos.vidas.textContent = estado.vidas;
}

function trocarMensagem(texto) 
{
  elementos.mensagem.textContent = texto;
}

function finalizarJogo(motivo) 
{
  estado.jogando = false;
  clearInterval(estado.intervaloTempo);
  clearInterval(estado.intervaloAlvo);
  limparBuracos();

  elementos.nome.disabled = false;
  elementos.form.querySelector("button").disabled = false;
  elementos.tituloResultado.textContent = "Resultado de " + estado.jogador;
  elementos.textoResultado.textContent = motivo + " Pontuacao final: " + estado.pontos + " pontos.";
  elementos.resultado.hidden = false;
}

function reiniciarJogo() 
{
  elementos.resultado.hidden = true;
  iniciarJogo(new Event("submit"));
}
