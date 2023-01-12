const boxes = document.querySelectorAll('.boxes');
const scoreboardX = document.querySelector('.scoreboard-X')
const scoreboardO = document.querySelector('.scoreboard-O')
const playerX = 'X';
const playerO = 'O';
const Strike = document.querySelector('.strike');
const gameOverArea = document.querySelector('.game-over-area');
const gameOverText = document.querySelector('.game-over-text');
const wonX = document.querySelector('.wonX');
const wonO = document.querySelector('.wonO');
const playAgain = document.querySelector('.play-again');
const submitBtn = document.querySelector('.submit');
let boardState = Array(boxes.length); boardState.fill('');
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

    if (gameOverArea.classList.contains('.visible')) {
        return;
    }
    const boxes = event.target;
    const boxNumber = boxes.dataset.index;
    if (boxes.innerText != '') {
        return;
    }
    i++
    if (i === 5) {
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
        // turn = playerO;
    } else {
        boxes.innerText = playerO
        boardState[boxNumber - 1] = playerO
        turn = playerX;
    }
        checkWinner();
        AIDef();
    }

function checkWinner() {
    checkWinnerCombination.forEach((combination) => {
        const indexes = combination.combo;
        const useClass = combination.strikeClass;
        if (boardState[indexes[0]] != '' &&
            boardState[indexes[0]] === boardState[indexes[1]] &&
            boardState[indexes[1]] === boardState[indexes[2]]) {
            if (turn == 'X') {
                gameOverText.innerHTML = `Won!`;
                endGame = true;
                O++;
                wonO.innerHTML = O;
            } else {
                gameOverText.innerHTML = `Won!`;
                endGame = true;
                X++;
                wonO.innerHTML = O;
                turn == 'O';
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

function AIDef() {

    if(boardState[4] !== 'X' && boardState[4] !== 'O') {
        boardState[4] = 'O';
        document.querySelector('.five').innerHTML = 'O';
        console.log('1')
    }
    else if(boardState[4] == 'X' &&  boardState[0] == '') {
        boardState[0] = 'O';
        document.querySelector('.one').innerHTML = 'O';
        console.log('2')
    }


    //row 1
    else if (boardState[0] == 'X' && boardState[1] == 'X' && boardState[2] === '') {
        boardState[2] = 'O';
        document.querySelector('.three').innerHTML = 'O';
    }
    else if (boardState[0] == 'X' && boardState[1] == 'X' && boardState[2] === 'O') {
        boardState[8] = 'O';
        document.querySelector('.nine').innerHTML = 'O';
    }
    else if (boardState[0] == 'O' && boardState[1] == 'X'  && boardState[6] === '') {
        boardState[6] = 'O';
        document.querySelector('.seven').innerHTML = 'O';
    }
    else if (boardState[1] == 'X' && boardState[2] == 'X' && boardState[0] === '') {
        boardState[0] = 'O';
        document.querySelector('.one').innerHTML = 'O';
        console.log('')
    }
    else if (boardState[0] == 'X' && boardState[2] == 'X' && boardState[1] === '') {
        boardState[1] = 'O';
        document.querySelector('.two').innerHTML = 'O';
    //colomn 1
    }
    else if (boardState[0] == 'X' && boardState[3] == 'X' && boardState[6] === '') {
        boardState[6] = 'O';
        document.querySelector('.seven').innerHTML = 'O';
    }
    else if (boardState[0] == 'X' && boardState[3] == 'X' && boardState[6] === 'O') {
        boardState[8] = 'O';
        document.querySelector('.nine').innerHTML = 'O';
    }
    else if (boardState[0] == 'X' && boardState[6] == 'X' && boardState[3] === '') {
        boardState[3] = 'O';
        document.querySelector('.four').innerHTML = 'O';
    }
    else if (boardState[6] == 'X' && boardState[3] == 'X' && boardState[0] === '') {
        boardState[0] = 'O';
        document.querySelector('.one').innerHTML = 'O';
    }
    //row 2
    else if (boardState[3] == 'X' && boardState[4] == 'X' && boardState[5] === '') {
        boardState[5] = 'O';
        document.querySelector('.six').innerHTML = 'O';
    }
    else if (boardState[4] == 'X' && boardState[5] == 'X' && boardState[3] === '') {
        boardState[3] = 'O';
        document.querySelector('.four').innerHTML = 'O';
    }
    else if (boardState[5] == 'X' && boardState[3] == 'X' && boardState[4] === '') {
        boardState[4] = 'O';
        document.querySelector('.five').innerHTML = 'O';
        console.log('hoi')
    }
    //column 2
    else if (boardState[1] == 'X' && boardState[4] == 'X' && boardState[7] === '') {
        boardState[7] = 'O';
        document.querySelector('.eight').innerHTML = 'O';
    }
    else if (boardState[4] == 'X' && boardState[7] == 'X' && boardState[1] === '') {
        boardState[1] = 'O';
        document.querySelector('.two').innerHTML = 'O';
    }
    else if (boardState[1] == 'X' && boardState[7] == 'X' && boardState[4] === '') {
        boardState[4] = 'O';
        document.querySelector('.five').innerHTML = 'O';
    }
    // row 3
    else if (boardState[6] == 'X' && boardState[7] == 'X' && boardState[8] === '') {
        boardState[8] = 'O';
        document.querySelector('.nine').innerHTML = 'O';
    }
    else if (boardState[6] == 'X' && boardState[8] == 'X' && boardState[7] === '') {
        boardState[7] = 'O';
        document.querySelector('.eight').innerHTML = 'O';
    }
    else if (boardState[7] == 'X' && boardState[8] == 'X' && boardState[6] === 'O') {
        boardState[6] = 'O';
        document.querySelector('.one').innerHTML = 'O';
    }
    else if (boardState[7] == 'X' && boardState[8] == 'X' && boardState[6] === '') {
        boardState[1] = 'O';
        document.querySelector('.one').innerHTML = 'O';
    }
    // column 3
    else if (boardState[2] == 'X' && boardState[5] == 'X' && boardState[8] === '') {
        boardState[8] = 'O';
        document.querySelector('.nine').innerHTML = 'O';
    }
    else if (boardState[2] == 'X' && boardState[5] == 'X' && boardState[8] === 'O') {
        boardState[6] = 'O';
        document.querySelector('.seven').innerHTML = 'O';
    }
    else if (boardState[2] == 'X' && boardState[8] == 'X' && boardState[5] === '') {
        boardState[5] = 'O';
        document.querySelector('.six').innerHTML = 'O';
    }
    else if (boardState[5] == 'X' && boardState[8] == 'X' && boardState[2] === '') {
        boardState[2] = 'O';
        document.querySelector('.three').innerHTML = 'O';
    }
    //diagonal 1
    else if (boardState[0] == 'X' && boardState[4] == 'X' && boardState[8] === '') {
        boardState[8] = 'O';
        document.querySelector('.nine').innerHTML = 'O';
    }
    else if (boardState[4] == 'X' && boardState[8] == 'X' && boardState[0] === '') {
        boardState[0] = 'O';
        document.querySelector('.one').innerHTML = 'O';
    }
    else if (boardState[4] == 'X' && boardState[8] == 'X' && boardState[0] === 'O') {
        boardState[6] = 'O';
        document.querySelector('.seven').innerHTML = 'O';
    }
    else if (boardState[0] == 'X' && boardState[8] == 'X' && boardState[4] === '') {
        boardState[4] = 'O';
        document.querySelector('.five').innerHTML = 'O';
    }
    else if (boardState[0] == 'X' && boardState[8] == 'X' && boardState[6] === '') {
        boardState[6] = 'O';
        document.querySelector('.seven').innerHTML = 'O';
    }
    else if (boardState[3] == 'O' && boardState[5] == 'O' && boardState[6] == 'X' && boardState[7] === '' ) {
        boardState[7] = 'O';
        document.querySelector('.eight').innerHTML = 'O';
    }
    //diangonal 2
    else if (boardState[6] == 'X' && boardState[4] == 'X' && boardState[2] === '') {
        boardState[2] = 'O';
        document.querySelector('.three').innerHTML = 'O';
    }
    else if (boardState[2] == 'X' && boardState[6] == 'X' && boardState[4] === '') {
        boardState[4] = 'O';
        document.querySelector('.five').innerHTML = 'O';
    }
    else if (boardState[2] == 'X' && boardState[6] == 'X' && boardState[4] === 'O') {
        boardState[8] = 'O';
        document.querySelector('.nine').innerHTML = 'O';
    }
    else if (boardState[2] == 'X' && boardState[4] == 'X' && boardState[6] === '') {
        boardState[6] = 'O';
        document.querySelector('.seven').innerHTML = 'O';
    }
    // L Form //
    else if (boardState[0] == 'X' && boardState[7] == 'X' && boardState[6] === '') {
        boardState[6] = 'O';
        document.querySelector('.seven').innerHTML = 'O';
    }
    else if (boardState[5] == 'X' && boardState[6] == 'X' && boardState[8] === '') {
        boardState[8] = 'O';
        document.querySelector('.nine').innerHTML = 'O';
    }
    else if (boardState[1] == 'X' && boardState[8] == 'X' && boardState[0] === '') {
        boardState[0] = 'O';
        document.querySelector('.one').innerHTML = 'O';
    }
    else if (boardState[5] == 'X' && boardState[6] == 'X' && boardState[8] === '') {
        boardState[8] = 'O';
        document.querySelector('.nine').innerHTML = 'O';
    }
    else if (boardState[2] == 'X' && boardState[3] == 'X' && boardState[0] === '') {
        boardState[0] = 'O';
        document.querySelector('.one').innerHTML = 'O';
    }
    else if (boardState[2] == 'X' && boardState[7] == 'X' && boardState[8] === '') {
        boardState[8] = 'O';
        document.querySelector('.nine').innerHTML = 'O';
    }
    else if (boardState[0] == 'X' && boardState[5] == 'X' && boardState[2] === '') {
        boardState[2] = 'O';
        document.querySelector('.three').innerHTML = 'O';
    }
    else if (boardState[1] == 'X' && boardState[6] == 'X' && boardState[0] === '') {
        boardState[0] = 'O';
        document.querySelector('.one').innerHTML = 'O';
    }
    else if (boardState[3] == 'X' && boardState[8] == 'X' && boardState[6] === '') {
        boardState[6] = 'O';
        document.querySelector('.seven').innerHTML = 'O';
    }
    //row1 equal row3 
    else if (boardState[1] == 'X' && boardState[7] == 'X' && boardState[6] === '') {
        boardState[6] = 'O';
        document.querySelector('.seven').innerHTML = 'O';
    }
    else if (boardState[3] == 'X' && boardState[5] == 'X' && boardState[8] === '') {
        boardState[8] = 'O';
        document.querySelector('.nine').innerHTML = 'O';
    }
    else if (boardState[0] == 'X' && boardState[2] == 'X' && boardState[8] == 'X' && boardState[5] === '') {
        boardState[5] = 'O';
        document.querySelector('.six').innerHTML = 'O';
    }
    //diagonal on the sides 
    else if (boardState[3] == 'X' && boardState[7] == 'X' && boardState[6] === '') {
        boardState[6] = 'O';
        document.querySelector('.seven').innerHTML = 'O';
    } 
    else if (boardState[5] == 'X' && boardState[7] == 'X' && boardState[8] === '') {
        boardState[8] = 'O';
        document.querySelector('.nine').innerHTML = 'O';
    }
    else if (boardState[1] == 'X' && boardState[5] == 'X' && boardState[2] === '') {
        boardState[2] = 'O';
        document.querySelector('.three').innerHTML = 'O';
    }
    else if (boardState[1] == 'X' && boardState[3] == 'X' && boardState[0] === '') {
        boardState[0] = 'O';
        document.querySelector('.one').innerHTML = 'O';
    }
    checkWinner();
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
 

