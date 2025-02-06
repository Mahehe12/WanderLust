if (process.env.NODE_ENV != "production") {
    require('dotenv').config()  // loads env variables from .env to process.env 
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate"); // helps creating boilerplate codes n layouts
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session"); // a middleware that helps in managing user sessions in Express
const flash = require("connect-flash"); // a middleware for storing and displaying flash messages
const passport = require("passport"); // Passport is Express-compatible authentication middleware for Node.js
const LocalStrategy = require("passport-local"); // Passport strategy for authenticating with a username and password
const User = require("./models/user.js");
//  It helps to persist user sessions across server restarts
const MongoStore = require('connect-mongo'); // connect-mongo, which saves session data in MongoDB instead of RAM 

const listingRouter = require('./routes/listing.js'); // Importing listing router
const reviewRouter = require('./routes/review.js'); // Importing reviews router
const userRouter = require("./routes/user.js"); // Importing users router

const DB_URL = process.env.ATLAS_DB_URL;

main()
    .then(() => {
        console.log(`DB is connected!`);
    }).catch((err) => {
        console.log("Error connecting to the database:", err);
    });

async function main() {
    await mongoose.connect(DB_URL);
}

// Built-in middlewares
app.use(express.json()); // body-parser ( understandable form )
app.use(express.urlencoded({ extended: true })); // parse nested objects using urlencoded function
app.use(express.static(path.join(__dirname, "public"))); // serve static files to client by accessing public folder

app.set("view engine", "ejs"); // setting ejs as view 
app.set("views", path.join(__dirname, "views")); // whatever the sys it makes correct path
app.use(methodOverride("_method")); // html - get n post but with this npm we can send put delete
app.engine("ejs", ejsMate);

// Create a session store
const store = MongoStore.create({
    mongoUrl: DB_URL, // MongoDB Atlas or local database URL
    crypto: {
        secret: process.env.secret// Encrypts session data for security
    },
    touchAfter: 24 * 3600 // Updates the session only once per 24 hours
});

// Handle errors
store.on("error", () => {
    console.log("Error in MONGO SESSION STORE", err);
})

const sessionOptions = {
    store,
    secret: process.env.SECRET, // Used to sign the session ID cookie - connect.sid
    resave: false, // Prevents unnecessary saving of session if not modified
    saveUninitialized: false, // Does not create a session until something is stored

    // A cookie is a small piece of data stored in the user's browser
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week
        maxAge: 7 * 24 * 60 * 60 * 1000, // Expires after 1 week
        httpOnly: true // Prevents JavaScript from accessing it (for security)
    },
};

app.use(session(sessionOptions));
app.use(flash());

// To implement passport we need to already use session

// Required to use Passport.js for authentication
app.use(passport.initialize());
// Enables session support for persistent login sessions (so users don't have to log in on every request)
app.use(passport.session());
// User.authenticate() => Hashes and verifies passwords automatically and Checks if the entered password matches the stored hash.
passport.use(new LocalStrategy(User.authenticate()));
// Defines how user data is stored in the session
passport.serializeUser(User.serializeUser());
// Defines how to retrieve user data from the session.
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");  // res.locals stores data that is available in every template
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.use("/listings", listingRouter); // Using the router with listings
app.use("/listings/:id/reviews", reviewRouter); // Using the router with reviews
app.use("/", userRouter);// Using the router with user

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

// Wrong Data Insert Error Handling Middle Ware ↓
app.use((err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong!";

    console.error("Error:", err); // Debugging log

    res.status(statusCode).render("error", { statusCode, message });
});


app.listen(8080, () => {
    console.log(`Server is listening at port 8080`);
});
