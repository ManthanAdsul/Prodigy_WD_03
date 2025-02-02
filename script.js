const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", () => handleCellClick(cell));
});

resetButton.addEventListener("click", resetGame);

function handleCellClick(cell) {
    const index = cell.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkWinner();
    togglePlayer();
}

function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
    let roundWon = false;

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's Turn";
    cells.forEach(cell => cell.textContent = "");
}

statusText.textContent = "Player X's Turn";
