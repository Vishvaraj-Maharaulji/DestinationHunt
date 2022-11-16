const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
	{
		body: String,
		rating: Number,
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

reviewSchema.virtual("date").get(function () {
	const d = new Date();
	let z = parseInt((d.getTime() - this.updatedAt.getTime()) / 1000);
	let s = "";
	if (z >= 60 * 60 * 24 * 7) {
		z = parseInt(z / (60 * 60 * 24 * 7));
		s = "w";
	} else if (z >= 60 * 60 * 24) {
		z = parseInt(z / (60 * 60 * 24));
		s = "d";
	} else if (z >= 60 * 60) {
		z = parseInt(z / (60 * 60));
		s = "h";
	} else if (z >= 60) {
		z = parseInt(z / 60);
		s = "m";
	} else {
		s = "s";
	}
	return z + s;
});

module.exports = mongoose.model("Review", reviewSchema);
