# Alvo Rápido

**Nome completo:** Emilly Tainá da Silva Alves

## Mecânica escolhida e tema

Escolhi a mecânica Acerte a Toupeira. No meu tema, a toupeira foi substituída por um alvo, mantendo a mesma lógica, clicar no elemento que aparece aleatoriamente na grade.

## Briefing do cliente

O público-alvo escolhido foi criança de 6 anos. Por isso, o jogo tem botões grandes, partida curta, textos simples e regras fáceis de entender.

## Regras do jogo

1. O jogador digita o nome e aperta JOGAR.
2. Um alvo aparece em um lugar aleatório da grade.
3. Clicar no alvo comum vale 10 pontos.
4. Clicar no alvo bônus vale 25 pontos.
5. Clicar no lugar errado perde 5 pontos e 1 vida.
6. O jogo termina quando o tempo acaba ou quando as vidas acabam.
7. No fim aparecem o nome do jogador, a pontuação final e a opção de jogar novamente.

## Minhas Decisões

1. Tamanho e formato do grid: escolhi uma grade 4x4, porque é simples de visualizar e ainda cria um desafio.
2. Quantidade de cores/elementos: usei dois tipos de alvo: comum e bônus. Assim, a regra continua fácil.
3. Fórmula de pontuação: o alvo comum vale 10 pontos, o alvo bônus vale 25 pontos e o erro tira 5 pontos.
4. Critérios de tempo: a partida dura 40 segundos, um tempo curto para o jogador tentar mais de uma vez.
5. Curva de dificuldade: o alvo muda de lugar a cada 1,3 segundo, deixando o jogo mais rápido sem ficar impossível.
6. Condição de término: o jogo termina quando o tempo chega a zero ou quando o jogador perde as 3 vidas.

## Seu diferencial

Meu diferencial foi o alvo bônus. Ele aparece algumas vezes no lugar do alvo comum e vale mais pontos.

Acontece na função `sortearNovoAlvo()`. Ela usa `Math.random()` para decidir se o alvo será comum ou bônus. Depois, cria a imagem com `document.createElement("img")` e coloca no botão sorteado.

## Como jogar

Digite seu nome, aperte JOGAR e clique no alvo sempre que ele aparecer. Evite clicar em espaços vazios, porque isso tira pontos e vidas.

## Como executar

Abra o arquivo `index.html` no navegador. O projeto usa apenas HTML, CSS e JavaScript puro.

## Reflexão

1. Qual foi o bug mais chato e como resolveu? 
O bug mais chato foi limpar o alvo antigo antes de mostrar o novo. Resolvi criando a função `limparBuracos()`, que remove imagens antigas e devolve todos os botões para o estado vazio.

2. Por que escolheu essa fórmula de pontuação? 
Escolhi 10 pontos para o alvo comum porque é fácil de calcular. O bônus vale 25 para dar uma recompensa maior, e o erro perde 5 para ter consequência sem desanimar.

3. Como o briefing do cliente mudou suas decisões?
Como pensei em uma criança de 6 anos, usei grade simples, botões grandes, pouco texto e uma partida curta.

4. Se tivesse mais uma semana, o que mudaria?
Eu colocaria sons, uma tela com ranking e talvez fases com velocidades diferentes.

5. Aponte uma função sua que ficou boa e explique o que ela faz. 
A função `sortearNovoAlvo()` ficou boa porque é onde fica a regra principal do jogo. Limpa a grade, sorteia uma posição, decide se o alvo será bônus e coloca a imagem no botão certo.

## Diário de desenvolvimento

- Primeiro escolhi a mecânica e o público-alvo.
- Depois defini a grade 4x4 e a pontuação.
- Criei os elementos da grade pelo DOM, sem usar `innerHTML`.
- Separei o código em funções pequenas para facilitar a explicação.
- Testei o fim do jogo por tempo e por vidas.

## Créditos

- MDN Web Docs: usei como referência para entender eventos, `setInterval`, `dataset` e manipulação do DOM.
- Atividade #09: usei como base para seguir as regras obrigatórias do projeto.
- Imagens SVG dos alvos: foram criadas para esta atividade.

## Declaração de uso de IA

Usei IA como apoio para organizar a estrutura do projeto, revisar os requisitos da atividade e entender melhor como separar as funções do JavaScript.

## Licença

Este projeto está sob a licença MIT.