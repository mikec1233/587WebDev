const formController = require('../controllers/formController');
const express = require('express');
const router = express.Router();

router.get('/:id', formController.postUpdateForm);

module.exports = router;

