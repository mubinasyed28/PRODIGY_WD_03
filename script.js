// script.js

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let isAgainstAI = false;

const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset-button');
const playHumanButton = document.getElementById('play-human');
const playAIButton = document.getElementById('play-ai');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

playHumanButton.addEventListener('click', () => {
    isAgainstAI = false;
    resetGame();
});

playAIButton.addEventListener('click', () => {
    isAgainstAI = true;
    resetGame();
});

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) {
        return;
    }

    makeMove(index, currentPlayer);
    checkResult();

    if (isGameActive && isAgainstAI && currentPlayer === 'O') {
        makeAIMove();
        checkResult();
    }
}

function makeMove(index, player) {
    board[index] = player;
    cells[index].innerText = player;
    currentPlayer = player === 'X' ? 'O' : 'X';
}

function makeAIMove() {
    const availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    makeMove(randomMove, 'O');
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        messageElement.innerText = `Player ${currentPlayer === 'X' ? 'O' : 'X'} wins!`;
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        messageElement.innerText = 'Draw!';
        isGameActive = false;
        return;
    }

    messageElement.innerText = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    cells.forEach(cell => {
        cell.innerText = '';
    });
    messageElement.innerText = `Player ${currentPlayer}'s turn`;
}

resetGame(); // Initialize the game state
