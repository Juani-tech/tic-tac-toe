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
        return {printGameBoard, putSymbol, getPosition, resetGameboard};
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
        while (!checkIfWon(gameBoard, currentPlayer)) {
            let x = parseInt(prompt("Enter the x coordinate"));
            let y = parseInt(prompt("Enter the y coordinate"));
            while (!checkValidMove(x, y)) {
                x = parseInt(prompt("Enter a valid x coordinate"));
                y = parseInt(prompt("Enter a valid y coordinate"));
            }
            currentPlayer.userMove(currentPlayer, x, y);
            if (checkIfWon(gameBoard, currentPlayer)) {
                console.log(`${currentPlayer.name} wins!`);
                break;
            }
            currentPlayer = (currentPlayer === player1) ? player2 : player1;
        }
    };
    
    return {startGame, playGame, checkValidMove, getCurrentPlayer, changePlayer, resetGame};
})();


const cells = document.querySelectorAll('.cell');
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        const row = Math.floor(index / 3);
        const column = index % 3;
        console.log(row, column)
        console.log("HI!");
        if (game.checkValidMove(row, column)) {
            const user = game.getCurrentPlayer();
            user.userMove(user, row, column);
            if (checkIfWon(gameBoard, user)) {
                alert(`${user.name} wins!`);
                game.resetGame();
            }
            game.changePlayer();
        } else {
            alert("Invalid move, try again");
        }
        
    });
});

