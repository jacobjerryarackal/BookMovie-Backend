import mongoose from "mongoose"

const dbConnection = async() => {
    try {
        mongoose.connect(process.env.MONGO_URL).then(() => {
            console.log("Database has been connected successfully !");
        })
    } catch (error) {
        console.log(error);
    }
}

export default dbConnection