let speedTypingEl = document.getElementById("speedTypingTest");
let timerEl = document.getElementById("timer");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let quoteInputEl = document.getElementById("quoteInput");
let resultEl = document.getElementById("result");
let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");
let spinnerEl = document.getElementById("spinner");

let intervalId;
let counter = 0;

function timerStart() {
    intervalId = setInterval(function() {
        counter = counter + 1;
        timerEl.textContent = counter;
        console.log(counter);
    }, 1000);
};

function getQuote() {
    let url = "https://apis.ccbp.in/random-quote"
    let options = {
        method: "GET"
    };

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinner.classList.add("d-none")
            let {
                search_results
            } = jsonData;
            let quote = jsonData.content;
            quoteDisplayEl.textContent = quote;
            console.log(jsonData.content);

        });
}
getQuote();
timerStart();
resetBtnEl.onclick = function() {
    spinnerEl.classList.remove("d-none")
    timerStart();
    getQuote();
    counter = 0;
    result.textContent = " ";
    quoteInputEl.value = " ";

};
submitBtnEl.onclick = function() {
    if (quoteInputEl.value === quoteDisplayEl.textContent) {
        clearInterval(intervalId);
        resultEl.textContent = "You typed in " + counter + "seconds";
    } else {
        resultEl.textContent = "You typed incorrect sentence";
    }
};