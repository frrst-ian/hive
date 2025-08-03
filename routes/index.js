const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.getAllMessages);
indexRouter.post("/delete", indexController.deleteMessageHandler);

module.exports = indexRouter;