const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/users', userController.createUser);
router.get('/users', verifyToken, userController.listUsers);
router.get('/users/:cpf', verifyToken, userController.getUser);
router.put('/users/:id', verifyToken, userController.updateUser);
router.delete('/users/:id', verifyToken, userController.deleteUser);
router.delete('/users/permanent/:id', verifyToken, userController.deleteUser);
router.post('/login', userController.login);

module.exports = router;
