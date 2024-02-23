const gameBoard = ( function () {
        let gameBoard = [
            ["", "", ""], 
            ["", "", ""],
            ["", "", ""],
        ];
        const printGameBoard = () => {
            for(let i = 0; i < gameBoard.length; i++) {
                console.log(gameBoard[i]);  
            }
        }; 
        const putSymbol = (x, y, symbol) => {
            gameBoard[x][y] = symbol;
        }
        const getPosition = (x, y) => {
            return gameBoard[x][y];
        }
        const resetGameboard = () => {
            gameBoard = [
                ["", "", ""], 
                ["", "", ""],
                ["", "", ""],
            ];
        }
        const isFull = () => {
            for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    if (gameBoard[i][j] === "") {
                        return false;
                    }
                }
            }
            return true;
        }
        return {printGameBoard, putSymbol, getPosition, resetGameboard, isFull};
})();

const displayGameBoard = (function () {
    
    const updateGameBoard = () => {
        let containerChilds = document.querySelectorAll('.cell'); // Obtener las celdas una vez al principio
        containerChilds.forEach((cell, index) => {
                const row = Math.floor(index / 3);
                const column = index % 3;
                cell.textContent = gameBoard.getPosition(row, column);
            });
        };
    
        return { updateGameBoard };
})();
        
function createPlayer(name, symbol) {
    const userMove = (player, x, y) => {
        gameBoard.putSymbol(x, y, player.symbol);
        gameBoard.printGameBoard();
        displayGameBoard.updateGameBoard();
    }
    return { userMove, symbol, name}
}

const player1 = createPlayer("Player1", "X");
const player2 = createPlayer("Player2", "O");


function checkIfWon(gameBoard, player){
    for(let i = 0; i < 3; i++) {
        if (gameBoard.getPosition(i, 0) === player.symbol && gameBoard.getPosition(i, 0) === gameBoard.getPosition(i, 1) && gameBoard.getPosition(i, 0) === gameBoard.getPosition(i, 2)) {
            return true;
        }
        if (gameBoard.getPosition(0, i) === player.symbol && gameBoard.getPosition(0, i) === gameBoard.getPosition(1, i) && gameBoard.getPosition(0, i) === gameBoard.getPosition(2, i)) {
            return true;
        }
    }
    if (gameBoard.getPosition(0, 0) === player.symbol && gameBoard.getPosition(0, 0) === gameBoard.getPosition(1, 1) && gameBoard.getPosition(0, 0) === gameBoard.getPosition(2, 2)) {
        return true;
    }
    if (gameBoard.getPosition(0, 2) === player.symbol && gameBoard.getPosition(0, 2) === gameBoard.getPosition(1, 1) && gameBoard.getPosition(0, 2) === gameBoard.getPosition(2, 0)) {
        return true;
    }
    return false;
}




const game = (function() {
    let currentPlayer = player1;
    const startGame = () => {
        currentPlayer = player1;
    }
    const checkValidMove = (x, y) => {
        if (gameBoard.getPosition(x, y) === "") {
            return true;
        }
        return false;
    }
    const changePlayer = () => {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
    }
    const getCurrentPlayer = () => {return currentPlayer;}

    const resetGame = () => {   
        gameBoard.resetGameboard();
        displayGameBoard.updateGameBoard();
        currentPlayer = player1;
    }
    
    const playGame = () => {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                const row = Math.floor(index / 3);
                const column = index % 3;
                if (game.checkValidMove(row, column)) {
                    // const user = 
                    currentPlayer.userMove(currentPlayer, row, column);
                    if (checkIfWon(gameBoard, currentPlayer)) {
                        alert(`${currentPlayer.name} wins!`);
                        resetGame();
                    }
                    game.changePlayer();
                } else if (gameBoard.isFull()) {
                    alert("It's a tie!");
                    resetGame();
                }
            });
        });
    }

    return {playGame};
})();



game.playGame();