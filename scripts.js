const board = document.getElementById("board");
const turnSpan = document.getElementById("current-turn");
let selectedPiece = null;
let turn = "white";

const initialBoard = [
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]
];

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

  if (selectedPiece) {
    movePiece(square);
  } else {
    selectPiece(square);
  }
}

function selectPiece(square) {
  if (square.textContent === "") return;
  const color = getPieceColor(square.textContent);
  if ((turn === "white" && color !== "white") || (turn === "black" && color !== "black")) return;

  clearSelection();
  selectedPiece = square;
  square.classList.add("selected");
}

function movePiece(target) {
  if (!selectedPiece) return;
  target.textContent = selectedPiece.textContent;
  selectedPiece.textContent = "";
  selectedPiece.classList.remove("selected");
  selectedPiece = null;
  turn = turn === "white" ? "black" : "white";
  updateTurnIndicator();
}

function clearSelection() {
  document.querySelectorAll(".square").forEach(sq => sq.classList.remove("selected"));
}

function getPieceColor(piece) {
  const white = ["♙", "♖", "♘", "♗", "♕", "♔"];
  return white.includes(piece) ? "white" : "black";
}

function updateTurnIndicator() {
  turnSpan.textContent = turn === "white" ? "Brancas" : "Pretas";
}

board.addEventListener("click", handleSquareClick);
createBoard();
updateTurnIndicator();
