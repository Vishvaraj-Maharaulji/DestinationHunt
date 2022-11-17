const Venue = require("../models/venue");
const mapBoxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mapBoxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require("../cloudinary");
const calcDistance = require("../utils/calcDistance");
const { CountryLite } = require("country-state-city-js");

module.exports.filter = async (req, res) => {
	let venues;
	console.log(req.body);

	if (req.body.category === "all") {
		venues = await Venue.find({});
	} else {
		console.log(req.body.filter);
		venues = await Venue.find({ category: req.body.category });
		console.log(venues);
	}

	if (req.body.title.trim().length !== 0) {
		venues = venues.filter((venue) => {
			return venue.title
				.toLocaleLowerCase()
				.includes(req.body.title.toLocaleLowerCase());
		});
	}

	if (req.body.country.trim().length !== 0) {
		venues = venues.filter((venue) => {
			return (
				venue.location.country.toLocaleLowerCase() ===
				req.body.country.toLocaleLowerCase()
			);
		});
	}

	if (req.body.state.trim().length !== 0) {
		venues = venues.filter((venue) => {
			return (
				venue.location.state.toLocaleLowerCase() ===
				req.body.state.toLocaleLowerCase()
			);
		});
	}

	if (req.body.city.trim().length !== 0) {
		venues = venues.filter((venue) => {
			return (
				venue.location.city.toLocaleLowerCase() ===
				req.body.city.toLocaleLowerCase()
			);
		});
	}

	const source = [req.body.long, req.body.lat];
	for (let venue of venues) {
		venue.distance = calcDistance(source, venue.geometry.coordinates);
	}

	if (Number(req.body.radius) !== 0) {
		venues = venues.filter((venue) => {
			return venue.distance <= Number(req.body.radius);
		});
	}

	if (req.body.sort === "name") {
		venues.sort((a, b) => {
			return a.title
				.toLocaleLowerCase()
				.localeCompare(b.title.toLocaleLowerCase());
		});
	}

	if (req.body.sort === "rating") {
		venues.sort((a, b) => {
			if (b.averageRating === a.averageRating) {
				return b.reviews.length - a.reviews.length;
			}
			return b.averageRating - a.averageRating;
		});
	}

	if (req.body.sort === "distance") {
		venues.sort((a, b) => {
			return a.distance - b.distance;
		});
	}

	res.send({ venues });
};

module.exports.index = async (req, res) => {
	const venues = await Venue.find({});
	const countries = CountryLite({ states: true, cities: true });
	res.render("venues/index", { venues, countries });
};

module.exports.renderNewForm = (req, res) => {
	const countries = CountryLite({ states: true, cities: true });
	res.render("venues/new", { countries });
};

module.exports.createVenue = async (req, res) => {
	const { address, city, state, country } = req.body.venue.location;
	const venueLocation = `${address}, ${city}, ${state}, ${country}`;
	const geoData = await geocoder
		.forwardGeocode({
			query: venueLocation,
			limit: 1,
		})
		.send();
	const venue = new Venue(req.body.venue);
	venue.geometry = geoData.body.features[0].geometry;
	venue.images = req.files.map((f) => ({
		url: f.path,
		filename: f.filename,
	}));
	venue.author = req.user._id;
	await venue.save();
	req.flash("success", "Successfully added a new venue!");
	res.redirect(`/venues/${venue._id}`);
};

module.exports.book = async (req, res) => {
	const { id } = req.params;
	const venue = await Venue.findById(id);
	const source = [req.body.long, req.body.lat];
	const distance = calcDistance(source, venue.geometry.coordinates);
	res.send({ distance });
};

module.exports.showVenue = async (req, res) => {
	const { id } = req.params;
	const venue = await Venue.findById(id)
		.populate({
			path: "reviews",
			populate: { path: "author" },
		})
		.populate({
			path: "events",
			populate: { path: "author" },
		})
		.populate("author");
	if (!venue) {
		req.flash("error", "Cannot find that venue!");
		return res.redirect("/venues");
	}
	venue.events.sort(function (a, b) {
		return a.date - b.date;
	});
	res.render("venues/show", { venue });
};

module.exports.renderEditForm = async (req, res) => {
	const { id } = req.params;
	const venue = await Venue.findById(id);
	if (!venue) {
		req.flash("error", "Cannot edit that venue!");
		return res.redirect("/venues");
	}
	const countries = CountryLite({ states: true, cities: true });
	res.render("venues/edit", { venue, countries });
};

module.exports.updateVenue = async (req, res) => {
	const { id } = req.params;
	const venue = await Venue.findByIdAndUpdate(id, { ...req.body.venue });
	const { address, city, state, country } = req.body.venue.location;
	const venueLocation = `${address}, ${city}, ${state}, ${country}`;
	const geoData = await geocoder
		.forwardGeocode({
			query: venueLocation,
			limit: 1,
		})
		.send();
	venue.geometry = geoData.body.features[0].geometry;
	const imgs = req.files.map((f) => ({
		url: f.path,
		filename: f.filename,
	}));
	venue.images.push(...imgs);
	await venue.save();
	if (req.body.deleteImages) {
		for (let filename of req.body.deleteImages) {
			await cloudinary.uploader.destroy(filename);
		}
		await venue.updateOne({
			$pull: { images: { filename: { $in: req.body.deleteImages } } },
		});
	}
	req.flash("success", "Successfully updated venue!");
	res.redirect(`/venues/${venue._id}`);
};

module.exports.deleteVenue = async (req, res) => {
	const { id } = req.params;
	await Venue.findByIdAndDelete(id);
	req.flash("success", "Successfully deleted venue!");
	res.redirect(`/venues`);
};
