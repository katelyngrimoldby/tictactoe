const gameBoard = (() => {
    const initBoard = (arr) => {
        for (i = 0; i < 9; i++) {
            id = (i+1).toString();
            arr[i] = document.getElementById(id)
        }
        return arr
    }
    let boardArr = []
    return {initBoard, boardArr};
})();