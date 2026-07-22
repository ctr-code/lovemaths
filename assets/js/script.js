"use strict";

// Use a function to avoid polluting the global namespace
(function () {

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

        document.getElementById("answer-box").addEventListener("keydown", function (e) {
            if (!e.shiftKey && !e.ctrlKey && !e.altKey && e.key === "Enter") {
                e.preventDefault();
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
        document.getElementById("answer-box").focus();

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
        if (answer !== "") {
            if (parseInt(answer) === currentGame.result) {
                updateScore("correct");
                initialiseGame(currentGame.type);
            } else {
                updateScore("incorrect");
            }
        }
        document.getElementById("answer-box").focus();
    }

    function updateScore(id) {
        const score = document.getElementById(id);
        score.innerText++;
        // Highlight the updated score with an animation
        score.previousElementSibling.animate(
            [
                { opacity: 0 }, // 0%
                { opacity: 1 }, // 50%
                { padding: "10rem", translate: "-9rem -9rem", opacity: 0 } // 100%
            ],
            250
        );
    }
})();
