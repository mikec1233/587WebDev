const mongoose = require('mongoose');
mongoose.connect("mongodb://root:example@127.0.0.1:27017").then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    // Handle specific error conditions if needed
  });


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
//colection will be the users collection

const testUser = new userModel({
    name: "Test",
    gender: "Male",
    id: "123"
});

testUser.save();

users = userModel.find({name: "Test"}).then((users) => {
    console.log("Users: ", users);
});

console.log("Users: ", users);
