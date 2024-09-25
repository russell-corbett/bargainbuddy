
const express = require('express');
const DataTrends = require('./data_trends/data_trends');
const DisplayGraphs = require('./data_trends/display_graphs');
const router = express.Router();

const dataTrends = new DataTrends();

router.get('/previous-prices/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const prices = await dataTrends.getPreviousPrices(itemId);
  res.json(prices);
});

router.get('/future-prices/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const futurePrices = await dataTrends.predictFuturePrices(itemId);
  res.json(futurePrices);
});

router.get('/display-graph/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const prices = await dataTrends.getPreviousPrices(itemId);
  const futurePrices = await dataTrends.predictFuturePrices(itemId);
  const dataPoints = [...prices, ...futurePrices];
  const displayGraphs = new DisplayGraphs(dataPoints, 'Date', 'Price');
  displayGraphs.makeGraph();
  res.send('Graph displayed');
});

module.exports = router;
