const { venueSchema, reviewSchema, eventSchema } = require("./schemas");
const ExpressError = require("./utils/ExpressError");
const Venue = require("./models/venue");
const Review = require("./models/review");
const Event = require("./models/event");

module.exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.flash("error", "You Must Be Logged In First!");
		res.redirect("/login");
	} else {
		next();
	}
};

module.exports.validateVenue = (req, res, next) => {
	const { error } = venueSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(",");
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.isAuthor = async (req, res, next) => {
	const { id } = req.params;
	const venue = await Venue.findById(id);
	if (!venue.author.equals(req.user._id)) {
		req.flash("error", "You Dont Have Permission to do that!");
		return res.redirect(`/venues/${id}`);
	}
	next();
};

module.exports.validateReview = (req, res, next) => {
	const { error } = reviewSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(",");
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.isReviewAuthor = async (req, res, next) => {
	const { id, reviewId } = req.params;
	const review = await Review.findById(reviewId);
	if (!review.author.equals(req.user._id)) {
		req.flash("error", "You Dont Have Permission to do that!");
		return res.redirect(`/venues/${id}`);
	}
	next();
};

module.exports.validateEvent = (req, res, next) => {
	const { error } = eventSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(",");
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.isEventAuthor = async (req, res, next) => {
	const { id, eventId } = req.params;
	const event = await Event.findById(eventId);
	if (!event.author.equals(req.user._id)) {
		req.flash("error", "You Dont Have Permission to do that!");
		return res.redirect(`/venues/${id}`);
	}
	next();
};
