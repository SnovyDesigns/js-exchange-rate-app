import getSymbolFromCurrency from 'currency-symbol-map';

const currencyOne = document.querySelector('#currency-one'),
  currencyTwo = document.querySelector('#currency-two'),
  amountOne = document.querySelector('#amount-one'),
  amountTwo = document.querySelector('#amount-two'),
  flagOne = document.querySelector('#flag-one'),
  flagTwo = document.querySelector('#flag-two'),
  symbolOne = document.querySelector('#symbol-one'),
  symbolTwo = document.querySelector('#symbol-two'),
  swapBtn = document.querySelector('#swap'),
  rate = document.querySelector('#rate');

// Fetch exchange rates & update the DOM
function calculate() {
  const currencyOneValue = currencyOne.value,
    currencyTwoValue = currencyTwo.value;

  // Update flag and currency symbol
  updateFlagAndSymbol(currencyOneValue, currencyTwoValue);

  // Fetch data
  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOneValue}`)
    .then(res => res.json())
    .then(data => {
      const rateValue = data.rates[currencyTwoValue];
      rate.textContent = `1 ${currencyOneValue} = ${rateValue} ${currencyTwoValue}`;

      amountTwo.value = (amountOne.value * rateValue).toFixed(3);
    });
}

// Update flag and currency symbol
function updateFlagAndSymbol(currencyOneValue, currencyTwoValue) {
  flagOne.className = `currency-flag currency-flag-xl currency-flag-${currencyOneValue.toLowerCase()}`;
  flagTwo.className = `currency-flag currency-flag-xl currency-flag-${currencyTwoValue.toLowerCase()}`;
  symbolOne.textContent = getSymbolFromCurrency(currencyOneValue);
  symbolTwo.textContent = getSymbolFromCurrency(currencyTwoValue);
}

// Event listeners
currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
amountTwo.addEventListener('change', calculate);
swapBtn.addEventListener('click', () => {
  [currencyTwo.value, currencyOne.value] = [
    currencyOne.value,
    currencyTwo.value
  ];
  [amountTwo.value, amountOne.value] = [amountOne.value, amountTwo.value];
  calculate();
});

calculate();
