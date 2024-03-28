import mongoose from "mongoose";

async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/Ecom`)
        console.log("Database Connection Successfull: ", connectionInstance.connection.host)
    } catch (error) {
        console.log("Database connection Failed :", error)
        process.exit(1)
    }
}

export { connectDB }