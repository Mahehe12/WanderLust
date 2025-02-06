const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    newReview.author = req.user._id; // add author along with new review

    listing.reviews.push(newReview); // add in reviews arrays

    await newReview.save();
    await listing.save(); // existing doc ke db main kuch change karna hai toh we use save()

    req.flash("success", "New Review Created!");

    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;

    // The $pull operator in MongoDB is used to remove specific values from an array
    // Remove the review ID from the `reviews` array in the Listing document
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // Delete the actual review from the Review collection
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted");

    res.redirect(`/listings/${id}`);
};