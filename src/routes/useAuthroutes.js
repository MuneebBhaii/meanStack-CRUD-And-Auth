const mongoose = require('mongoose')
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()
const Auth = require('../model/useAuth')

// Auth create account
router.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const userdata = new Auth({
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const user = await userdata.save()
        return res.status(200).json({ message:"account create successfully",user})
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
})

// login routes
router.post('/login', async (req, res) => {
    const user = await Auth.findOne({email: req.body.email})
    console.log("user: ", user);
    if (!user) {
        return res.status(404).json({ message:"User not found"})
    }
    const passwordMatched = await bcrypt.compare(
        req.body.password,
        user.password
    )
    if (!passwordMatched){
        return res.status(404).json({ message: "Password is incorrect"})
    }
    const token = jwt.sign({id: user._id , admin:false}, process.env.SECURE_KEY)
    res.status(200).json({ message:"successfully login" + token })
})

module.exports = router
