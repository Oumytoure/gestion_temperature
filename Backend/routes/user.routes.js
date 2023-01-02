const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/users.ctrl');

router.post('/add-user', userCtrl.createUser);

router.post('/login', userCtrl.login);

router.get('/', userCtrl.getUsers);

router.get('/read-user/:id', userCtrl.getUser);

router.get('/user-profil/:id', userCtrl.userLogin);

router.put('/update-user/:id', userCtrl.updateUser);

module.exports = router;