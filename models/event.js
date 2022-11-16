const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
	title: String,
	body: String,
	venue: { type: Schema.Types.ObjectId, ref: "Venue" },
	author: { type: Schema.Types.ObjectId, ref: "User" },
	date: {
		type: Date,
		min: Date.now(),
	},
});

module.exports = mongoose.model("Event", eventSchema);
