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




const game = (function() {
    let player1, player2;

    const startGame = () => {
        const dialog = document.querySelector('dialog');
        const form = document.getElementById("player-form");
        const submitButton = document.getElementById("submit-button");

        submitButton.addEventListener("click", (event) => {
            event.preventDefault();
            const player1Name = document.getElementById("player-one-name").value;
            const player2Name = document.getElementById("player-two-name").value;
            player1 = createPlayer(player1Name, "X");
            player2 = createPlayer(player2Name, "O");
            dialog.close();
            form.reset();
            playGame(); 
        });

        dialog.showModal();
    }

    const checkValidMove = (x, y) => {
        if (gameBoard.getPosition(x, y) === "") {
            return true;
        }
        return false;
    }


    const resetGame = () => {   
        gameBoard.resetGameboard();
        displayGameBoard.updateGameBoard();
    }


    const checkIfWon = (player) => {
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
    

    const playGame = () => {
        const cells = document.querySelectorAll('.cell');
        let currentPlayer = player1;

        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                const row = Math.floor(index / 3);
                const column = index % 3;
                if (checkValidMove(row, column)) {
                    currentPlayer.userMove(currentPlayer, row, column);
                    if (checkIfWon(currentPlayer)) {
                        alert(`${currentPlayer.name} wins!`);
                        resetGame();
                    } else if (gameBoard.isFull()) {
                        alert("It's a tie!");
                        resetGame();
                    } else {
                        currentPlayer = (currentPlayer === player1) ? player2 : player1;
                    }
                }
            });
        });
    }

    return {startGame};
})();

game.startGame();