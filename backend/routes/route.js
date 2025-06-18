const express = require('express');
const { getData, createData, updateData, deleteData, getSingleData, deleteProfileImage, updateStudentImage } = require('../controller/controller');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => 
        cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage: storage});

router.get('/', getData);
router.get('/:id', getSingleData);
router.post('/', upload.single('image') , createData);
router.put('/:id', upload.single('image') , updateData);
router.put('/:id/image', upload.single('image'), updateStudentImage);
router.delete('/:id', deleteData);
router.delete('/delete-profile/:id', deleteProfileImage);

module.exports = router;