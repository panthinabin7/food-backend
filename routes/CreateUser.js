const express = require("express");
const router = express.Router();
const model = require("../model/User");
const User = model.User;
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "Mynameisnabinpanthifromarghak$#a";

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("password", "incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10); //function of bcrypt as async
    let secPassword = await bcrypt.hash(req.body.password, salt); // hash has 2 parameter,1st value jsko hash create garna xa, 2nd salt  to make it even more secure

    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  //authentication using express-validator
  [
    body("email").isEmail(),
    body("password", "incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // return errors in an array of object
    }
    let email = req.body.email;

    try {
      let userData = await User.findOne({ email }); // give the whole document of the email
      if (!userData) {
        return res.status(400).json({
          errors: "Try logging with correct credentials not found user",
        });
      }
      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!pwdCompare) {
        return res.status(400).json({
          errors: "Try logging with correct credentials something is wrong",
        });
      }
      const data = {
        // data has to be object, its necessary during signature
        user: {
          id: userData.id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret); // data=payload, jwtSecret=secret
      return res.json({ success: true, authToken: authToken });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);
exports.router = router;
