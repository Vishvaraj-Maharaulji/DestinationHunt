const express = require("express");
const router = express.Router();
const venues = require("../controllers/venues");
const { isLoggedIn, isAuthor, validateVenue } = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
	.route("/")
	.get(catchAsync(venues.index))
	.post(
		isLoggedIn,
		upload.array("image"),
		validateVenue,
		catchAsync(venues.createVenue)
	);

router.post("/filters", catchAsync(venues.filter));

router.get("/new", isLoggedIn, venues.renderNewForm);

router
	.route("/:id")
	.get(catchAsync(venues.showVenue))
	.put(
		isLoggedIn,
		isAuthor,
		upload.array("image"),
		validateVenue,
		catchAsync(venues.updateVenue)
	)
	.delete(isLoggedIn, isAuthor, catchAsync(venues.deleteVenue));

router.post("/:id/book", catchAsync(venues.book));

router.get(
	"/:id/edit",
	isLoggedIn,
	isAuthor,
	catchAsync(venues.renderEditForm)
);

module.exports = router;
