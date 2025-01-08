const express = require('express');
const router = express.Router;
const userModel = require('../models/userModel');


router.postSignUpForm = (req, res) => {
    res.render("contact", { title: "Contact Us" });
  };
  
router.postDeleteForm = (req, res) => {
    res.render("remove", { title: "Remove User"})
  }

router.postUpdateForm = async (req, res) => {
    var inputId = Number(req.params.id);

    try {
        const Users = await userModel.findOne({ id: inputId});


        if(!Users) {
            console.log("No user found with ID: ", inputId);
            return res.render("idNotFound", { id: inputId });
        }

    res.render("update", { Users })

  }catch (error) {

    console.error("Error fetching User for update", error);
    res.status(500).send("Internal Server Error");
    }
};
module.exports = router ;

