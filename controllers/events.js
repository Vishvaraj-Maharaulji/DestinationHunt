const Venue = require("../models/venue");
const Event = require("../models/event");
const schedule = require("node-schedule");
const nodemailer = require("nodemailer");

module.exports.allEvents = async (req, res) => {
	await Event.deleteMany({ date: { $lt: Date.now() } });
	const events = await Event.find({}).populate("venue");
	events.sort(function (a, b) {
		return a.date - b.date;
	});
	res.render("events/index", { events });
};

// module.exports.createEventForm = (req, res) => {
// 	res.render("events/new");
// };

module.exports.createEvent = async (req, res) => {
	const venue = await Venue.findById(req.params.id);
	const event = new Event(req.body.event);
	event.author = req.user._id;
	event.venue = venue;
	venue.events.push(event);
	await event.save();
	await venue.save();
	req.flash("success", "Successfully created new event!");
	res.redirect(`/venues/${venue._id}`);
};

module.exports.deleteEvent = async (req, res) => {
	const { id, eventId } = req.params;
	await Venue.findByIdAndUpdate(id, { $pull: { events: eventId } });
	await Event.findByIdAndDelete(eventId);
	req.flash("success", "Successfully deleted event!");
	res.redirect(`/venues/${id}`);
};

module.exports.eventReminder = async (req, res) => {
	const { eventId } = req.params;
	const event = await Event.findById(eventId).populate("venue");

	//SET AND DEFINE EMAIL CODE
	let mailOptions = {
		from: process.env.FROM_EMAIL_ADDRESS,
		to: req.user.email,
		subject: "Event Reminder from Team DestinationHunt!",
		html: `
    <h3>
  		${event.title}
	  </h3>
	  <hr />
	  <div>
		  <p >
		    <span>&bull; </span>
		    <span><b>Description :</b></span>
        ${event.body}
	  	</p>
		  <p >
			  <span>&bull; </span>
			  <span><b>Hosted At :</b></span>
			  ${event.venue.title}
		  </p>
  		<p>
	  		<span>&bull; </span>
		  	<span><b>Address :</b></span>
			  ${event.venue.location.address}
  		</p>
	  	<p >
		  	<span >&bull; </span>
			  <span ><b>Date :</b></span>
			  ${event.date.getDate()}/${event.date.getMonth()}/${event.date.getFullYear()}
		  </p>
  		<p >
	  		<span >&bull; </span>
		  	<span ><b>Time :</b></span>
			  ${
					event.date.getHours() === 12 || event.date.getHours() === 0
						? 12
						: event.date.getHours() % 12
				}:${event.date.getMinutes()}
			  ${event.date.getHours() >= 12 ? "PM" : "AM"}
  		</p>
    <div>
`,
	};

	// e-mail transport configuration
	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.FROM_EMAIL_ADDRESS,
			pass: process.env.FROM_EMAIL_PASSWORD,
		},
	});

	//Scdule and Send Email  CODE
	const sendEmail = function () {
		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log("Email sent: " + info.response);
			}
		});
	};

	sendEmail();

	const eventDate = new Date(
		event.date.getFullYear(),
		event.date.getMonth(),
		event.date.getDate(),
		event.date.getHours(),
		event.date.getMinutes(),
		0
	);

	const date1 = new Date(eventDate);
	const date2 = new Date(eventDate);

	date1.setHours(date1.getHours() - 3); // date of 3 hours before the event
	date2.setDate(date2.getDate() - 1); // date of 1 day before the event

	schedule.scheduleJob(date1, sendEmail);
	schedule.scheduleJob(date2, sendEmail);

	req.flash("success", "Successfully set reminder!");
	res.redirect("/events");
};
