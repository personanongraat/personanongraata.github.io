const buyPriceInput = document.getElementById("buyPrice");
const amountInput = document.getElementById("amount");
const saveBtn = document.getElementById("saveBtn");
const deleteBtn = document.getElementById("deleteBtn");
const resultDiv = document.getElementById("result");
const averageDiv = document.getElementById("average");
const assetSelect = document.getElementById("assetSelect");
const assetTitle = document.getElementById("assetTitle");
//объект с массивами для ASSетов
let assets = {
  BTC: [],
  USD: [],
  EURO: [],
  GOLD: [],
};
let currentAsset = "BTC";

// пушим в массив стартовые значения
assets.BTC.push(
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
//сохранение данных в локальное хранилище
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
  assets[currentAsset].push(data);

  // сохраняем все активы
  localStorage.setItem("assets", JSON.stringify(assets));

  buyPriceInput.value = "";
  amountInput.value = "";

  showOutput();
  showAverage();
}
// удаление последней записи
function deleteData() {
  assets[currentAsset].pop();
  localStorage.setItem("assets", JSON.stringify(assets));
  showOutput();
  showAverage();
}
//выборочное удаление
function deleteItem(index) {
  assets[currentAsset].splice(index, 1);

  localStorage.setItem("assets", JSON.stringify(assets));

  showOutput();
  showAverage();
}
// просчет и вывод средней цены покупки
function showAverage() {
  let total = 0;

  assets[currentAsset].forEach(function (item) {
    total += item.buyPrice;
  });
  let average = total / assets[currentAsset].length;

  averageDiv.innerHTML = "average buy price = " + average.toFixed(2) + " $";
}
// вывод данных
function showOutput() {
  resultDiv.innerHTML = "";

  assets[currentAsset].forEach(function (item, index) {
    const row = document.createElement("div");

    row.innerHTML =
      "amount: " + item.amount + " price: " + item.buyPrice + " $ ";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "➖";

    deleteBtn.addEventListener("click", function () {
      deleteItem(index);
    });

    row.appendChild(deleteBtn);

    resultDiv.appendChild(row);
  });
}
// смена актива
assetSelect.addEventListener("change", function () {
  currentAsset = assetSelect.value;
  assetTitle.innerText = currentAsset;

  showOutput();
  showAverage();
});
// обновление данных
window.onload = function () {
  const savedData = localStorage.getItem("assets");

  if (savedData) {
    assets = JSON.parse(savedData);
    showOutput();
    showAverage();
  }
};
deleteBtn.addEventListener("click", deleteData);
saveBtn.addEventListener("click", saveData);





