// routes.js

const express = require('express');


const {body, checkSchema, validationResult} = require('express-validator');

const { home } = require('../controllers/home_controller');
const { register, registerPost, login, loginPost} = require('../controllers/auth_controller');

const {registerValidate } = require('../middlewares/validation_middleware');
const {checkAuth } = require('../middlewares/checkAuth');

const {Authenticated, UnAuthenticated, } = require('../middlewares/auth_middleware');

const router = express.Router();
router.get('/', home);

router.get('/register', UnAuthenticated, checkAuth, register)
router.post('/register-post', UnAuthenticated, checkAuth,registerPost)

router.get('/login', UnAuthenticated, checkAuth, login)
router.post('/login-post', UnAuthenticated, checkAuth, loginPost)

module.exports = router;