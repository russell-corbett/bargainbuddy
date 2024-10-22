const { searchProduct } = require('./scrape');
  
const main = async () => {
    const productName = 'Logitech Pebble Keys 2 K380s Multi-Device Bluetooth Wireless Keyboard';
    const prices = await searchProduct(productName);

    console.log(`\nPrices for "${productName}":\n`);

    for (const [store, storePrices] of Object.entries(prices)) {
        console.log(`\n${store}:\n`);
        if (storePrices.length === 0) {
            console.log('No results found.');
        } else {
            storePrices.forEach((item, index) => {
                console.log(`\nItem ${index + 1}:`);
                console.log(`Name: ${item.name}`);
                console.log(`Price: ${item.price}`);
                console.log(`Link: ${item.link}`);
            });
        }
    }
};

main();
