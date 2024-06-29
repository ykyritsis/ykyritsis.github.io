document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('worthForm');
    const queryDiv = document.getElementById('query');
    const resultDiv = document.getElementById('result');
    const percentageChangeDiv = document.getElementById('percentageChange');
    const companyInput = document.getElementById('company');
    const tickerInput = document.getElementById('stock');
    const suggestionsDiv = document.getElementById('suggestions');

    companyInput.addEventListener('input', async () => {
        const companyName = companyInput.value.trim();
        if (companyName.length < 2) {
            suggestionsDiv.innerHTML = '';
            return;
        }

        const apiKey = '8USFM8Q09C1OHYYB';
        const searchUrl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${companyName}&apikey=${apiKey}`;

        try {
            const responseSearch = await fetch(searchUrl);
            const searchData = await responseSearch.json();
            const bestMatches = searchData.bestMatches;

            if (bestMatches && bestMatches.length > 0) {
                suggestionsDiv.innerHTML = '';
                const uniqueMatches = [];
                bestMatches.forEach(match => {
                    const symbol = match['1. symbol'];
                    const name = match['2. name'];
                    const region = match['4. region'];
                    const currency = match['8. currency'];

                    // Filter by region and currency
                    if (region === 'United States' && currency === 'USD' && !uniqueMatches.some(item => item.symbol === symbol)) {
                        uniqueMatches.push({ symbol, name });
                    }
                });

                uniqueMatches.forEach(match => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.textContent = `${match.symbol} - ${match.name}`;
                    suggestionItem.addEventListener('click', () => {
                        tickerInput.value = match.symbol;
                        companyInput.value = match.name;
                        suggestionsDiv.innerHTML = '';
                    });
                    suggestionsDiv.appendChild(suggestionItem);
                });
            } else {
                suggestionsDiv.innerHTML = 'No matches found';
            }
        } catch (error) {
            console.error('Error:', error);
            suggestionsDiv.innerHTML = 'An error occurred. Please try again later.';
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const stock = tickerInput.value.trim().toUpperCase();
        const year = document.getElementById('year').value.trim();
        const amount = document.getElementById('amount').value.trim();

        // Validate input
        if (!stock || !year || !amount || isNaN(amount) || isNaN(year) || year.length !== 4) {
            resultDiv.textContent = 'Please provide valid input.';
            return;
        }

        const apiKey = '8USFM8Q09C1OHYYB';
        const stockTimeSeriesUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${stock}&apikey=${apiKey}`;

        try {
            const responseTimeSeries = await fetch(stockTimeSeriesUrl);
            const timeSeriesData = await responseTimeSeries.json();

            if (timeSeriesData['Monthly Adjusted Time Series']) {
                const timeSeries = timeSeriesData['Monthly Adjusted Time Series'];
                const firstMonth = `${year}-01-31`;
                const lastMonth = Object.keys(timeSeries)[0];

                if (!timeSeries[firstMonth]) {
                    resultDiv.textContent = `No data available for ${stock} in ${year}.`;
                    return;
                }

                const initialPrice = parseFloat(timeSeries[firstMonth]['5. adjusted close']);
                const finalPrice = parseFloat(timeSeries[lastMonth]['5. adjusted close']);

                const initialShares = amount / initialPrice;
                const finalValue = initialShares * finalPrice;
                const gainLoss = finalValue - amount;
                const percentageChange = (gainLoss / amount) * 100;

                // Format the final value with commas
                const formattedFinalValue = finalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                queryDiv.textContent = `What if I bought $${amount} worth of ${companyInput.value} (${stock}) in ${year}?`;
                resultDiv.innerHTML = `It would be worth <strong>$${formattedFinalValue}</strong> today.`;
                percentageChangeDiv.innerHTML = `You would be <span style="color: ${gainLoss >= 0 ? 'green' : 'red'};"><strong>${gainLoss >= 0 ? 'up' : 'down'} ${percentageChange.toFixed(2)}%</strong></span>.`;
            } else {
                resultDiv.textContent = 'Unable to retrieve stock data. Please check the stock symbol and try again.';
            }
        } catch (error) {
            console.error('Error:', error);
            resultDiv.textContent = 'An error occurred. Please try again later.';
        }
    });
});
