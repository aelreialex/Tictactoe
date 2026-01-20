// För eventuella tips utifrån

("use strict");

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};

// window.addEventListener("load", () => {
//     initGlobalObject();
//     if (checkForGameOver() === 1) {
//         console.log("Spelare 1 vann");
//     } else if (checkForGameOver() === 2) {
//         console.log("Spelare 2 vann");
//     } else if (checkForGameOver() === 3) {
//         console.log("Oavgjort");
//     } else {
//         console.log("Spelet fortsätter");
//     }
// });

window.addEventListener("load", () => {
    initGlobalObject();
    prepGame();
});

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
function initGlobalObject() {
    //Datastruktur för vilka platser som är lediga respektive har brickor
    //Genom at fylla i här med antingen X eler O kan ni testa era rättningsfunktioner
    oGameData.gameField = ["", "", "", "", "", "", "", "", ""];

    /* Testdata för att testa rättningslösning */
    //oGameData.gameField = ['X', 'X', 'X', '', '', '', '', '', ''];
    //oGameData.gameField = ['X', '', '', 'X', '', '', 'X', '', ''];
    //oGameData.gameField = ['X', '', '', '', 'X', '', '', '', 'X'];
    //oGameData.gameField = ['', '', 'O', '', 'O', '', 'O', '', ''];
    //oGameData.gameField = ['X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O'];

    //Indikerar tecknet som skall användas för spelare ett.
    oGameData.playerOne = "X";

    //Indikerar tecknet som skall användas för spelare två.
    oGameData.playerTwo = "O";

    //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
    oGameData.currentPlayer = "";

    //Nickname för spelare ett som tilldelas från ett formulärelement,
    oGameData.nickNamePlayerOne = "";

    //Nickname för spelare två som tilldelas från ett formulärelement.
    oGameData.nickNamePlayerTwo = "";

    //Färg för spelare ett som tilldelas från ett formulärelement.
    oGameData.colorPlayerOne = "";

    //Färg för spelare två som tilldelas från ett formulärelement.
    oGameData.colorPlayerTwo = "";

    //Antalet sekunder för timerfunktionen
    oGameData.seconds = 5;

    //Timerns ID
    oGameData.timerId = null;

    //Från start är timern inaktiverad
    oGameData.timerEnabled = false;

    //Referens till element för felmeddelanden
    oGameData.timeRef = document.querySelector("#errorMsg");
}

/**
 * Kontrollerar för tre i rad genom att anropa funktionen checkForWinner() och checkForDraw().
 * Returnerar 0 om spelet skall fortsätta,
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */
function checkForGameOver() {
    if (checkForWinner(oGameData.playerOne) === true) {
        return 1;
    } else if (checkForWinner(oGameData.playerTwo) === true) {
        return 2;
    } else if (checkForDraw() === true) {
        return 3;
    } else {
        return 0;
    }
}

// Säg till om ni vill få pseudokod för denna funktion
// Viktigt att funktionen returnerar true eller false baserat på om den inskickade spelaren är winner eller ej
function checkForWinner(playerIn) {
    let winCond = [
        [0, 1, 2], // Översta raden
        [3, 4, 5], // Mellersta raden
        [6, 7, 8], // Nedersta raden
        [0, 3, 6], // Vänstra kolumnen
        [1, 4, 7], // Mellersta kolumnen
        [2, 5, 8], // Högra kolumnen
        [0, 4, 8], // Diagonalt översta vänster till nedersta höger
        [2, 4, 6], // Diagonalt översta höger till nedersta vänster
    ];

    for (let i = 0; i < winCond.length; i++) {
        let pos1 = winCond[i][0];
        let pos2 = winCond[i][1];
        let pos3 = winCond[i][2];

        if (
            oGameData.gameField[pos1] === playerIn &&
            oGameData.gameField[pos2] === playerIn &&
            oGameData.gameField[pos3] === playerIn
        ) {
            return true;
        }
    }

    return false;
}

//Kontrollera om alla platser i oGameData.GameField är fyllda. Om sant returnera true, annars false.
function checkForDraw() {
    return !oGameData.gameField.includes("");
}

