mapboxgl.accessToken = mapBoxToken;

console.log(mapBoxToken);
console.log(venue.geometry.coordinates);

const map = new mapboxgl.Map({
	container: "map", // container ID
	style: "mapbox://styles/mapbox/outdoors-v11", // style URL
	center: venue.geometry.coordinates, // starting position [lng, lat]
	zoom: 15, // starting zoom
});

map.addControl(new mapboxgl.NavigationControl() /* "bottom-right"*/);

const markerHeight = 50;
const markerRadius = 10;
const linearOffset = 15;
const popupOffsets = {
	top: [0, markerHeight - linearOffset - markerRadius],
	"top-left": [linearOffset, markerHeight - markerRadius - linearOffset],
	"top-right": [-linearOffset, markerHeight - markerRadius - linearOffset],
	bottom: [0, -markerHeight],
	"bottom-left": [
		linearOffset,
		(markerHeight - markerRadius + linearOffset) * -1,
	],
	"bottom-right": [
		-linearOffset,
		(markerHeight - markerRadius + linearOffset) * -1,
	],
	left: [markerRadius, (markerHeight - markerRadius) * -1],
	right: [-markerRadius, (markerHeight - markerRadius) * -1],
};

const popup = new mapboxgl.Popup({
	offset: popupOffsets,
	closeButton: false,
	closeOnClick: false,
});

const marker = new mapboxgl.Marker({ color: "#FF0000" })
	.setLngLat(venue.geometry.coordinates)
	.setPopup(popup)
	.addTo(map);

const markerDiv = marker.getElement();

markerDiv.addEventListener("mouseenter", () => {
	// Change the cursor style as a UI indicator.
	map.getCanvas().style.cursor = "pointer";

	// Copy coordinates array.
	const coordinates = venue.geometry.coordinates;
	const description = `<h3>${venue.title}</h3><p>${venue.location.address}</p>`;

	// Populate the popup and set its coordinates
	// based on the feature found.
	popup.setLngLat(coordinates).setHTML(description).addTo(map);
});

markerDiv.addEventListener("mouseleave", () => {
	map.getCanvas().style.cursor = "";
	popup.remove();
});

const layerList = document.getElementById("menu");
const inputs = layerList.getElementsByTagName("input");

for (const input of inputs) {
	input.onclick = (layer) => {
		const layerId = layer.target.id;
		map.setStyle("mapbox://styles/mapbox/" + layerId);
	};
}

$("#maps").on("shown.bs.modal", () => {
	map.resize();
});
