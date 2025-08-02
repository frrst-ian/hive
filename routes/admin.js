const { Router } = require("express");
const adminRouter = Router();
const adminController = require("../controllers/adminController");

adminRouter.get("/", adminController.renderAdminForm);
adminRouter.post("/", adminController.adminHandler);

module.exports = adminRouter;