// Nedanstående funktioner väntar vi med!
function prepGame() {
    document.querySelector("#gameArea").classList.add("d-none");
    document.querySelector("#newGame").addEventListener("click", initiateGame);
}

function initiateGame() {
    console.log("test");

    document.querySelector("#theForm").classList.add("d-none");
    document.querySelector("#gameArea").classList.remove("d-none");
    document.querySelector("#errorMsg").textContent = "";
    oGameData.nickNamePlayerOne = document.querySelector("#nick1").value;
    oGameData.nickNamePlayerTwo = document.querySelector("#nick2").value;

    oGameData.colorPlayerOne = document.querySelector("#color1").value;
    oGameData.colorPlayerTwo = document.querySelector("#color2").value;
    console.log(
        oGameData.nickNamePlayerOne,
        oGameData.nickNamePlayerTwo,
        oGameData.colorPlayerOne,
        oGameData.colorPlayerTwo,
    );
    let clearField = document.querySelectorAll("td");

    // clearField.forEach((td) => {
    //     td.textContent = "";
    //     td.style.backgroundColor = "ffffff";
    // });

    for (let field of clearField) {
        field.textContent = "";
        field.style.backgroundColor = "#ffffff";
    }

    let playerChar;
    let playerName;

    if (Math.random() < 0.5) {
        playerChar = oGameData.playerOne;
        playerName = oGameData.nickNamePlayerOne;
        oGameData.currentPlayer = oGameData.playerOne;
    } else {
        playerChar = oGameData.playerTwo;
        playerName = oGameData.nickNamePlayerTwo;
        oGameData.currentPlayer = oGameData.playerTwo;
    }

    document.querySelector(".jumbotron > h1").textContent =
        `Aktuell spelare är ${playerName}`;

    // document.querySelector("#gameArea").addEventListener("click", (event) => {
    //     executeMove(event);
    // });
    document.querySelector("#gameArea").addEventListener("click", executeMove);
}

function executeMove(event) {
    console.log(event.target.tagName);
    if (event.target.tagName === "TD") {
        console.log(event.target.getAttribute("data-id"));

        let currentPos = event.target.getAttribute("data-id");
        if (oGameData.gameField[currentPos] === "") {
            oGameData.gameField[currentPos] = oGameData.currentPlayer;
            console.log(oGameData.gameField);

            if (oGameData.currentPlayer === oGameData.playerOne) {
                event.target.style.backgroundColor = oGameData.colorPlayerOne;
                event.target.textContent = "X";
                oGameData.currentPlayer = "O";
                document.querySelector(".jumbotron > h1").textContent =
                    `Aktuell spelare är ${oGameData.nickNamePlayerTwo}`;
            } else {
                event.target.style.backgroundColor = oGameData.colorPlayerTwo;
                event.target.textContent = "O";
                oGameData.currentPlayer = "X";
                document.querySelector(".jumbotron > h1").textContent =
                    `Aktuell spelare är ${oGameData.nickNamePlayerOne}`;
            }

            if (checkForGameOver() === 1) {
                console.log("Spelare 1 vann");
                gameOver(1);
            } else if (checkForGameOver() === 2) {
                console.log("Spelare 2 vann");
                gameOver(2);
            } else if (checkForGameOver() === 3) {
                console.log("Oavgjort");
                gameOver(3);
            } else {
                console.log("Spelet fortsätter");
            }
        }
    }
}

function gameOver(result) {
    document
        .querySelector("#gameArea")
        .removeEventListener("click", executeMove);

    document.querySelector("#theForm").classList.remove("d-none");
    document.querySelector("#gameArea").classList.add("d-none");

    if (result === 1) {
        document.querySelector(".jumbotron > h1").textContent =
            `${oGameData.nickNamePlayerOne} vann. Spela igen?`;
        console.log(`${oGameData.nickNamePlayerOne} vann`);
    } else if (result === 2) {
        document.querySelector(".jumbotron > h1").textContent =
            `${oGameData.nickNamePlayerTwo} vann`;
        console.log(`${oGameData.nickNamePlayerTwo} vann. Spela igen?`);
    } else {
        document.querySelector(".jumbotron > h1").textContent =
            `Oavgjort! Spela igen?`;
    }
    initGlobalObject();
}

function validateForm() {}

function timer() {}
