// JavaScript function to call the Python Flask API
async function callPlotPriceTrends(itemID, dates, prices, store) {
    const url = 'http://localhost:5000/plot-price-trends';  // Ensure the Flask server is running at this URL
    const payload = {
        itemID: itemID,
        dates: dates,
        prices: prices,
        store: store
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('File saved at:', data.file_path);
            return data.file_path;
        } else {
            console.error('Error occurred:', response.statusText);
        }
    } catch (error) {
        console.error('Request failed:', error);
    }
}