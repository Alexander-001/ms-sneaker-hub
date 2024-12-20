require("dotenv").config();

const Config = require("./models/Config");

const config = new Config();

config.listen();
