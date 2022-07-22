//This is to create the schema to pass into the database
const mongoose = require('mongoose')
const toDoTaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
        required: true,
    }
})

module.exports = mongoose.model('toDoTasks', toDoTaskSchema,'toDoList')
