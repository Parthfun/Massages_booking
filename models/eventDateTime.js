const mongooes = require("mongoose")

const dateTimeSchema = new mongooes.Schema({
    name: {
        type:String,
        required:true
    },
    date: {
        type:String,
        required: true
    },
    time: { 
        type:String,
        required: true
    }
}) 
module.exports = mongooes.model("Event",dateTimeSchema)