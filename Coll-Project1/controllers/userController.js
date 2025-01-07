const express = require('express');
const router = express.Router();


/* -- Database Connection -- */
const mongoose = require('mongoose');
mongoose.connect("mongodb://root:example@127.0.0.1:27017").then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
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

router.showUsers = async (req, res) => {
    try {
        users = await userModel.find();
        //console.log(users);
        res.render("users", { allUsers: users });
    } catch (error) {
        console.error("Error showing users:", error);
        res.status(500).send("An error occured.");
    }
};

router.addUsers = async (req, res) => {
    try {
        const { name: newuserName, gender: newuserGender, id: newuserId } = req.body;
        console.log("Adding User " + newuserName + " ...");

        const userExists = await userModel.findOne({ id: newuserId });
        if (userExists) {
            console.log("Duplicate User Found");
            return res.render("duplicateId");
        }

        console.log("Adding new user...");
        const newUser = await userModel.create({ name: newuserName, gender: newuserGender, id: newuserId });
        console.log("Added new user: " + newUser);

        const allUsers = await userModel.find();


        res.render("users", { allUsers });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("An error occured");
    }

};

router.deleteUser = async (req, res) => {
    var inputId = Number(req.body.id);
    console.log("Attempting to remove user with Input Id: " + inputId);
    //console.log(typeof inputId);
    //let userRemoved = false;
    try {
        const result = await userModel.deleteOne({ id: inputId });
        if (result.deletedCount == 0) {

            console.log("No User Found");
            res.render("idNotFound", {
                id: inputId
            });

        } else {
            var allUsers = await userModel.find();
            console.log("Removed User");
            res.render("users", { allUsers });
        }
    } catch (error) {
        console.log("Error Found");
    }
};



router.updateUser = async (req, res) => {
    
};

//   router.addUsers = async (req, res) => {
//     try{ 
//         var allUsers = await userModel.find();
//         //res.render("users", {allUsers: users});
//     } catch(error){
//         console.error("Error fetching users:", error);
//         res.status(500).send("An error occurred.");
//     }
//     var newuserName = req.body.name;
//     var newuserGender = req.body.gender;
//     var newuserId = req.body.id;

//     console.log("Adding User " + newuserName + " ...")

//     //var userExists = allUsers.some(allUsers => allUsers.id === newuserId);
//     var userExists = allUsers.some(user => {
//         console.log(`Checking user ID: ${user.id} against new ID: ${newuserId}`);
//         return String(user.id) === String(newuserId);
//     });
//     if (userExists) {
//       console.log("Duplicate user id detected. Failed to add user.");
//       res.render("duplicateId")
//   } else {
//     try{
//         await userModel.create({ name: newuserName, gender: newuserGender, id: newuserId });
//         allUsers = await userModel.find();
//     }catch (error){
//         console.error("Error Adding user:", error);
//         res.status(500).send("An error occurred."); 
//     }
//       res.render("users", {allUsers: allUsers});
//       console.log({allUsers: allUsers});
//       console.log("Added User: " + newuserName);
//   }
// };

//   router.deleteUser = (req, res) => {
//     var inputId = req.body.id;
//     console.log("Attempting to remove user with Input Id: " + inputId);
//     var allUsers = users;
//     let userRemoved = false;

//     allUsers.some((user, index) => {
//       if(user.id === inputId){
//         allUsers.splice(index, 1);
//         userRemoved = true;
//         return true;
//       }
//     });
//     if (userRemoved){
//       console.log("Removed User")
//       res.render("users", {
//         allUsers: users});
//     }else{
//       console.log("No User Found");
//       res.render("idNotFound", {
//         id: inputId
//       });
//     }
//   };


module.exports = router;