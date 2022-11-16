const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const events = require("../controllers/events");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const { isLoggedIn } = require("../middleware");

router
	.route("/register")
	.get(users.renderRegisterForm)
	.post(catchAsync(users.registerUser));

router
	.route("/login")
	.get(users.renderLoginForm)
	.post(
		passport.authenticate("local", {
			failureFlash: true,
			failureRedirect: "/login",
		}),
		users.loginUser
	);

router.get("/logout", users.logoutUser);

router.get("/:userId/profile", catchAsync(users.profile));
router.post(
	"/events/:eventId/reminder",
	isLoggedIn,
	catchAsync(events.eventReminder)
);

router.get("/events", events.allEvents);

module.exports = router;
