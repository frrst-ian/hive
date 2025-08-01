const { Router } = require("express");
const newMessageRouter = Router();
const newMessageController = require("../controllers/newMessageController");

newMessageRouter.get("/" , newMessageController.renderNewMessageForm);

module.exports = newMessageRouter;