const board = document.getElementById("board");
const turnIndicator = document.getElementById("turn-indicator");
let selectedSquare = null;
let currentPlayer = "white";

const initialBoard = [
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
];

function updateTurnIndicator() {
  turnIndicator.textContent = `Turno: ${currentPlayer === "white" ? "Branco" : "Preto"}`;
}

function createBoard() {
  board.innerHTML = "";
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.classList.add((row + col) % 2 === 0 ? "white" : "black");
      square.dataset.row = row;
      square.dataset.col = col;
      square.textContent = initialBoard[row][col];
      board.appendChild(square);
    }
  }
}

function handleSquareClick(e) {
  const square = e.target.closest(".square");
  if (!square) return;

  const row = +square.dataset.row;
  const col = +square.dataset.col;
  const piece = initialBoard[row][col];

  const isWhitePiece = "♙♖♘♗♕♔".includes(piece);
  const isBlackPiece = "♟♜♞♝♛♚".includes(piece);

  if (
    (currentPlayer === "white" && isWhitePiece) ||
    (currentPlayer === "black" && isBlackPiece)
  ) {
    if (selectedSquare) selectedSquare.classList.remove("selected");
    selectedSquare = square;
    square.classList.add("selected");
  } else if (selectedSquare) {
    movePiece(selectedSquare, square);
    selectedSquare.classList.remove("selected");
    selectedSquare = null;
  }
}

function movePiece(from, to) {
  const fromRow = +from.dataset.row;
  const fromCol = +from.dataset.col;
  const toRow = +to.dataset.row;
  const toCol = +to.dataset.col;

  initialBoard[toRow][toCol] = initialBoard[fromRow][fromCol];
  initialBoard[fromRow][fromCol] = "";
  createBoard();
  updateTurnIndicator();
  currentPlayer = currentPlayer === "white" ? "black" : "white";
}

board.addEventListener("click", handleSquareClick);

createBoard();
updateTurnIndicator();

