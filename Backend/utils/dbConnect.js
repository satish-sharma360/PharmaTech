import mongoose from "mongoose"
import environment from "../config/environment.js"

class Database {
    constructor() {
        this.dbURI = environment.MONGODB_URI
    }
    async connect() {
        try {
            await mongoose.connect(this.dbURI + '/pharma-Management-System')
            console.log(`✅ MongoDB Connected Successfully`)
        } catch (error) {
            console.error("❌ MongoDB Connection Failed:", error.message);
            process.exit(1);
        }

    }
}
export default new Database()