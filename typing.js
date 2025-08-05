let timer = document.getElementById("timer");
let quoteDisplay = document.getElementById("quoteDisplay");
let result = document.getElementById("result");
let quoteInput = document.getElementById("quoteInput");
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let spinner = document.getElementById("spinner");

let counter = 0;
let setId;

function getRandomQuote() {
    spinner.classList.remove("d-none");
    return fetch("https://apis.ccbp.in/random-quote")
        .then((response) => response.json())
        .then((data) => {
            spinner.classList.add("d-none");
            return data.content;
        });
}

function startTimer() {
    setId = setInterval(() => {
        counter++;
        timer.textContent = counter;
    }, 1000);
}

function renderNewQuote() {
    getRandomQuote().then(function(quote) {
        quoteDisplay.textContent = quote;
        quoteInput.value = "";
        counter = 0;
        clearInterval(setId);
        timer.textContent = 0;
        startTimer();
    });
}

resetBtn.addEventListener("click", () => {
    result.textContent = "";
    renderNewQuote();
});

submitBtn.addEventListener("click", function() {
    clearInterval(setId);
    if (quoteDisplay.textContent === quoteInput.value) {
        result.textContent = `You typed in ${counter} seconds!`;
    } else {
        result.textContent = "You typed an incorrect statement.";
    }
});

window.onload = renderNewQuote;
