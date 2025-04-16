window.onload= function() {
const boardElement= document.getElementById("gameBoard");
const statusElement= document.getElementById("statusMessage");
const resetButton= document.getElementById("reset");
const playerTurn=document.getElementById("currentPlayer");

let mode = "single"; // default
const modeSelector = document.getElementById("gameMode");
modeSelector.addEventListener("change", (e) => {
  mode = e.target.value;
  resetGame();
});


let board= [[null, null, null], 
            [null, null, null], 
            [null, null, null]];

const player=["X", "O"];
let turn =0;

function createBoard() {
    boardElement.innerHTML="";
    for (let row=0; row<3; row++) {
        const rowElement= document.createElement("div");
        rowElement.classList.add("row");
        for (let col=0; col<3; col++) {
            const cellElement= document.createElement("div");
            cellElement.classList.add("cell");
            cellElement.dataset.row= row;
            cellElement.dataset.col= col;
            cellElement.addEventListener("click", handlePlayerMove);
            rowElement.appendChild(cellElement);
        }
        boardElement.appendChild(rowElement);
    }
}

function handlePlayerMove(e) {
    const cellElement= e.target;
    const row= parseInt(cellElement.dataset.row);
    const col= parseInt(cellElement.dataset.col);

    if (board[row][col]!==null || (mode === "single" && turn !== 0)) return;

    const currentPlayer= player[turn];
    makeMove(row, col, currentPlayer);    
    const winner= checkWinner();
    const full = checkFull();

    if (winner || full ) return endGame(winner);

    turn=(turn+1)%2;
    playerTurn.innerText=player[turn];
    
if (mode === "single" && turn === 1) 
    {
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    let row,col;
    do {
        row= Math.floor(Math.random()*3);
        col= Math.floor(Math.random()*3);
    } while (board[row][col]!==null);

    makeMove(row, col, "O");

    const winner= checkWinner();
    const full = checkFull();

    if (winner || full) return endGame(winner);
    turn=0;
    playerTurn.innerText="X";
}

function makeMove(row, col, player) {
    board[row][col]= player;
    console.log(player);
    const cellElement= document.querySelectorAll(".cell");
    cellElement.forEach(cell=> {
        if (parseInt(cell.dataset.row)===row && parseInt(cell.dataset.col)===col) {
            cell.innerText= player;
            cell.classList.add("taken");
        }
    });
    statusElement.textContent=`${player} made a move`;
}

function checkWinner() {
    const winningCombinations= [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    for (const combination of winningCombinations) {
        const [[a,b],[c,d],[e,f]]= combination;
        if (board[a][b] && board[a][b]===board[c][d] && board[a][b]===board[e][f]) {
            return board[a][b];
        }
    }
    return null;
}

function checkFull() {
    return board.every(row=> row.every(cell=> cell!==null));
}

function endGame(winner) {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.classList.add("taken"));
    if (winner) {
      statusElement.textContent = `${winner} wins!`;
    } else {
      statusElement.textContent = "It's a tie!";
    }
  }

window.resetGame = function() {
    board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    turn = 0;
    statusElement.textContent = "Your turn (X)";
    createBoard();
  }

  createBoard();
};