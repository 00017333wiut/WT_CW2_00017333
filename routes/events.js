const express = require('express');
const router = express.Router();

// Event model
const Event = require('../models/Event');

// GET all events
router.get('/', (req, res) => {
  Event.find()
    .then((events) => res.json(events))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// POST a new event
router.post('/', (req, res) => {
  const { title, date, location, description } = req.body;
  const newEvent = new Event({ title, date, location, description });

  newEvent
    .save()
    .then(() => res.json('Event added'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;