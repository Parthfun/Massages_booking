const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const urlencodedParser = (bodyParser.urlencoded({limit: "10mb", extended: false}))
const DateTime = require("../models/eventDateTime")

// All Booking route
router.get("/", async (req, res) => {
  let searchOption = {}
  if (req.query.name != null && req.query.name != "") {
    searchOption.name = new RegExp(req.query.name, "i")
  }
  try {
    const events = await DateTime.find(searchOption)
    res.render("events/index", {
      events: events,
      searchOption: req.query
    })
  } catch {
    res.redirect("/")
  }
})

// New Booking route
router.get("/new", (req, res) => {
    res.render("events/new", {dateTime: new DateTime() })
})

//Create booking 
router.post("/", async (req, res) => {
  console.log(req.body)
  const event = new DateTime({
    name: req.body.name,
    date: new Date(req.body.Date),
    time: req.body.Time
  })
  try {
    const newEvent = await event.save()
    // res.redirect(`/events/${newEvent.id}`)
    res.redirect(`/events`)
  } catch {
    res.render("events/new", {
    event: event,
    errorMessage: "Error Booking Slot for Massage"
    })
  }
})

module.exports = router