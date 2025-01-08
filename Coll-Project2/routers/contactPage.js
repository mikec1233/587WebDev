const formController = require('../controllers/formController');
const express = require('express');
const router = express.Router();

router.get('/', formController.postSignUpForm);

module.exports = router;