const User = require("../models/user");
const Venue = require("../models/venue");

module.exports.renderRegisterForm = (req, res) => {
	res.render("users/register");
};

module.exports.registerUser = async (req, res, next) => {
	try {
		const { email, username, password } = req.body;
		const user = new User({ email, username });
		const registerUser = await User.register(user, password);
		req.login(registerUser, (err) => {
			if (err) return next(err);
			req.flash("success", "WELCOME TO DESTINATION HUNT!");
			res.redirect("/venues");
		});
	} catch (e) {
		req.flash("error", e.message);
		res.redirect("/register");
	}
};

module.exports.renderLoginForm = (req, res) => {
	res.render("users/login");
};

module.exports.loginUser = (req, res) => {
	req.flash("success", "WELCOME BACK!");
	const redirectUrl = req.session.returnTo || "/venues";
	delete req.session.returnTo;
	res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res) => {
	req.logOut((err) => {
		if (err) return next(err);
		req.flash("success", "Goodbye!");
		res.redirect("/venues");
	});
};

module.exports.profile = async (req, res) => {
	const { userId } = req.params;
	const user = await User.findById(userId);
	const venues = await Venue.find({ author: userId });
	res.render("users/profile", { user, venues });
};
