const mongoose = require("mongoose");
const Review = require("./review");
const Event = require("./event");
const Schema = mongoose.Schema;
const { cloudinary } = require("../cloudinary");

const ImageSchema = new Schema({ url: String, filename: String });

ImageSchema.virtual("thumbnail").get(function () {
	return this.url.replace("/upload", "/upload/w_225");
});

ImageSchema.virtual("cardImage").get(function () {
	return this.url.replace("/upload", "/upload/w_180,h_150");
});

const options = { toJSON: { virtuals: true } };

const VenueSchema = new Schema(
	{
		title: String,
		images: [ImageSchema],
		geometry: {
			type: {
				type: String,
				enum: ["Point"],
				required: true,
			},
			coordinates: {
				type: [Number],
				required: true,
			},
		},
		category: String,
		description: String,
		location: {
			address: String,
			city: String,
			state: String,
			country: String,
		},
		distance: {
			type: Number,
			default: 0,
			min: 0,
		},
		averageRating: {
			type: Number,
			default: 0,
			min: 0,
			max: 5,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		reviews: [
			{
				type: Schema.Types.ObjectId,
				ref: "Review",
			},
		],
		events: [
			{
				type: Schema.Types.ObjectId,
				ref: "Event",
			},
		],
	},
	options
);

VenueSchema.post("findOneAndDelete", async (doc) => {
	if (doc) {
		await Review.deleteMany({ _id: { $in: doc.reviews } });
		await Event.deleteMany({ _id: { $in: doc.events } });
		for (let img of doc.images) {
			await cloudinary.uploader.destroy(img.filename);
		}
	}
});

module.exports = mongoose.model("Venue", VenueSchema);
