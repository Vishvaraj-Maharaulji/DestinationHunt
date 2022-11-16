$(document).ready(
	$("#country").on("change", function () {
		countryname = $(this).val();
		$("#state").empty();
		$("#state").append(`<option value=""></option>`);
		$("#city").empty();
		$("#city").append(`<option value=""></option>`);
		if (countryname !== "") {
			for (let country of countries) {
				if (country.name === countryname) {
					for (let state of country.states) {
						$("#state").append(
							`<option value="${state.name}">${state.name}</option>`
						);
					}
					break;
				}
			}
		}
	})
);

$(document).ready(
	$("#state").on("change", function () {
		countryname = $("#country").val();
		statename = $("#state").val();
		$("#city").empty();
		$("#city").append(`<option value=""></option>`);
		if (statename !== "") {
			for (let country of countries) {
				if (country.name === countryname) {
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
		}
	})
);
