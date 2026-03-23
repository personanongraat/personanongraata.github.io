const buyPriceInput = document.getElementById("buyPrice");
const amountInput = document.getElementById("amount");
const saveBtn = document.getElementById("saveBtn");
const deleteBtn = document.getElementById("deleteBtn");
const resultDiv = document.getElementById("result");
const averageDiv = document.getElementById("average");
const assetSelect = document.getElementById("assetSelect");
const assetTitle = document.getElementById("assetTitle");
const tickerDiv = document.getElementById("ticker");
const tickerContent = document.getElementById("tickerContent");

//объект с массивами для ASSетов
let assets = {
  BTC: [],
  USD: [],
  EURO: [],
  GOLD: [],
};
let currentAsset = "BTC";

//пушим в массив стартовые значения
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
runLine();

//сохранение данных в локальное хранилище
function saveData() {
  const amount = parseFloat(amountInput.value);
  const buyPrice = parseFloat(buyPriceInput.value);

  if (isNaN(amount) || isNaN(buyPrice)) {
    alert("Заполните поля");
    return;
  }
  const data = {
    amount: amount,
    buyPrice: buyPrice,
  };
  assets[currentAsset].push(data);

  // сохраняем все активы
  localStorage.setItem("assets", JSON.stringify(assets));

  amountInput.value = "";
  buyPriceInput.value = "";

  showOutput();
  showAverage();
  runLine();
}
// удаление последней записи
function deleteData() {
  assets[currentAsset].pop();
  localStorage.setItem("assets", JSON.stringify(assets));
  showOutput();
  showAverage();
  runLine();
}
//выборочное удаление
function deleteItem(index) {
  assets[currentAsset].splice(index, 1);

  localStorage.setItem("assets", JSON.stringify(assets));

  showOutput();
  showAverage();
  runLine();
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

    row.innerHTML = `
  <span class="amount">amount: ${item.amount}</span>
  <span class="price">price: ${item.buyPrice} $</span>
`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "➖";

    deleteBtn.addEventListener("click", function () {
      deleteItem(index);
    });

    row.appendChild(deleteBtn);

    resultDiv.appendChild(row);
  });
}
//бугущая строка
function runLine() {
  tickerContent.innerHTML = "";

  Object.keys(assets).forEach((key) => {
    let total = 0;

    assets[key].forEach((item) => {
      total += item.amount;
    });

    const itemDiv = document.createElement("div");
    itemDiv.textContent = `${key}: ${total.toFixed(3)}`;

    tickerContent.appendChild(itemDiv);
    tickerContent.innerHTML = content + content;
  });
}
// смена актива
assetSelect.addEventListener("change", function () {
  currentAsset = assetSelect.value;

  showOutput();
  showAverage();
  runLine();
});
// обновление данных
window.onload = function () {
  const savedData = localStorage.getItem("assets");

  if (savedData) {
    assets = JSON.parse(savedData);
    showOutput();
    showAverage();
    runLine();
  }
};
deleteBtn.addEventListener("click", deleteData);
saveBtn.addEventListener("click", saveData);






