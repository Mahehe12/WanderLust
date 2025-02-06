const Listing = require("../models/listing");
const initData = require("./data.js");
const mongoose = require("mongoose");

const DB_URL = "mongodb+srv://51110904335:51110904335@cluster0.f2mfl.mongodb.net/wanderlust?retryWrites=true&w=majority&appName=Cluster0";

main()
    .then(() => {
        console.log(`DB is connected!`);
    }).catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(DB_URL);
}

const initDB = async () => {
    try {
        // Clear existing listings
        await Listing.deleteMany({});
        // Add owner in already initialised listings 
        initData.data = initData.data.map((obj) => ({...obj, owner: '679cf6733ede4ca72e015a5a'}))
        // Insert new listings
        await Listing.insertMany(initData.data);
        console.log("Database initialized successfully");
    } catch (err) {
        console.error("Error initializing database:", err);
    }
};

initDB();