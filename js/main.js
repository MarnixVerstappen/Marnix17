const boxes = document.querySelectorAll('.boxes');
const playerX = 'X';
const playerO = 'O';
const boardState = Array(boxes.length); boardState.fill(null);
const Strike = document.querySelector(".strike");
const gameOverArea = document.querySelector('.game-over-area');
const gameOverText = document.querySelector('.game-over-text');
const playAgain = document.querySelector('.play-again');
const winning = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]
let turn = playerX;
boxes.forEach(boxes => boxes.addEventListener("click", boxeClick));

boxes.forEach(function(box) { 
    box.addEventListener("mouseover", function() {
        const hoverClass = `${turn.toLowerCase()}-hover`;

        this.classList.add(hoverClass);
    });
    box.addEventListener("mouseout", function() {
        this.classList.remove("x-hover");
        this.classList.remove("o-hover");
    });

});

function setHoverText() {
    boxes.forEach((boxes) => {
        boxes.classList.remove("X-hover");
        boxes.classList.remove("O-hover");
    });


    boxes.forEach((boxes) => {
        if (boxes.innerText == "") {
           boxes.classList.add(hoverClass);
        }
    });
}

function boxeClick(event) {
    if (gameOverArea.classList.contains("visible")) {
        return;
    }
    const boxes = event.target;
    const boxNumber = boxes.dataset.index;
    if(boxes.innerText != "") {
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
    checkWinner();
    // console.log(boardState);
}

function checkWinner() {
    checkWinnerCombination.forEach((combination,index) => {
        const indexes = combination.combo;
        const useClass = combination.strikeClass;
        if (boardState[indexes[0]] != null && 
            boardState[indexes[0]] === boardState[indexes[1]] && 
            boardState[indexes[1]] === boardState[indexes[2]]) {
                console.log('winner');
        }
    })
 //   console.log(boardState)
}

let checkWinnerCombination = [
    // rows
    { combo: [0, 1, 2], strikeClass: ".strike-row-1" },
    { combo: [3, 4, 5], strikeClass: ".strike-row-2" },
    { combo: [6, 7, 8], strikeClass: ".strike-row-3" },
    //colums
    { combo: [0, 3, 6], strikeClass: ".strike-colum-1" },
    { combo: [1, 4, 7], strikeClass: ".strike-colum-2" },
    { combo: [2, 5, 8], strikeClass: ".strike-colum-3" },
    //diagonals
    { combo: [0, 4, 8], strikeClass: ".strike-diagonal-1" },
    { combo: [2, 4, 6], strikeClass: ".strike-diagnoal-2" },
//    0
]

