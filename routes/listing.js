const express = require("express");
// Router is a way to organize routes into separate, modular files instead of writing everything in router.js. 
// This makes the code cleaner and more manageable.
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js"); // All working part of listings
const multer = require("multer"); // Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
const { storage } = require("../CloudConfig.js");
const upload = multer({ storage }); // Store files temporarily in 'uploads' folder

// Less repetition (path is written only once). Better readability. router.route()
router.route("/")
    .get(wrapAsync(listingController.index)) // Index Route
    .post(isLoggedIn, upload.array("listing[image]", 5), validateListing, wrapAsync(listingController.createNewListing)); // Post the data

router.get("/search", listingController.searchListing);


// Privacy Policy Route
router.get("/privacy", wrapAsync(listingController.renderPrivacyPage));

// Terms & Conditions Route
router.get("/terms", wrapAsync(listingController.renderTermsPage));

// New Route 
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

router.route("/:id")
    .get(wrapAsync(listingController.showListing)) //Show Route
    .put(isLoggedIn, isOwner, upload.array("images"), validateListing, wrapAsync(listingController.updateListing)) // Put the editted content - update
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); // Delete Route

// Edit listing
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;