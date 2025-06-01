
let history = JSON.parse(localStorage.getItem("history")) || [];
let winCount = history.filter(r => r === true).length;
let loseCount = history.filter(r => r === false).length;
let predictionEl = document.getElementById("prediction");
let historyLog = document.getElementById("history-log");

function getPrediction() {
    let accuracyBoost = winCount - loseCount;
    let random = Math.random() * 100;
    let prediction = (random + accuracyBoost) % 100 < 50 ? "Big" : "Small";
    return prediction;
}

function updateUI() {
    let pred = getPrediction();
    predictionEl.innerText = `Prediction: ${pred}`;
    renderHistory();
}

function recordResult(win) {
    history.push(win);
    if (history.length > 100) history.shift();
    localStorage.setItem("history", JSON.stringify(history));
    winCount = history.filter(r => r === true).length;
    loseCount = history.filter(r => r === false).length;
    updateUI();
}

function renderHistory() {
    historyLog.innerHTML = "<h3>History</h3>";
    history.slice(-10).forEach((res, i) => {
        historyLog.innerHTML += `<div>${res ? '✅ Win' : '❌ Lose'}</div>`;
    });
}

window.onload = () => {
    updateUI();
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('serviceWorker.js');
    }
};
