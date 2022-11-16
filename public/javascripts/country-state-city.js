$(document).ready(
	$("#country").on("change", function () {
		countryname = $(this).val();
		for (let country of countries) {
			if (country.name === countryname) {
				$("#state").empty();
				$("#city").empty();
				$("#city").append(
					` <option value="">Please Select State First!</option>`
				);
				for (let state of country.states) {
					$("#state").append(
						` <option value="${state.name}">${state.name}</option>`
					);
				}
				break;
			}
		}
	})
);

$(document).ready(
	$("#state").on("change", function () {
		countryname = $("#country").val();
		statename = $("#state").val();
		for (let country of countries) {
			if (country.name === countryname) {
				$("#city").empty();
				for (let state of country.states) {
					if (state.name === statename) {
						for (let city of state.cities) {
							$("#city").append(
								`<option value="${city}">${city}</option>`
							);
						}
						break;
					}
				}
				break;
			}
		}
	})
);
