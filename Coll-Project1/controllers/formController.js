const express = require('express');
const router = express.Router;

router.postSignUpForm = (req, res) => {
    res.render("contact", { title: "Contact Us" });
  };
  
  router.postDeleteForm = (req, res) => {
    res.render("remove", { title: "Remove User"})
  }


module.exports = router;