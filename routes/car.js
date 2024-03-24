const router = require("express").Router()
const Car = require("../models/Car")

router.get("/", async(req, res)=>{
    const qCategory = req.query.category
    try {
       const cars = qCategory ? await Car.find({categories: {
        $in:[qCategory],
    },}) : await Car.find()
       res.status(200).json(cars)
    } catch (error) {
        res.status(500).json(console.log(error))
    }
})

router.post("/", async(req, res)=>{
    const newCar = new Car(req.body)
    try {
       const savedCar = await newCar.save() 
       res.status(200).json(savedCar)
    } catch (error) {
        res.status(500).json(console.log(error))
    }
})

router.get("/find/:id", async(req, res)=>{
    try {
        const car = await Car.findById(req.params.id)
        res.status(200).json(car)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put("/:id", async(req, res)=>{
    try {
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
        res.status(201).json(updatedCar)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete("/:id", async(req, res)=>{
    try {
         await Car.findByIdAndDelete(req.params.id)
        res.status(200).json("Car deleted successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})





module.exports = router