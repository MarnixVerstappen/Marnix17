const boxes = document.querySelectorAll('.boxes');
const playerX = 'X';
const playerO = 'O';
const boardState = Array(boxes.length); boardState.fill('');
const Strike = document.querySelector('.strike');
const gameOverArea = document.querySelector('.game-over-area');
const gameOverText = document.querySelector('.game-over-text');
const playAgain = document.querySelector('.play-again');
let turn = playerX;

playAgain.addEventListener('click', reloads)
function reloads() {
    document.location.reloads()
}

boxes.forEach(boxes => boxes.addEventListener('click', boxeClick));
boxes.forEach(function(box) { 
    box.addEventListener('mouseover', function() {
        const hoverClass = `${turn.toLowerCase()}-hover`;

        this.classList.add(hoverClass);
    });
    box.addEventListener('mouseout', function() {
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
    if (gameOverArea.classList.contains('visible')) {
        return;
    }
    const boxes = event.target;
    const boxNumber = boxes.dataset.index;
    if(boxes.innerText != '') {
        return;
    }

    boxes.classList.add('filled');
    if(turn === playerX) {
        boxes.innerText = playerX
        boardState[boxNumber-1] = playerX
        turn = playerO;
    } else{
        boxes.innerText = playerO
        boardState[boxNumber-1] = playerO
        turn = playerX;
    }   
    console.log(checkWinnerCombination);
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
                console.log('winner');
                console.log(useClass);
        }
        return checkWinnerCombination;
    })
   console.log(boardState);
}

let checkWinnerCombination = [
    { combo: [0, 1, 2], strikeClass: gameOverText.innerHTML = `${turn} has won` },
    { combo: [3, 4, 5], strikeClass: gameOverText.innerHTML = `${turn} has won` },
    { combo: [6, 7, 8], strikeClass: gameOverText.innerHTML = `${turn} has won` },
    { combo: [0, 3, 6], strikeClass: gameOverText.innerHTML = `${turn} has won` },
    { combo: [1, 4, 7], strikeClass: gameOverText.innerHTML = `${turn} has won` },
    { combo: [2, 5, 8], strikeClass: gameOverText.innerHTML = `${turn} has won` },
    { combo: [0, 4, 8], strikeClass: gameOverText.innerHTML = `${turn} has won` },
    { combo: [2, 4, 6], strikeClass: gameOverText.innerHTML = `${turn} has won` },
]


