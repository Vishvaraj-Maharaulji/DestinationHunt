const turf = require("@turf/turf");

module.exports = (source, destination) => {
	const from = turf.point(source);
	const to = turf.point(destination);

	const distance = turf.distance(from, to);
	console.log(distance, to);
	return distance;
};
