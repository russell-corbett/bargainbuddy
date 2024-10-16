const db = require("../database");

exports.createItem = async (req, res) => {
  const modelNumber = req.body.modelNumber;
  const item = await db.getRecord("Item", { modelNumber });
  if (item) {
    return res.status(400).json({ error: "Item already exists" });
  }
  try {
    const record = await db.createRecord("Item", req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: "Error creating record" });
  }
};

exports.updateItem = async (req, res) => {
  const name = req.body.name;
  const modelNumber = req.body.modelNumber;
  const item = await db.getRecord("Item", { name, modelNumber });
  if (!item) {
    return res.status(400).json({ error: "Item does not exist" });
  }
  try {
    const record = await db.updateRecord("Item", { name, modelNumber }, req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: "Error updating record" });
  }
};

exports.createPriceLog = async (req, res) => {
  const itemId = req.body.itemId;
  const item = await db.getRecord("Item", { itemId });
  if (!item) {
    return res.status(400).json({ error: "Item does not exist" });
  }
  try {
    const record = await db.createRecord("Price", req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: "Error creating record" });
  }
};