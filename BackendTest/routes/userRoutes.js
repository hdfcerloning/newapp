const express = require('express');
const myRouter = express.Router();
const Valid = require('../model/userSchema.js');
const bcrypt = require('bcryptjs')
myRouter.post('/verify', async (req, res) => {
    const { email, pass } = req.body;

    if (!email || !pass) {
        return res.status(200).json({
            message: "Not valid credentials"
        })
    }
    const user = await Valid.findOne({ email });
    if (!user) {
        return res.status(400).json({
            message: "Not a valid user"
        })
    }
    const compare = bcrypt.compare(pass, user.pass);
    if (compare) {
        return res.status(200).json({
            message: "Successfully log in",
            user
        });
    }
});

module.exports = myRouter;