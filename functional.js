const buyPriceInput = document.getElementById("buyPrice");
const amountInput = document.getElementById("amount");
const saveBtn = document.getElementById("saveBtn");
const deleteBtn = document.getElementById("deleteBtn");
const resultDiv = document.getElementById("result");
const average = document.getElementById("average");
let bitcoinData = [];
bitcoinData.push(
  { amount: 0.010057, buyPrice: 87700 },
  { amount: 0.001388, buyPrice: 72000 },
  { amount: 0.006702, buyPrice: 71776 },
  { amount: 0.007592, buyPrice: 67000 },
  { amount: 0.007311, buyPrice: 68526 },
  { amount: 0.010044, buyPrice: 78000 },
  { amount: 0.007485, buyPrice: 66801 },
  { amount: 0.007173, buyPrice: 69770 },
  { amount: 0.007395, buyPrice: 67520 },
  { amount: 0.006933, buyPrice: 66270 },
  { amount: 0.015793, buyPrice: 63240 },
  { amount: 0.011967, buyPrice: 64235 },
);
showOutput();
showAverage();

function saveData() {
  const buyPrice = parseFloat(buyPriceInput.value);
  const amount = parseFloat(amountInput.value);
  if (isNaN(buyPrice) || isNaN(amount)) {
    alert("Заполните поля");
    return;
  }
  const data = {
    buyPrice: buyPrice,
    amount: amount,
  };
  bitcoinData.push(data);
  localStorage.setItem("bitcoinData", JSON.stringify(bitcoinData));
  buyPriceInput.value = "";
  amountInput.value = "";
  showOutput();
  showAverage();
}
function deleteData() {
  bitcoinData.pop();
  showOutput();
  showAverage();
}
function showAverage() {
let total = 0;
bitcoinData.forEach(function(item){
  total + item.buyPrice;
});
  let average = total / bitcoinData.length;
  averageDiv.innerHTML = "average buy price = " + average.toFixed(2) + " $";
}

function showOutput() {
  resultDiv.innerHTML = "";
  bitcoinData.forEach(function (item, index) {
    resultDiv.innerHTML +=
      " amount: " + item.buyPrice + " price: " + item.amount + " $ <br>";
  });
}

window.onload = function () {
  const savedData = localStorage.getItem("bitcoinData");

  if (savedData) {
    bitcoinData = JSON.parse(savedData);
    showOutput();
    showAverage();
  }
};
deleteBtn.addEventListener("click", deleteData);
saveBtn.addEventListener("click", saveData);



