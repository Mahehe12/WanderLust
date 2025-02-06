const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
    // Extract 'category' from URL query parameters
    const { category } = req.query;
    let allListings;

    // If a category is specified in the URL
    if (category) {
        // Find listings that match the specific category
        allListings = await Listing.find({ category });
    } else {
        // If no category is specified, fetch all listings
        allListings = await Listing.find({});
    }

    res.render("listings/index.ejs", {
        allListings,
        category,  // Pass category to check is there are any listings available 
        noListings: allListings.length === 0
    });
};

module.exports.renderNewForm = async (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.createNewListing = async (req, res) => {
    // console.log(req.files); // Check if multiple files are uploaded
    const address = req.body.listing.location;

    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`);
    const data = await response.json();

    let latitude, longitude;
    if (data && data.length > 0) {
        latitude = parseFloat(data[0].lat);
        longitude = parseFloat(data[0].lon);
    } else {
        req.flash("error", "Unable to geocode the provided address.");
        return res.redirect("/listings/new");
    }

    console.log("Geocoded Location:", latitude, longitude);

    let images = req.files.map(file => ({ url: file.path, filename: file.filename })); // Extract URLs & filenames

    const newListing = new Listing(req.body.listing);

    newListing.images = images; // Store multiple images
    newListing.owner = req.user._id; // curr user ki id store ho 

    // Add map-related data
    newListing.geometry = {
        type: 'Point',
        coordinates: [longitude, latitude] // Store GeoJSON format
    };

    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};


module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    // Find the listing by its ID and also fetch its related reviews
    // when you access listing.reviews, instead of just IDs, you get complete review details
    const listing = await Listing.findById(id).populate({
        path: "reviews",
        populate: { path: "author" },
    }).populate("owner");

    if (!listing) {
        req.flash("error", "The listing you requested, Does Not Exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "The listing you requested, Does Not Exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
    try {
        let { id } = req.params;
        const listing = await Listing.findById(id);

        // First update listing basic info
        const updatedListing = { ...req.body.listing };

        // If new images were uploaded
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => ({
                url: file.path,
                filename: file.filename
            }));
            updatedListing.images = [...(updatedListing.images || listing.images), ...newImages];
        }

        // Update the listing
        await Listing.findByIdAndUpdate(id, updatedListing);
        req.flash("success", "Listing Updated!");
        res.redirect(`/listings/${id}`);

    } catch (err) {
        console.log(err);
        req.flash("error", "Error updating listing");
        res.redirect(`/listings/${id}/edit `);
    }
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings"); // Redirects to index page after deletion
}

// Search listings by location and country
module.exports.searchListing = async (req, res) => {
    const { location, country } = req.query;

    try {
        let query = {};
        if (location) {
            query.$or = [
                { location: { $regex: location, $options: "i" } },
                { country: { $regex: location, $options: "i" } } // Allow country search in same field
            ];
        }

        const listings = await Listing.find(query);
        res.render("listings/index.ejs", { allListings: listings, noListings: listings.length === 0 });
    } catch (error) {
        console.error("Search error:", error);
        req.flash("error", "An error occurred while searching.");
        res.redirect("/listings");
    }
};

module.exports.renderPrivacyPage = async (req, res) => {
    res.render("listings/privacy.ejs");
};

module.exports.renderTermsPage = async (req, res) => {
    res.render("listings/terms.ejs");
}