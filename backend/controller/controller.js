const Student = require("../model/student");
const path = require('path');
const fs = require('fs');

const getData = async (req, res) => {
    try {
        const student = await Student.find();

        res.status(200).json({
            success: true,
            student: student,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const getSingleData = async (req, res) => {
    try {
        const {id} = req.params;
        const student = await Student.findById(id);

        res.status(200).json({
            success: true,
            student: student,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const createData = async (req, res) => {
    try {
        const {name, age, course, cgpa, college} = req.body;
        const student = await Student(req.file ? {image: req.file.filename, name, age, course, cgpa, college} : {name, age, course, cgpa, college} );

        await student.save();
        
        res.status(200).json({
            success: true,
            student: student,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, course, cgpa, college, image } = req.body;

        const updateFields = { name, age, course, cgpa, college, image };

        const student = await Student.findByIdAndUpdate(id, updateFields, { new: true });

        res.status(200).json({
            success: true,
            student,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateStudentImage = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    // Delete old image if exists
    if (student.image) {
      const filePath = path.join(__dirname, '../uploads/', student.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Update with new image filename
    student.image = req.file.filename;
    await student.save();

    res.status(200).json({ success: true, student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteData = async (req, res) => {
    try {
        const {id} = req.params;

        const student = await Student.findByIdAndDelete(id);

        if (student.image) {
            const filePath = path.join(__dirname, '../uploads/', student.image);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        res.status(200).json({
            success: true,
            student: student,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const deleteProfileImage = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (student.image) {
      const filePath = path.join(__dirname, '../uploads/', student.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); 
      }
    }

    student.image = null; 
    await student.save();

    res.status(200).json({ 
        success: true, 
        student: student 
    });
  } catch (error) {
    res.status(500).json({ 
        success: false, 
        message: error.message 
    });
  }
};

module.exports = {getData, getSingleData, createData, updateData, updateStudentImage, deleteData, deleteProfileImage};