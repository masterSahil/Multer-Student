const express = require('express');
const app = express();
const connectDB = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const router = require('./routes/route');

const PORT = process.env.PORT;

connectDB();

app.use(cors())
app.use(express.json());
app.use('/', router);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, ()=> {
    console.log(`App is Listening on Port ${PORT}`);
});