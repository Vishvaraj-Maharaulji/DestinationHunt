const Venue = require("../models/venue");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
	const venue = await Venue.findById(req.params.id);
	const review = new Review(req.body.review);
	review.author = req.user._id;
	currTotalReviews = venue.reviews.length;
	if (currTotalReviews === 0) {
		venue.averageRating = review.rating;
	} else {
		currTotalRating = venue.averageRating * currTotalReviews;
		venue.averageRating =
			(currTotalRating + review.rating) / ++currTotalReviews;
	}
	venue.reviews.push(review);
	await review.save();
	await venue.save();
	req.flash("success", "Successfully created new review!");
	res.redirect(`/venues/${venue._id}`);
};

module.exports.deleteReview = async (req, res) => {
	const { id, reviewId } = req.params;
	const venue = await Venue.findById(id);
	const review = await Review.findById(reviewId);
	currTotalReviews = venue.reviews.length;
	if (currTotalReviews === 1) {
		venue.averageRating = 0;
	} else {
		currTotalRating = venue.averageRating * currTotalReviews;
		venue.averageRating =
			(currTotalRating - review.rating) / --currTotalReviews;
	}
	await venue.save();
	await Venue.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
	await Review.findByIdAndDelete(reviewId);
	req.flash("success", "Successfully deleted the review!");
	res.redirect(`/venues/${id}`);
};
