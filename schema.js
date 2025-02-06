const Joi = require('joi');

// Schema validation ensures that the data sent to your backend (like through forms or API requests) is structured and formatted correctly.
// Joi is a popular Node.js library used for schema validation. It helps define rules for your data and checks if the input matches those rules.

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        images: Joi.array().items(Joi.string()).optional(),  // Accept multiple images as an array
        category: Joi.string().valid(
            'Trending', 'Rooms', 'Iconic Cities', 'Mountains',
            'Castles', 'Amazing Pools', 'Farms', 'Arctic',
            'Camping', 'Beachfront', 'Boats'
        ).required()
    }).required(),
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required(),
});