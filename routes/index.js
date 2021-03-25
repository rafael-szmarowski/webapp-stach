var express = require("express");
var router = express.Router();

const authMiddleWare = require("../middleware/authMiddleWare");
const rateLimitMiddleWare = require("../middleware/rateLimitMiddleWare");
const getShops = require("../controllers/getShops");
const addShop = require("../controllers/addShop");
const addPriceFork = require("../controllers/addPriceFork");
const addAppointment = require("../controllers/addAppointment");
const getShop = require("../controllers/getShop");
const getFavorites = require("../controllers/getFavorites");
const addFavorites = require("../controllers/addFavorites");
const deleteFavorites = require("../controllers/deleteFavorites");


// search and filter
router.post("/search", rateLimitMiddleWare, getShops);

// route to create shops in database
router.post("/shop", addShop);

// Updates PriceFork after changes in offers and experience
router.put("/price-fork", addPriceFork);

// Store the new appointment in database
router.post("/appointment", authMiddleWare, addAppointment);

// Get the selected Shop
router.get("/shop/:id", getShop);

// Get user's favorite shops
router.get("/favorites", authMiddleWare, getFavorites);

// Add favorites shops to database
router.post("/favorites", authMiddleWare, addFavorites);

// Remove favorites shops from database
router.delete("/favorites/:id", authMiddleWare, deleteFavorites);

module.exports = router;
