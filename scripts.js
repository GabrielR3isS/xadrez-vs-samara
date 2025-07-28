document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("nameModal");
  const continueBtn = document.getElementById("continueBtn");
  const playerNameInput = document.getElementById("playerName");
  const gameBoard = document.getElementById("gameBoard");
  const turnIndicator = document.getElementById("turnIndicator");
  const board = document.getElementById("board");

  let selectedPiece = null;
  let currentPlayer = "P1";

  // Cria o tabuleiro
  function createBoard() {
    board.innerHTML = "";
    for (let i = 0; i < 64; i++) {
      const square = document.createElement("div");
      square.className = "square";
      square.dataset.index = i;
      if (i < 8) square.textContent = "P1";
      if (i >= 56) square.textContent = "P2";
      board.appendChild(square);
    }
  }

  // Atualiza o painel de turno
  function updateTurnIndicator() {
    turnIndicator.textContent = `Vez do jogador: ${currentPlayer}`;
  }

  // Alterna turno
  function switchTurn() {
    currentPlayer = currentPlayer === "P1" ? "P2" : "P1";
    updateTurnIndicator();
  }

  // Movimenta peça
  function movePiece(from, to) {
    const fromSquare = document.querySelector(`.square[data-index="${from}"]`);
    const toSquare = document.querySelector(`.square[data-index="${to}"]`);
    if (fromSquare.textContent === currentPlayer && toSquare.textContent === "") {
      toSquare.textContent = fromSquare.textContent;
      fromSquare.textContent = "";
      switchTurn();
    }
  }

  // Lógica de clique
  board.addEventListener("click", (e) => {
    if (!e.target.classList.contains("square")) return;

    const index = parseInt(e.target.dataset.index);

    if (selectedPiece === null) {
      if (e.target.textContent === currentPlayer) {
        selectedPiece = index;
        e.target.classList.add("selected");
      }
    } else {
      document.querySelector(`.square[data-index="${selectedPiece}"]`).classList.remove("selected");
      movePiece(selectedPiece, index);
      selectedPiece = null;
    }
  });

  // Botão Continuar
  continueBtn.addEventListener("click", () => {
    const name = playerNameInput.value.trim();
    if (name !== "") {
      modal.classList.add("hidden");
      gameBoard.classList.remove("hidden");
      createBoard();
      updateTurnIndicator();
    }
  });
});
