const {Schema, model} = require('mongoose');

const studentSchema = new Schema({
    name: { type: String },
    image: { type: String },
    age: { type: Number },
    course: { type: String },
    cgpa: { type: Number },
    college: { type: String },
});

module.exports = model("multermodel", studentSchema);