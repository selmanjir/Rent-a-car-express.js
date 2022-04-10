// routes.js

const express = require('express');


const {body, checkSchema, validationResult} = require('express-validator');

const { home } = require('../controllers/home_controller');
const { register, registerPost} = require('../controllers/auth_controller');

const {registerValidate } = require('../middlewares/validation_middleware');

const router = express.Router();
router.get('/', home);

router.get('/register',register)
router.post('/register-post',[checkSchema(registerValidate)],registerPost)

module.exports = router;