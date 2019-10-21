import User from "../models/user";
const jwt = require("jsonwebtoken");
var jwtDecode = require("jwt-decode");

class Auth {
  signUp(req, res) {
    if (!req.body.username || !req.body.password) {
      res.json({ success: false, msg: "Please pass username and password." });
    } else {
      var newUser = new User({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        age: req.body.age,
        address: {
          country: req.body.address.country,
          city: req.body.address.city
        }
      });
      // save the user
      newUser.save(err => {
        if (err) {
          return res.json({ success: false, msg: "Username already exists." });
        }
        res.json({ success: true, msg: "Successful created new user." });
      });
    }
  }
  signIn(req, res) {
    User.findOne(
      {
        username: req.body.username
      },
      (err, user) => {
        if (err) throw err;

        if (!user) {
          res.status(401).send({
            success: false,
            msg: "Authentication failed. User not found."
          });
        } else {
          // check if password matches
          user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              var token = jwt.sign(user.toJSON(), process.env.SERV_JWT, {
                expiresIn: "30m"
              });
              // return the information including token as JSON
              const decoded = jwtDecode(token);
              const { email } = decoded;
              res.json({ success: true, token: "JWT " + token, email: email });
            } else {
              res.status(401).send({
                success: false,
                msg: "Authentication failed. Wrong password."
              });
            }
          });
        }
      }
    );
  }
}

export default new Auth();
