const boxes = document.querySelectorAll('.boxes');
const playerX = 'X';
const playerO = 'O';
const boardState = Array(boxes.length); boardState.fill('');
const Strike = document.querySelector('.strike');
const gameOverArea = document.querySelector('.game-over-area');
const gameOverText = document.querySelector('.game-over-text');
const playAgain = document.querySelector('.play-again');
let endGame = false
let turn = playerX;


function reloads() {
    document.location.reload()
}
playAgain.addEventListener('click', reloads);

boxes.forEach(boxes => boxes.addEventListener('click', boxeClick));
boxes.forEach(function (box) {
    box.addEventListener('mouseover', function () {
        const hoverClass = `${turn.toLowerCase()}-hover`;

        this.classList.add(hoverClass);
    });
    box.addEventListener('mouseout', function () {
        this.classList.remove('x-hover');
        this.classList.remove('o-hover');
    });

});

function setHoverText() {
    boxes.forEach((boxes) => {
        boxes.classList.remove('X-hover');
        boxes.classList.remove('O-hover');
    });


    boxes.forEach((boxes) => {
        if (boxes.innerText == '') {
            boxes.classList.add(hoverClass);
        }
    });
}

function boxeClick(event) {
    if (endGame) {
        return;
    }
    if (gameOverArea.classList.contains('visible')) {
        return;
    }
    const boxes = event.target;
    const boxNumber = boxes.dataset.index;
    if (boxes.innerText != '') {
        return;
    }

    boxes.classList.add('filled');
    if (turn === playerX) {
        boxes.innerText = playerX
        boardState[boxNumber - 1] = playerX
        turn = playerO;
    } else {
        boxes.innerText = playerO
        boardState[boxNumber - 1] = playerO
        turn = playerX;
    }
    console.log(turn);
    if (checkWinner() == turn) {
        gameOverText.innerHTML = `${turn} has won`
    }
    checkWinner();
}

function checkWinner() {
    checkWinnerCombination.forEach((combination) => {
        const indexes = combination.combo;
        const useClass = combination.strikeClass;
        if (boardState[indexes[0]] != '' &&
            boardState[indexes[0]] === boardState[indexes[1]] &&
            boardState[indexes[1]] === boardState[indexes[2]]) {
            console.log(useClass);
            if (turn == 'X') {
                gameOverText.innerHTML = `O Has Won`;
                endGame = true;
            } else {
                gameOverText.innerHTML = `X Has Won`;
                endGame = true;
            }
            if (useClass === '.row-1') {
                const useClass = document.querySelectorAll('.one, .two, .three');
                useClass.forEach(column => {
                    column.style.backgroundColor = '#B4FF9F';
                })
            } else if (useClass === '.row-2') {
                const useClass = document.querySelectorAll('.four, .five, .six');
                useClass.forEach(column => {
                    column.style.backgroundColor = '#B4FF9F';
                })
            } else if (useClass === '.row-3') {
                const useClass = document.querySelectorAll('.seven, .eight, .nine');
                useClass.forEach(column => {
                    column.style.backgroundColor = '#B4FF9F';
                })
            } else if (useClass === '.colomn-1') {
                const useClass = document.querySelectorAll('.one, .four, .sevem');
                useClass.forEach(column => {
                    column.style.backgroundColor = '#B4FF9F';
                })
            } else if (useClass === '.colomn-2') {
                const useClass = document.querySelectorAll('.two, .five, .eight');
                useClass.forEach(column => {
                    column.style.backgroundColor = '#B4FF9F';
                })
            } else if (useClass === '.column-3') {
                const useClass = document.querySelectorAll('.three, .six, .nine');
                useClass.forEach(column => {
                    column.style.backgroundColor = '#B4FF9F';
                })
            } else if (useClass === '.diagnal-1') {
                const useClass = document.querySelectorAll('.one, .five, .nine');
                useClass.forEach(column => {
                    column.style.backgroundColor = '#B4FF9F';
                })
            } else if (useClass === '.diagnal-2') {
                const useClass = document.querySelectorAll('.three, .five, .seven');
                useClass.forEach(column => {
                    column.style.backgroundColor = '#B4FF9F';
                })
            }
        }
    })
}

let checkWinnerCombination = [
    { combo: [0, 1, 2], strikeClass: '.row-1' },
    { combo: [3, 4, 5], strikeClass: '.row-2' },
    { combo: [6, 7, 8], strikeClass: '.row-3' },
    { combo: [0, 3, 6], strikeClass: '.colomn-1' },
    { combo: [1, 4, 7], strikeClass: '.colomn-2' },
    { combo: [2, 5, 8], strikeClass: '.colomn-3' },
    { combo: [0, 4, 8], strikeClass: '.diagnal-1' },
    { combo: [2, 4, 6], strikeClass: '.diagnal-2' },
]


