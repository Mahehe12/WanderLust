const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signUp = async (req, res) => {
    try {
        let { username, firstName, lastName, email, password } = req.body;

        let newUser = new User({ email, username, firstName, lastName });

        const registeredUser = await User.register(newUser, password); //  also this checks if username is unique 
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to WanderLust!");
            res.redirect("/listings");
        });
        // Note: passport.authenticate() middleware invokes req. Login() automatically. 
        // This function is primarily used when users sign up, during which req. login() can be invoked to automatically log in the newly registered user

    } catch (e) {
        req.flash("error", e.message); // we just want flash and not go to some error page based on wrapasync
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome to WanderLust! You are logged in!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    // passport method
    req.logOut((err) => {
        // kuch err aaya toh
        if (err) {
            return next(err);
        }
        // succes in logging out
        req.flash("success", "logged you out!");
        res.redirect("/listings");
    })
};