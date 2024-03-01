const express = require('express');
const { Mongoose } = require('mongoose');
const app = express();
const mongoose = require('mongoose');


app.listen(5004, ()=>{
    console.log('Backend server is running on port 5004!');
})