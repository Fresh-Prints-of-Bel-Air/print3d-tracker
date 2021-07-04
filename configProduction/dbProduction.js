const mongoose = require("mongoose");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const db = process.env.mongoURI;

const connectDBProduction = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDBProduction;