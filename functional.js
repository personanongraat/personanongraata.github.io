const buyPriceInput = document.getElementById("buyPrice");
const amountInput = document.getElementById("amount");
const saveBtn = document.getElementById("saveBtn");
const resultDiv = document.getElementById("result");
let bitcoinData = [];

function saveData() {
  const buyPrice = buyPriceInput.value;
  const amount = amountInput.value;
  const data = {
    buyPrice: buyPrice,
    amount: amount,
  };
  bitcoinData.push(data);
  localStorage.setItem("bitcoinData", JSON.stringify(bitcoinData));
  showOutput();
}

function showOutput() {
  resultDiv.innerHTML = "";
  bitcoinData.forEach(function (item, index) {
    resultDiv.innerHTML +=
      " amount: " +
      item.buyPrice +
      " price: " +
      item.amount +
      " $ <br>";
  });
}

window.onload = function () {
  const savedData = localStorage.getItem("bitcoinData");

  if (savedData) {
    bitcoinData = JSON.parse(savedData);
    showOutput();
  }
};

saveBtn.addEventListener("click", saveData);

