const { Router } = require("express");
const signUpRouter = Router();
const signUpController = require("../controllers/signUpController");

signUpRouter.get("/", signUpController.renderSignUpForm);
signUpRouter.post("/", signUpController.signUpValidation, signUpController.signUpHandler,);

module.exports = signUpRouter;
