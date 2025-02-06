const mongoose = require('mongoose');
const Review = require('./review.js');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true,
        min: 0
    },

    price: {
        type: Number,
        required: true
    },

    images: [
        {
            url: String,
            filename: String
        }
    ],
    category: {
        type: String,
        enum: ['Trending', 'Rooms', 'Iconic Cities', 'Mountains',
            'Castles', 'Amazing Pools', 'Farms', 'Arctic',
            'Camping', 'Beachfront', 'Boats'],
        required: true
    },

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    // GeoJSON format specifies coordinates as [longitude, latitude]
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

// Mongoose middleware that runs after a Listing document is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        // Delete all reviews that were associated with the deleted listing
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
})

module.exports = mongoose.model('Listing', listingSchema);