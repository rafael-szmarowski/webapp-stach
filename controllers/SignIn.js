const bcrypt = require("bcrypt");
const { signInValidation } = require("../validation");
const UserModel = require("../models/users");

async function SignIn(req, res, next) {
  let result = false;

  // Lets validate the data before we make a user
  const { error } = signInValidation(req.body);

  if (error) {
    return res.json({ result: false, error: error.details[0].message });
  }

  // Checking if the email exists
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.json({
      result: false,
      emailNotFound: "L'e-mail est introuvable",
    });
  }

  // Password is correct
  const validPass = await bcrypt.compareSync(req.body.password, user.password);

  if (!validPass) {
    result = false;
    return res.json({
      result: false,
      invalidPassword: "Mot de passe non associé",
    });
  } else {
    res.json({ result: true, user, token: user.token });
  }
}

module.exports = SignIn;
