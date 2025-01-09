const express = require("express")
const app = express()
const mongoose = require("mongoose")

const bodyParser = require("body-parser") //app.use
const cors = require("cors") //app.use
const dotenv = require("dotenv") //.config()

app.use(bodyParser.json())
app.use(cors())
dotenv.config()

// mongodb ile elaqelendiririk eger elaqelenme ugurludursa 3500 portunda dinlenilir
mongoose.connect(process.env.ConnectionUrl)
.then(()=>{
    console.log("Connected success!");
    app.listen(process.env.ListenPort, () => {
        console.log("listen port 3500");
    })
})
.catch((err) => console.log("Connection failed: ", err))

app.get("/", (req, res) => {
    res.send("Hello Node API")
})

const carsSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: [true, "Please enter car's brand name"]
    },
    modelName: {
        type: String,
        required: [true, "Please enter car's modal name"]
    },
    year : {
        type: Number,
        required: [true, "Please enter car's year"]
    },
    color: {
        type: String,
        required: [true, "Please enter car's color"]
    },
    isNew: Boolean
})

const carsModel = mongoose.model("cars", carsSchema)

// all cars
app.get("/cars", async (req, res) => {
    let cars = await carsModel.find()
    res.send(cars)
})

// add car
app.post("/cars", async (req, res) => {
    await carsModel(req.body).save()
    res.send({
        message: "Success post",
        data: req.body
    })
})

// get by id car
app.get("/cars/:id", async (req, res) => {
    let { id } = req.params
    let myCar = await carsModel.findById(id)
    res.send(myCar)
})

// find id and delete car
app.delete("/cars/:id", async (req, res) => {
    let { id } = req.params
    await carsModel.findByIdAndDelete(id)
    res.send({
        message: "Success delete"
    })
})