const express = require('express')
const home_router = require('.')

const router = express.Router()

// registering child routers
router.use('/', home_router)
module.exports = router

