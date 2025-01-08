const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.get('/', userController.showUsers);
router.post('/submit', userController.addUsers);
//router.post('/remove', userController.deleteUser);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUser);

module.exports = router;
