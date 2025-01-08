const formController = require('../controllers/formController');
const express = require('express');
const router = express.Router();

router.get('/', formController.postDeleteForm);

module.exports = router;