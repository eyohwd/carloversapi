const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const carRoute =require("./routes/car")
const cors = require("cors")
const authRoute = require("./routes/auth")


dotenv.config()
mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB connect successful!")).catch((err) => { console.log(err) })

app.listen(process.env.PORT || 8000, () => { console.log("Backend server is running") })


app.use(cors())
app.use(express.json())
app.use("/api/cars", carRoute)
app.use("/api/auth", authRoute)


