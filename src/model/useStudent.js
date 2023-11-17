const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.ObjectId,
        firstName: String,
        lastName: String,
        age: Number,
        courses : [String],
        address:Object,
    },{versionKey: false}
)

const Students = mongoose.model("students" , studentSchema);
module.exports = Students;