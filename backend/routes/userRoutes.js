const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/createUser", userController.createUser);
router.post("/updateUser", userController.updateUser);
router.post("/deleteUser", userController.deleteUser);
router.post("/connectUserItem", userController.connectUserItem);
router.post("/disconnectUserItem", userController.disconnectUserItem);
router.post("/getUserItems", userController.getUserItems);

module.exports = router;