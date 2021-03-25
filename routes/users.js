var express = require("express");
var router = express.Router();

const authMiddleWare = require("../middleware/authMiddleWare");
const SignUp = require("../controllers/SignUp");
const SignIn = require("../controllers/SignIn");
const getProfile = require("../controllers/getProfile");
const addComment = require("../controllers/addComment");

router.post("/sign-up", SignUp);

router.post("/sign-in", SignIn);

// Get information on user's appointment and favorites
router.get("/my-profile", authMiddleWare, getProfile);

// Add user's comment
router.post("/comment", authMiddleWare, addComment);

module.exports = router;
