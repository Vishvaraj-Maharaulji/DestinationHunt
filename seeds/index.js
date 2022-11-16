const mongoose = require("mongoose");
const Venue = require("../models/venue");
const locations = require("../seeds/locations");
const { category, title } = require("../seeds/seedHelpers");

mongoose.connect("mongodb://localhost:27017/destination-hunt", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const seedDB = async () => {
	await Venue.deleteMany({});
	for (let i = 0; i < 10; i++) {
		const random10 = Math.floor(Math.random() * 10);
		const venue = new Venue({
			author: "634a38151d62ae819f55654e",
			category: category[random10 % 3],
			title: title[random10 % 9],
			location: {
				country: locations[random10 % 6].country,
				city: locations[random10 % 6].city,
				state: locations[random10 % 6].state,
				address:
					locations[random10 % 6].country +
					locations[random10 % 6].city +
					locations[random10 % 6].state,
			},
			geometry: {
				type: "Point",
				coordinates: [
					locations[random10 % 6].longitude,
					locations[random10 % 6].latitude,
				],
			},
			images: [
				{
					url: "https://res.cloudinary.com/dr3bbn6yy/image/upload/v1633096273/YelpCamp/ungrkbwq9yp2ruubnvem.jpg",
					filename: "YelpCamp/mphnygpsdo8lokt3w1b3",
				},
				{
					url: "https://res.cloudinary.com/dr3bbn6yy/image/upload/v1633096273/YelpCamp/ungrkbwq9yp2ruubnvem.jpg",
					filename: "YelpCamp/nk24ykdqnjce0eusv6ui",
				},
			],
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, eaque. Reiciendis laborum animi, sunt vel temporibus nesciunt expedita officia perferendis quis repellat repudiandae, iusto aliquid asperiores ut alias, quia eaque!",
			averageRating: random10 % 5,
		});
		await venue.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
