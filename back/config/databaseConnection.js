const mongoose = require('mongoose');

// database connection with mongoose
const databaseConnection = async () => {
    console.log(process.env.DATABASE_URI);
    try {
        const client = await mongoose.connect(process.env.DATABASE_URI);
        if (client) console.log("Database connection is successful!");

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = databaseConnection;