const mongoose = require("mongoose")

const CarSchema = new mongoose.Schema({
  title: {type:String, required:true},
  desc: {type:String, required:true},
  img: {type: String, required: true},
  model: {type: String, required: true,},
  year: {type: Number, required: true},
  price: {type: Number, required:true},
  categories: {type: Array}

},
{
    timestamps: true
})


module.exports = mongoose.model("Car", CarSchema)