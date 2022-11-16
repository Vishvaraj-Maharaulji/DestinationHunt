const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
	type: "string",
	base: joi.string(),
	messages: {
		"string.escapeHTML": "{{#label}} must not include HTML!",
	},
	rules: {
		escapeHTML: {
			validate(value, helpers) {
				const clean = sanitizeHtml(value, {
					allowedTags: [],
					allowedAttributes: {},
				});
				if (clean !== value)
					return helpers.error("string.escapeHTML", { value });
				return clean;
			},
		},
	},
});

const Joi = BaseJoi.extend(extension);

module.exports.venueSchema = Joi.object({
	venue: Joi.object({
		title: Joi.string().required().escapeHTML(),
		category: Joi.string().required().escapeHTML(),
		description: Joi.string().required().escapeHTML(),
		location: Joi.object({
			address: Joi.string().required().escapeHTML(),
			city: Joi.string().required().escapeHTML(),
			state: Joi.string().required().escapeHTML(),
			country: Joi.string().required().escapeHTML(),
		}).required(),
		averageRating: Joi.number().min(0).max(5),
		distance: Joi.number().min(0),
	}).required(),
	deleteImages: Joi.array(),
});

module.exports.reviewSchema = Joi.object({
	review: Joi.object({
		body: Joi.string().required().escapeHTML(),
		rating: Joi.number().required().min(1).max(5),
	}).required(),
});

module.exports.eventSchema = Joi.object({
	event: Joi.object({
		title: Joi.string().required().escapeHTML(),
		body: Joi.string().required().escapeHTML(),
		date: Joi.date().required().min(Date.now()),
	}).required(),
});
