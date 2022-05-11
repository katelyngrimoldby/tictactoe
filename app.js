const Player = (marker, color) => {
    const mark = marker;
    const markColor = color;

    const getMark = () => mark;

    const getColor = () => markColor;

    return {getMark, getColor};
}

const gameBoard = (() => {
    let boardArr = [];
    const initBoard = (arr) => {
        for (i = 0; i < 9; i++) {
            id = (i+1).toString();
            arr[i] = document.getElementById(id);
        }
        return arr;
    }

    const renderMark = (id, mark, color) => {
        boardArr[id-1].style.color = color;
        boardArr[id-1].textContent = mark;
    }
    return {boardArr, initBoard, renderMark};
})();

const gameManager = (() => {
    let turn = true //true for X, false for O
    let round = 0;
    let gameOver = false;
    let winner = ''
    const x = Player('X', 'red')
    const o = Player('O', 'blue')

    const setRound = (num) => {
        round = num
    }
    const setGameOver = (boo) => {
        gameOver = boo
    }
    const setWinner = (str) => {
        winner = str
    }

    const makeMove = (e) => {
        if(e.target.textContent == '' && gameOver == false) {
            let id = e.target.id;
            if (turn) {
                gameBoard.renderMark(id, x.getMark(), x.getColor());
            }else {
                gameBoard.renderMark(id, o.getMark(), o.getColor())
            }
            round++
            findWinner()
            turn = !turn
            if(gameOver) {
                alert(`${winner} wins!`)
            }
        }else {
            alert('Invalid')
        }
    }

    const findWinner = () => {
        //rows
        for (i = 0; i<9; i+=3){
            if ((gameBoard.boardArr[i].textContent === 'X' && gameBoard.boardArr[i+1].textContent === 'X') || (gameBoard.boardArr[i].textContent === 'O' && gameBoard.boardArr[i+1].textContent === 'O')) {
                if((gameBoard.boardArr[i].textContent === 'X' && gameBoard.boardArr[i+2].textContent === 'X') || (gameBoard.boardArr[i].textContent === 'O' && gameBoard.boardArr[i+2].textContent === 'O')){
                    gameOver = true
                    if(turn) {
                        winner = 'X'
                    }else {
                        winner = 'O'
                    }
                }
            }
        }
        //columns
        for (i = 0; i < 3; i++) {
            if ((gameBoard.boardArr[i].textContent === 'X' && gameBoard.boardArr[i+3].textContent === 'X') || (gameBoard.boardArr[i].textContent === 'O' && gameBoard.boardArr[i+3].textContent === 'O')) {
                if((gameBoard.boardArr[i].textContent === 'X' && gameBoard.boardArr[i+6].textContent === 'X') || (gameBoard.boardArr[i].textContent === 'O' && gameBoard.boardArr[i+6].textContent === 'O')){
                    gameOver = true
                    if(turn) {
                        winner = 'X'
                    }else {
                        winner = 'O'
                    }
                }
            }
        }
        //LtR diagonal
        if ((gameBoard.boardArr[0].textContent === 'X' && gameBoard.boardArr[4].textContent === 'X') || (gameBoard.boardArr[0].textContent === 'O' && gameBoard.boardArr[4].textContent === 'O')) {
            if((gameBoard.boardArr[0].textContent === 'X' && gameBoard.boardArr[8].textContent === 'X') || (gameBoard.boardArr[0].textContent === 'O' && gameBoard.boardArr[8].textContent === 'O')){
                gameOver = true
                if(turn) {
                    winner = 'X'
                }else {
                    winner = 'O'
                }
            }
        }
        //RtL diagonal
        if ((gameBoard.boardArr[2].textContent === 'X' && gameBoard.boardArr[4].textContent === 'X') || (gameBoard.boardArr[2].textContent === 'O' && gameBoard.boardArr[4].textContent === 'O')) {
            if((gameBoard.boardArr[2].textContent === 'X' && gameBoard.boardArr[6].textContent === 'X') || (gameBoard.boardArr[2].textContent === 'O' && gameBoard.boardArr[6].textContent === 'O')){
                gameOver = true
                if(turn) {
                    winner = 'X'
                }else {
                    winner = 'O'
                }
            }
        }
        //tie
        if(round>=9) {
            gameOver = true
            winner = "No-one"
        }
    }


    return {setRound, setGameOver, setWinner, makeMove}
})();

const displayController = (() => {
    const container = document.querySelector('.container');
    const resetBtn = document.getElementById('resetBtn');

    container.addEventListener('click', gameManager.makeMove);
    resetBtn.addEventListener('click', () => {
        for (i = 0; i < 9; i++) {
            gameBoard.boardArr[i].textContent = '';
            gameBoard.boardArr[i].style.color = 'black';
        }
        gameManager.setRound(0)
        gameManager.setGameOver(false)
        gameManager.setWinner('')
    });
    window.onload = gameBoard.initBoard(gameBoard.boardArr);

})();