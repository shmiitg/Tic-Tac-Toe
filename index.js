let cross = 'cross';
let circle = 'circle';
let container = document.querySelector('#container');
let boardCells = document.querySelectorAll('.cell');
let turnCnt;
let currTurn;
let winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let currTurnMsg = document.querySelector('#currTurnMsg');
let winner = document.querySelector('#winner');
let restart = document.querySelector('#restart');
let winningMessage = document.querySelector('#winning-message');

startGame();

restart.addEventListener('click', e => {
    winner.classList.add('hide');
    container.classList.remove('hide');
    currTurnMsg.classList.remove('hide');
    startGame();
})

function startGame() {
    container.classList.remove(cross);
    container.classList.remove(circle);
    turnCnt = 0;
    currTurn = (turnCnt % 2 === 0) ? circle : cross;
    container.classList.add(currTurn);
    currTurnMsg.innerHTML = (currTurn === circle) ? "X's turn" : "O's turn";
    boardCells.forEach(cell => {
        cell.addEventListener('click', clicked);
    })
}

function clicked(e) {
    let markCell = e.target;
    if (markCell.classList.contains(cross) || markCell.classList.contains(circle)) return;
    currTurn = (turnCnt % 2 === 0) ? cross : circle;
    currTurnMsg.innerHTML = (currTurn === cross) ? "O's turn" : "X's turn";

    placeMark(markCell, currTurn);

    if (isWin(currTurn)) {
        gameEnds();
        let msg = (currTurn === cross) ? 'X' : 'O';
        winningMessage.innerHTML = `${msg} Wins!`
    }

    else if (isDraw()) {
        gameEnds();
        winningMessage.innerHTML = 'Draw!';
    }
    else turnCnt++;
}

function placeMark(markCell, currTurn) {
    container.classList.remove(circle);
    container.classList.remove(cross);
    container.classList.add(currTurn);
    markCell.classList.add(currTurn);
}


function isWin(currTurn) {
    for (let i = 0; i < winningCombos.length; i++) {
        let x = winningCombos[i][0];
        let y = winningCombos[i][1];
        let z = winningCombos[i][2];
        if (boardCells[x].classList.contains(currTurn) && boardCells[y].classList.contains(currTurn) && boardCells[z].classList.contains(currTurn)) {
            return true;
        }
    }
    return false;
}

function isDraw() {
    return [...boardCells].every(cell => {
        return cell.classList.contains(cross) || cell.classList.contains(circle);
    })
}

function gameEnds() {
    winner.classList.remove('hide');
    container.classList.add('hide');
    boardCells.forEach(cell => {
        cell.classList.remove(cross);
        cell.classList.remove(circle);
    })
    currTurnMsg.classList.add('hide');
}