const bcrypt = require("bcrypt");
const uid2 = require("uid2");
const { signUpValidation } = require("../validation");
const UserModel = require("../models/users");

async function SignUp(req, res, next) {
  
  // Validate the data before we make a user
  const { error } = signUpValidation(req.body);
  if (error) {
    return res.status(400).json({ result: false, error: error.details[0].message });
  }

  // Checking if the user is already in the DB
  const emailIsExist = await UserModel.findOne({ email: req.body.email });
  if (emailIsExist) {
    return res.status(409).json({ result: false, emaiExist: "l'email existe déjà" });
  }

  // Hash passwords
  const cost = 10;
  const hashedPassword = bcrypt.hashSync(req.body.password, cost);

  const newUser = new UserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    password: hashedPassword,
    favorites: [],
    status: "customer",
    token: uid2(32),
    loyaltyPoints: 0,
  });

  try {
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.json({ result: true, savedUser, token: savedUser.token });
  } catch (error) {
    console.log(error);
    res.json({ result: false, error });
  }

}

module.exports = SignUp;
