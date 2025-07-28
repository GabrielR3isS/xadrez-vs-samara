let selectedPiece = null;
let selectedIndex = null;
let currentTurn = 'white';

const board = document.getElementById('board');
const turnIndicator = document.getElementById('turn-indicator');
const messageBox = document.getElementById('message-box');
const messageText = document.getElementById('message-text');
const continueButton = document.getElementById('continue-button');

const pieces = [
  "♜","♞","♝","♛","♚","♝","♞","♜",
  "♟","♟","♟","♟","♟","♟","♟","♟",
  "","","","","","","","",
  "","","","","","","","",
  "","","","","","","","",
  "","","","","","","","",
  "♙","♙","♙","♙","♙","♙","♙","♙",
  "♖","♘","♗","♕","♔","♗","♘","♖"
];

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 64; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.classList.add((Math.floor(i / 8) + i) % 2 === 0 ? 'white' : 'black');
    square.dataset.index = i;
    square.innerHTML = pieces[i];
    board.appendChild(square);
  }
}

function handleSquareClick(e) {
  const square = e.target;
  if (!square.classList.contains('square')) return;

  const index = parseInt(square.dataset.index);
  const piece = pieces[index];

  if (selectedPiece === null) {
    if (
      (currentTurn === 'white' && "♙♖♘♗♕♔".includes(piece)) ||
      (currentTurn === 'black' && "♟♜♞♝♛♚".includes(piece))
    ) {
      selectedPiece = piece;
      selectedIndex = index;
      square.style.border = '2px solid yellow';
    }
  } else {
    movePiece(selectedIndex, index);
    selectedPiece = null;
    selectedIndex = null;
    resetBorders();
    updateTurnIndicator();
  }
}

function movePiece(from, to) {
  pieces[to] = pieces[from];
  pieces[from] = "";
  createBoard();
  triggerScareMessage();
  currentTurn = currentTurn === 'white' ? 'black' : 'white';
}

function resetBorders() {
  document.querySelectorAll('.square').forEach(sq => {
    sq.style.border = 'none';
  });
}

function updateTurnIndicator() {
  turnIndicator.textContent = `Turno: ${currentTurn === 'white' ? 'Brancas' : 'Pretas'}`;
}

function triggerScareMessage() {
  const scareMessages = [
    "Você sente uma presença sombria...",
    "A Samara está mais perto!",
    "Algo te observa no escuro...",
    "Um sussurro arrepiante ecoa...",
    "O relógio para de funcionar por um segundo..."
  ];
  const message = scareMessages[Math.floor(Math.random() * scareMessages.length)];
  messageText.textContent = message;
  messageBox.style.display = 'block';
}

function initListeners() {
  board.addEventListener('click', handleSquareClick);

  continueButton.addEventListener('click', () => {
    messageBox.style.display = 'none';
  });
}

window.onload = () => {
  createBoard();
  initListeners();
  updateTurnIndicator();
};
