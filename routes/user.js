const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/user");
const router = express.Router();

router.route("/signup")
    .get(userController.renderSignupForm) // Render signup form
    .post(wrapAsync(userController.signUp)); // add user

// log user in
router.route("/login")
    .get(userController.renderLoginForm) // render login form
    .post(
        passport.authenticate("local", {
            failureRedirect: "/login", failureFlash: true
        }), saveRedirectUrl, userController.login);

// logout user
router.get("/logout", userController.logout);

module.exports = router;