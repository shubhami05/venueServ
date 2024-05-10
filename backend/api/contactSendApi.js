const { ObjectId } = require("mongodb")
const connectDB = require('../db/dbConnect')



async function ContactSendApi(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection("contactData");
        const { name, mobile, email, message } = req.body;

        const userId = req.session.user.session._id;
        await collection.insertOne({
            userId: ObjectId.createFromHexString(userId),
            name,
            mobile,
            email,
            message
        })
        return res.status(200).json({ message: "Details sent successfully" });

    }
    catch (error) {
        return res.status(500).json("Contact api error:", { message: error.message });
    }
}

module.exports = { ContactSendApi }