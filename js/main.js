const boxes = document.querySelectorAll('.boxes');
const scoreboardX = document.querySelector('.scoreboard-X')
const scoreboardO = document.querySelector('.scoreboard-O')
const playerX = 'X';
const playerO = 'O';
let boardState = Array(boxes.length);
boardState.fill('');
const Strike = document.querySelector('.strike');
const gameOverArea = document.querySelector('.game-over-area');
const gameOverText = document.querySelector('.game-over-text');
const wonX = document.querySelector('.wonX');
const wonO = document.querySelector('.wonO');
const playAgain = document.querySelector('.play-again');
const submitBtn = document.querySelector('.submit');
let inputArea = document.querySelector('.input-area');
let player = document.querySelector('.player')
let endGame = false;
let turn = playerX;
let X = 0;
let O = 0;
let i = 0;

submitBtn.addEventListener('click', submitName);
playAgain.addEventListener('click', reset);

function submitName() {
    player.innerHTML = inputArea.value;
}

function reset() {
    boardState = Array(boxes.length);
    boardState.fill('');
    endGame = false;
    boxes.forEach(boxes => {
        boxes.innerHTML = '';
        boxes.style.backgroundColor = '#ECE5C7';
        turn = playerX;
        gameOverText.innerHTML = '&nbsp;'
        i = 0;
    })
}

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
    i++
    if (i === 9) {
        gameOverText.innerHTML = `Draw!`;
        const useClass = document.querySelectorAll('.one, .two, .three, .four, .five, .six, .seven, .eight, .nine');
        useClass.forEach(draw => {
            draw.style.backgroundColor = '#ff6865';
        })
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
    checkWinner();
    AI();
}

function checkWinner() {
    checkWinnerCombination.forEach((combination) => {
        const indexes = combination.combo;
        const useClass = combination.strikeClass;
        if (boardState[indexes[0]] != '' &&
            boardState[indexes[0]] === boardState[indexes[1]] &&
            boardState[indexes[1]] === boardState[indexes[2]]) {
            if (turn == 'X') {
                gameOverText.innerHTML = `O Won!`;
                endGame = true;
                O++;
                wonO.innerHTML = O;
            } else {
                gameOverText.innerHTML = `X Won!`;
                endGame = true;
                X++
                wonX.innerHTML = X;
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
                const useClass = document.querySelectorAll('.one, .four, .seven');
                useClass.forEach(column => {
                    column.style.backgroundColor = '#B4FF9F';
                })
            } else if (useClass === '.colomn-2') {
                const useClass = document.querySelectorAll('.two, .five, .eight');
                useClass.forEach(column => {
                    column.style.backgroundColor = '#B4FF9F';
                })
            } else if (useClass === '.colomn-3') {
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

function AI() {
    
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
];
