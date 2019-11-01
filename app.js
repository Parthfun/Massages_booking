if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require("body-parser")
const indexRouter = require("./routes/index")
const eventRouter = require("./routes/event")

const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true})
const db = mongoose.connection
db.on("error" , error => console.error(error))
db.once("open" , () => console.log("connected to Mongooes"))

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", "layouts/layout")
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: "10mb", extended:false}))
app.use("/", indexRouter)
app.use("/events", eventRouter)


app.listen(process.env.PORT || 3000)

