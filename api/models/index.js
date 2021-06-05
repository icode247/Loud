const mongoose = require('mongoose');
require("../../config/dbConfig")(mongoose);
module.exports.User = require("./user.model")(mongoose);
module.exports.Feedback = require("./feedback.model")(mongoose);