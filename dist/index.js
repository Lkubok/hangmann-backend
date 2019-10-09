"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("./system/passport"));

var _sampleModuleES = _interopRequireDefault(require("./sampleModuleES6"));

require("dotenv").config(); //Configure system variables, change variables when DEPLOY!!


const app = (0, _express.default)();

let allowCrossDomain = require("./startup/allowCrossDomain");

app.use(allowCrossDomain);

const winston = require("winston");

app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use(_passport.default.initialize());

require("./startup/logging")(); //it must be first


require("./startup/database")();

require("./startup/routes")(app);

app.set("view engine", "pug"); //Setting a html template engine, node will automaticly load the pug module

app.set("views", "./views"); //This is the same as default

const port = process.env.PORT || process.env.SERV_PORT; // SERV_PORT is my own varaible defined to work with front-end on one environment

app.listen(port, () => {
  winston.info(`Listening on port ${port}`); // Displaying port

  winston.info(`Running in environment: ${app.get("env")}`); // Displaying ENV

  winston.info(`Private server Key: ${process.env.SERV_JWT}`); //DELETE       // Displaying jwtPrivateKey - Delete this in FUTURE, only for debug!!

  winston.info(`Mongo URL: ${process.env.MONGO_URL}`); //DELETE       // Displaying URL to Database - Delete this in FUTURE, only for debug!!
});