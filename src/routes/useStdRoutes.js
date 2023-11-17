const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const Students = require("../model/useStudent")

// create user 
router.post('/studentCreate', async (req, res) => {
    try {
        const studentData = new Students({
            _id: new mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            courses: req.body.courses,
            address: req.body.address
        })
        const result = await studentData.save()
        res.json(result)
    } catch (error) {
        res.json({ error })
        console.log(error + "something went wrong")
    }
})
// read data
router.get('/students', async (req, res) => {
    try {
        const students = await Students.find()
        res.json(students)
    } catch (error) {
        res.json(error)
    }
})

// read specific data 
router.get('/students/:id', async (req, res) => {
    try {
        const studentId = req.params.id
        const userData = await Students.findById(studentId)
        if (!userData) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({ userData: userData })
    } catch (error) {
        return res.status(500).json({ message: "Error: " + error.message })
    }
})

// update student
router.put('/updateStudent/:id', async (req, res) => {
    try {
        const studentId = req.params.id
        const dataToUpdate = new Students({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            courses: req.body.courses,
            address: req.body.address
        })
        const updateData = await Students.findByIdAndUpdate(studentId, dataToUpdate, {
            new: true
        })
        if (!updateData) {
            return res.status(404).json({ message: 'Student not found' })
        }
        // res.status(200).json({ message: 'Student successfully updated' })
        return res.status(200).json({ updateData: updateData })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

// delete student
router.delete('/students/:id', async (req, res) => {
    try {
        const studentId = req.params.id
        const deleted = await Students.findByIdAndDelete(studentId)
        if (!deleted) {
            return res.status(404).json({ message: "student not found" })
        }
        return res.status(200).json({ message: "student deleted successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

module.exports = router