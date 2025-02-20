const input = document.getElementById("input-number");
const btnShow = document.getElementById("btn-show");
const btnReset = document.getElementById("btn-reset");
const result = document.getElementById("result");
const triesQtd = document.getElementById("tries-qtd");

const maxTries = 5;
let tries = 0;
triesQtd.innerText = "0";
btnReset.style.display = "none"; // Esconde o botão RESET no início

let secretNumber = randomNumber(); // Gera um número aleatório ao iniciar o jogo

function randomNumber() {
  return Math.floor(Math.random() * 50) + 1;
}

function reset() {
  input.value = "";
  input.focus();
  btnShow.disabled = false;
  result.innerText = "";
  tries = 0;
  triesQtd.innerText = "0";
  btnReset.style.display = "none"; // Esconde o botão RESET
  secretNumber = randomNumber(); // Gera um novo número secreto ao reiniciar
  input.disabled = false; // Abilita o input quando atingir o limite de tentativas
  input.placeholder = "Escreva seu número";
  // Restaurando o tamanho da fonte e line-height
  updatePlaceholderStyles("2rem"); // Restaura o placeholder
  input.focus(); // 🔥 Mantém o cursor no campo input
  console.log("Novo número secreto:", secretNumber); // Para debug
}

function updateResultText(text, color, fontSize, shadow = "none") {
  result.innerText = text;
  result.style.color = color;
  result.style.fontSize = fontSize;
  result.style.textShadow = shadow; //coloca uma borda / sombra no texto
}

function updatePlaceholderStyles(size, lineHeight = "4rem") {
  input.style.setProperty("--placeholder-font-size", size);
  input.style.lineHeight = lineHeight;
}

function finalResult() {
  const myNumber = parseInt(input.value);
  console.log("Novo número secreto:", secretNumber); // Para debug

  if (isNaN(myNumber) || myNumber < 1 || myNumber > 50) {
    updateResultText(
      "⚠️ Por favor, digite um número entre 1 e 50!",
      "#ffff00",
      "2.3rem"
    );
    input.value = "";
    input.focus(); // 🔥 Mantém o cursor no campo input
    return;
  }

  tries++;
  triesQtd.innerText = `${tries}`;

  if (myNumber === secretNumber) {
    updateResultText(
      `🎉 Você GANHOU! O número correto é ${secretNumber}!`,
      "#00FF00",
      "2.3rem",
      "0 0 10px rgba(0, 255, 0, 0.5)" // Sombra verde
    );
    btnShow.disabled = true;
    btnReset.style.display = "block"; // Mostra o botão RESET
    return;
  } else {
    const hint = myNumber > secretNumber ? "MENOR" : "MAIOR"; // Define a dica
    updateResultText(
      `❌ ERROU! O número secreto é ${hint} que ${myNumber}`, // Mensagem com dica
      "#ff0000",
      "2.3rem",
      "0.2rem 0.2rem 0.2rem #000000"
    );
    input.focus(); // 🔥 Mantém o cursor no campo input
  }

  if (tries >= maxTries) {
    updateResultText(
      `😞 Que pena! Você atingiu o limite de tentativas. O número correto era ${secretNumber}.`,
      "#fff8e7",
      "2.3rem"
    );
    btnShow.disabled = true;
    btnReset.style.display = "block"; // Exibe o botão RESET
    input.disabled = true; // Desabilita o input quando atingir o limite de tentativas
    input.placeholder = "Fim de jogo! Tente novamente"; // Mudando o texto do placeholder
    updatePlaceholderStyles("1.3rem", "4rem");
  }

  input.value = "";
  input.focus(); // 🔥 Mantém o cursor no campo input
}

btnShow.addEventListener("click", finalResult);
btnReset.addEventListener("click", reset);
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    finalResult();
  }
});
