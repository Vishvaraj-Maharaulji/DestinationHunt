let pos;
let category = "all";
let title = "";
let country = "";
let state = "";
let city = "";
let radius = 0;
let sort = "none";

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition((position) => {
		pos = position;
		ajaxCall();
	});
} else {
	console.error("Geolocation is not supported by this browser.");
}

$("#apply").on("click", function () {
	title = $("#title").val();
	category = $("#category").val();
	country = $("#country").val();
	state = $("#state").val();
	city = $("#city").val();
	radius = $("#radius").val();
	sort = $("#sort").val();
	ajaxCall();
});

function ajaxCall() {
	$(document).ready(
		$.ajax({
			url: "/venues/filters",
			async: "true",
			data: {
				lat: pos.coords.latitude,
				long: pos.coords.longitude,
				title,
				category,
				country,
				state,
				city,
				radius,
				sort,
			},
			type: "POST",
			success: function (result) {
				$("#venues .row").empty();
				console.log(result);
				result.venues.forEach((venue) => {
					$("#venues .row").append(
						`<div class="col">
            <div class="card shadow mt-2 mb-3">
  ${
		venue.images.length === 0
			? `<img
  src="https://res.cloudinary.com/dr3bbn6yy/image/upload/c_scale,h_150,w_180/v1667901022/DestinationHunt/No-Image-Placeholder.svg_x8zcq3.png"
  class="card-img-top"
  alt="noimage"
/>`
			: `<img
src=${venue.images[0].url.replace("/upload", "/upload/w_180,h_150")} 
class="card-img-top"
alt="venueimage"
/>`
	}<div class="card-body">
  <a href=/venues/${venue.id}>
    <h5 class="card-title text-center">${venue.title}</h5>
  </a>
  ${
		category !== "all"
			? `<p class="text-center my-4">
      Category : ${venue.category}
      </p>
      `
			: ``
	}
  ${
		country !== ""
			? `<p class="text-center my-4">
      Location : ${venue.location.city},${venue.location.state},${venue.location.country}
      </p>
      `
			: ``
	}
  ${
		sort === "distance" || Number(radius) !== 0
			? `<p class="text-center my-4">
      Distance : ${venue.distance.toFixed(2)} KM
      </p>
      `
			: ``
	}
  ${
		sort === "rating" && venue.averageRating === 0
			? `<p class="text-center my-4">
      Rating : Not Yet Rated!
      </p>
      `
			: ``
	}
      ${
				sort === "rating" && venue.averageRating !== 0
					? `<p class="d-flex align-items-center justify-content-center">
          Rating : ${venue.averageRating.toFixed(1)} (${
							venue.reviews.length
					  })&nbsp;&nbsp;
<i
  class="mb-1"
  data-star="${venue.averageRating.toFixed(1)}"
></i>
</p>
`
					: ``
			}
  </div>
</div>
</div>
`
					);
				});
			},
		})
	);
}

//`<li> <a href=/venues/${venue.id} > ${venue.title} </a> </li>`;
