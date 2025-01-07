const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.get('/', userController.showUsers);
router.post('/submit', userController.addUsers);
router.post('/remove', userController.deleteUser);

module.exports = router;