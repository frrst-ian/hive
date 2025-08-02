const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.getIndex);
indexRouter.get("/", indexController.getAllMessagesHandler);

module.exports = indexRouter;