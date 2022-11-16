const express = require("express");
const router = express.Router({ mergeParams: true });
const events = require("../controllers/events");
const catchAsync = require("../utils/catchAsync");
const {
	isLoggedIn,
	isEventAuthor,
	validateEvent,
} = require("../middleware");

router.post(
	"/",
	isLoggedIn,
	validateEvent,
	catchAsync(events.createEvent)
);

router.delete(
	"/:eventId",
	isLoggedIn,
	isEventAuthor,
	catchAsync(events.deleteEvent)
);

module.exports = router;
