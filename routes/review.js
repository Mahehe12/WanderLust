const express = require("express");
// When the child router (reviews.js) needs to access :id from the parent router
// mergeParams: true ensures that the child router inherits parameters from the parent, enabling proper routing
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isAuthor } = require("../middleware.js");
const reviewController = require("../controllers/review.js");

// Add Reviews POST
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview))

// Delete Review Route POST
router.delete("/:reviewId", isAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;