const mongoose = require('mongoose')
const dotenv = require('dotenv').config();

const URL = process.env.URI

const connectionDB = async() =>{
    console.log("conecting to Data Base...");
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
        console.log("Connection successful! ")
    } catch (error) {
        console.log("Error while try connect to data base: ", error) 
    }
}

module.exports = {
    connectionDB
}