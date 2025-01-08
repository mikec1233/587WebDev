const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');


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
        console.log("Attempting to add user " + newuserName);

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
    var inputId = Number(req.params.id);
    console.log("Attempting to remove user with input Id: " + inputId);

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
    const inputId = Number(req.params.id);
    const newId = Number(req.body.id);

    const updatedData = {
        name: req.body.name,
        gender: req.body.gender
    };


    console.log("Trying to update information for user with Id: " + inputId);
    try{
        
        const duplicateUser = await userModel.findOne({ id: newId});

        if (duplicateUser && newId !== inputId) {
            console.log("Duplicate User Found with ID: " + newId);
            return res.render("duplicateId", {id: newId});
        }

        

        const result = await userModel.updateOne({id: inputId }, { $set: {...updatedData, id: newId} });
        if (result.modifiedCount === 0) {
            console.log("No User Found or No Changes Made");
            res.render("idNotFound", {id: inputId});

        } else {
            console.log("User " + inputId + " Updated");
            const allUsers = await userModel.find();
            res.render("users", { allUsers });
        }

    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
    }
};


module.exports = router;
