import "./app.css";

const StockForm = (addStock) => {
  const stockForm = document.querySelector("#stock-form");

  stockForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(stockForm);
    console.log(formData);
    const [stockName, buyPrice, stockAmount, currentPrice] = [
      formData.get("stock-name"),
      Number(formData.get("buy-price")),
      Number(formData.get("stock-amount")),
      Number(formData.get("current-price")),
    ];
    // stockForm으로부터 정보를 얻어, addStock에 데이터를 넘겨주세요.
    addStock(stockName, buyPrice, stockAmount, currentPrice);
    stockForm.reset();
  });
};

const StockTable = (stocks) => {
  const stockTable = document.querySelector(".stock-table");
  const tableBody = stockTable.querySelector(".stock-table-body");

  const tableData = stocks.map(
    ({ stockName, buyPrice, currentPrice, stockAmount }) => ({
      name: stockName,
      earningRate: (((currentPrice - buyPrice) / buyPrice) * 100).toFixed(2),
      profit: (currentPrice - buyPrice) * stockAmount,
    })
  );
  // stocks 데이터를 이용해, tbody 안에 들어갈 태그를 동적으로 만드세요.
  tableBody.innerHTML = tableData.map(
    ({ name, earningRate, profit }) => `
    <tr>
        <td>${name}</td>
        <td>${earningRate}</td>
        <td>${profit}</td>
    </tr>
  `
  );
};

const StockResult = (stocks) => {
  const resultTextElement = document.querySelector(".result-text");

  if (stocks.length === 0) {
    resultTextElement.innerText = "종목을\n추가하세요.";
    return;
  }

  const [buyPriceSum, currentPriceSum] = [
    stocks.reduce((acc, cur) => acc + cur.buyPrice * cur.stockAmount, 0),
    stocks.reduce((acc, cur) => acc + cur.currentPrice * cur.stockAmount, 0),
  ];

  const earningRate = (
    ((currentPriceSum - buyPriceSum) / buyPriceSum) *
    100
  ).toFixed(2);

  const profit = Math.floor(currentPriceSum - buyPriceSum);

  // 총 수익률과 총 수익금을 계산하여, resultText를 채워주세요.
  resultTextElement.innerText = `현재 총 수익률은 ${earningRate}%이며,\n총 수익금은 ${profit}원 입니다.`;
};

const App = () => {
  const stocks = [
    // 테스트 데이터
    // {
    //   stockName: "삼성전자",
    //   buyPrice: 80000,
    //   stockAmount: 8,
    //   currentPrice: 82000,
    // },
    // {
    //   stockName: "SK하이닉스",
    //   buyPrice: 100000,
    //   stockAmount: 12,
    //   currentPrice: 104000,
    // },
    // {
    //   stockName: "앨리스",
    //   buyPrice: 10000,
    //   stockAmount: 120,
    //   currentPrice: 11000,
    // },
  ];

  // StockTable, StockResult 렌더링 결과를, stock 정보를 바탕으로 계산합니다.
  const render = () => {
    StockTable(stocks);
    StockResult(stocks);
  };

  const addStock = (stockName, buyPrice, stockAmount, currentPrice) => {
    stocks.push({ stockName, buyPrice, stockAmount, currentPrice });
    render();
  };

  StockForm(addStock);
  render();
};

module.exports = App;
