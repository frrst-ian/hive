const { Router } = require("express");
const membershipController = require("../controllers/membershipController");
const membershipRouter = Router();

membershipRouter.get("/", membershipController.renderMembershipForm);
membershipRouter.post("/", membershipController.membershipHandler);

module.exports = membershipRouter;