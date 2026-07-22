var currentGame;

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".btn-big");
    for (const button of buttons) {
        button.addEventListener("click", function () {
            const gameType = this.dataset.type;
            initialiseGame(gameType);
        });
    }

    document.getElementById("submit").addEventListener("click", checkAnswer);

    document.addEventListener("keydown", function (e) {
        if (!e.shiftKey && !e.ctrlKey && !e.altKey && e.key === "Enter") {
            checkAnswer();
        }
    });

    initialiseGame("add");
});

function initialiseGame(gameType) {
    const game = makeGame(gameType);

    document.getElementById("operand1").innerText = game.op1;
    document.getElementById("operand2").innerText = game.op2;
    document.getElementById("operator").innerHTML = game.op;
    document.getElementById("answer-box").value = "";

    currentGame = game;
}

function makeGame(gameType) {
    function make(op1, op2, r, op) {
        return { type: gameType, op1: op1, op2: op2, result: r, op: op };
    }

    const num1 = Math.floor(Math.random() * 25) + 1;
    const num2 = Math.floor(Math.random() * 25) + 1;

    switch (gameType) {
        case "add":
            return make(num1, num2, num1 + num2, "+");
        case "subtract":
            return make(num1 + num2, num2, num1, "-");
        case "multiply":
            return make(num1, num2, num1 * num2, "&times;");
        case "divide":
            return make(num1 * num2, num2, num1, "&divide;");
    }
}

function checkAnswer() {
    const answer = document.getElementById("answer-box").value;
    if (parseInt(answer) === currentGame.result) {
        document.getElementById("correct").innerText++;
        initialiseGame(currentGame.type);
    } else {
        document.getElementById("incorrect").innerText++;
    }
}