import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL

const connect = async () => {
    const connectionState = mongoose.connection.readyState

    if (connectionState == 1) {
        return
    }

    if (connectionState == 2) {
        return
    }

    try {
        await mongoose.connect(MONGODB_URL, {
            dbName: "temp-connect",
            bufferCommands: false,
        })
        console.log("Database connected")
    } catch (error) {
        console.log("Error while connection to db : ", error)
        throw new Error("Error connecting to database.")
    }
}

const disconnect = async () => {
    const connectionState = mongoose.connection.readyState;

    // Check if there is a connection to disconnect
    if (connectionState === 0) {
        console.log("No active database connection to disconnect.");
        return;
    }

    // Check if the connection is in the process of disconnecting
    if (connectionState === 3) {
        console.log("Database connection is already disconnecting.");
        return;
    }

    try {
        await mongoose.disconnect();
        console.log("Database disconnected successfully")
    } catch (error) {
        console.log("Error while disconnecting from db: ", error);
        throw new Error("Error disconnecting from the database.");
    }
};

const db = {connect, disconnect}

export default db