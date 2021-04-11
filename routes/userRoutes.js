const userController = require("./../controller/userContoller");
const express = require("express");
const router = express.Router();
router.route("/sign-up").post(userController.signUp);
router.route("/login").post(userController.login);
router.route("/all-users").get(userController.allUser);
module.exports = router;
