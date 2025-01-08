const mongoose = require('../db');

const userSchema = new mongoose.Schema({

    name: {
        type: "String",
        require: true
    },
    gender: {
        type: "String",
        require: true
    },
    id: {
        type: Number,
        require: true
    }

});

const userModel = new mongoose.model("User", userSchema);

module.exports = userModel;


