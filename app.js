const gameBoard = (() => {
    const container = document.querySelector('.container');

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

    let boardArr = [];
    return {container, initBoard, renderMark, boardArr};
})();

const gameManager = (() => {
    let turn = true //true for X, false for O
    const makeMove = (e) => {
        if(e.target.textContent == '') {
            let id = e.target.id;
            if (turn) {
                gameBoard.renderMark(id, x.getMark(), x.getColor());
            }else {
                gameBoard.renderMark(id, o.getMark(), o.getColor())
            }
            turn = !turn
        }else {
            alert('invalid')
        }
    }
    return {makeMove}
})();

const Player = (marker, color) => {
    const mark = marker;
    const markColor = color;

    const getMark = () => mark;

    const getColor = () => color;

    return {getMark, getColor};
}

const x = Player('X', 'red')
const o = Player('O', 'blue')

window.onload = gameBoard.initBoard(gameBoard.boardArr)

gameBoard.container.addEventListener('click', gameManager.makeMove)