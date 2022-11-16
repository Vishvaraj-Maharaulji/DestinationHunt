const getLocation = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			ajaxCall(position);
		});
	} else {
		console.error("Geolocation is not supported by this browser.");
	}
};

function ajaxCall(position) {
	console.log(position);
	console.log(venue.geometry.coordinates);
	$.ajax({
		url: `/venues/${venue._id}/book`,
		type: "POST",
		data: {
			lat: position.coords.latitude,
			long: position.coords.longitude,
		},
		success: function (data) {
			console.log("Inside Success", data);
			const layerList = document.getElementById("travelMenu");
			const inputs = layerList.getElementsByTagName("input");

			for (const input of inputs) {
				input.onclick = (layer) => {
					const layerId = layer.target.id;
					let totalPrice;
					$("#rideBody").empty();
					if (layerId === "bike") {
						if (data.distance <= 20) {
							totalPrice = data.distance * 6;
							$("#rideBody").append(`
              <h4>Distance :- ${data.distance.toFixed(2)} KM</h4>
              <h4>Price Per KM :- &#8377; 6/KM</h4>
              <h4>Total Price For Bike :- &#8377; ${totalPrice.toFixed(
								2
							)}</h4>
              <h4>Have a Safe Journey</h4>`);
						} else {
							totalPrice = data.distance * 8;
							$("#rideBody").append(`
              <h4>Distance :- ${data.distance.toFixed(2)} KM</h4>
              <h4>Price Per KM :- &#8377; 8/KM</h4>
              <h4>Total Price For Bike :- &#8377; ${totalPrice.toFixed(
								2
							)}</h4>
              <h4>Have a Safe Journey</h4>`);
						}
					} else if (layerId === "auto") {
						if (data.distance <= 20) {
							totalPrice = data.distance * 8;
							$("#rideBody").append(`
              <h4>Distance :- ${data.distance.toFixed(2)} KM</h4>
              <h4>Price Per KM :- &#8377; 8/KM</h4>
              <h4>Total Price For Auto :- &#8377; ${totalPrice.toFixed(
								2
							)}</h4>
              <h4>Have a Safe Journey</h4>`);
						} else {
							totalPrice = data.distance * 11;
							$("#rideBody").append(`
              <h4>Distance :- ${data.distance.toFixed(2)} KM</h4>
              <h4>Price Per KM :- &#8377; 11/KM</h4>
              <h4>Total Price For Auto :- &#8377; ${totalPrice.toFixed(
								2
							)}</h4>
              <h4>Have a Safe Journey</h4>`);
						}
					} else if (layerId === "sedan") {
						if (data.distance <= 20) {
							totalPrice = data.distance * 15;
							$("#rideBody").append(`
              <h4>Distance :- ${data.distance.toFixed(2)} KM</h4>
              <h4>Price Per KM :- &#8377; 15/KM</h4>
              <h4>Total Price For Prime Sedan :- &#8377; ${totalPrice.toFixed(
								2
							)}</h4>
              <h4>Have a Safe Journey</h4>`);
						} else {
							totalPrice = data.distance * 20;
							$("#rideBody").append(`
              <h4>Distance :- ${data.distance.toFixed(2)} KM</h4>
              <h4>Price Per KM :- &#8377; 20/KM</h4>
              <h4>Total Price For Prime Sedan :- &#8377; ${totalPrice.toFixed(
								2
							)}</h4>
              <h4>Have a Safe Journey</h4>`);
						}
					} else if (layerId === "suv") {
						if (data.distance <= 20) {
							totalPrice = data.distance * 25;
							$("#rideBody").append(`
              <h4>Distance :- ${data.distance.toFixed(2)} KM</h4>
              <h4>Price Per KM :- &#8377; 25/KM</h4>
              <h4>Total Price For Prime SUV :- &#8377; ${totalPrice.toFixed(
								2
							)}</h4>
              <h4>Have a Safe Journey</h4>`);
						} else {
							totalPrice = data.distance * 30;
							$("#rideBody").append(`
              <h4>Distance :- ${data.distance.toFixed(2)} KM</h4>
              <h4>Price Per KM :- &#8377; 30/KM</h4>
              <h4>Total Price For Prime SUV :- &#8377; ${totalPrice.toFixed(
								2
							)}</h4>
              <h4>Have a Safe Journey</h4>`);
						}
					}
				};
			}
		},
		error: function (error) {
			console.log("Inside Error");
		},
	});
}

$("#bookButton").on("click", getLocation);
