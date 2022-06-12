// routes.js

const express = require('express');


const {body, checkSchema, validationResult} = require('express-validator');

const { home, cars, motorcycle, spareparts} = require('../controllers/home_controller');
const { register, registerPost, login, loginPost} = require('../controllers/auth_controller');
const { adminLogin, adminLoginPost, spareParts, addSpareParts, addSparePartsPost, updateSparePart, updateSparePartPost, deleteSpareParts, accessories, motorcycles, addMotorcycle, addMotorcyclePost, deleteMotorcycle, getMotorcycle, getMotorcyclePost, users} = require('../controllers/admin_controller');

const {registerValidate } = require('../middlewares/validation_middleware');
const {checkAuth } = require('../middlewares/checkAuth');

const {Authenticated, UnAuthenticated, } = require('../middlewares/auth_middleware');

const router = express.Router();
router.get('/', home);

router.get('/register', UnAuthenticated, checkAuth, register)
router.post('/register-post', UnAuthenticated, checkAuth,registerPost)

router.get('/login', UnAuthenticated, checkAuth, login)
router.post('/login-post', UnAuthenticated, checkAuth, loginPost)

router.get('/admin-login', UnAuthenticated, checkAuth, adminLogin)
router.post('/admin-login-post', UnAuthenticated, checkAuth, adminLoginPost)

router.get('/admin-index-spareParts', UnAuthenticated, checkAuth, spareParts)
router.get('/admin-delete-spareParts/:id', UnAuthenticated, checkAuth, deleteSpareParts)
router.get('/admin-add-spareParts', UnAuthenticated, checkAuth, addSpareParts)
router.post('/admin-add-sparePartsPost', UnAuthenticated, checkAuth, addSparePartsPost)
router.get('/admin-update-spareParts/:id', UnAuthenticated, checkAuth, updateSparePart)
router.post('/admin-update-sparePartsPost/:id', UnAuthenticated, checkAuth, updateSparePartPost)

router.get('/admin-index-accessories', UnAuthenticated, checkAuth, accessories)

router.get('/admin-index-motorcycle', UnAuthenticated, checkAuth, motorcycles)
router.get('/admin-delete-motorcycle/:id', UnAuthenticated, checkAuth, deleteMotorcycle)
router.get('/admin-add-motorcycle', UnAuthenticated, checkAuth, addMotorcycle)
router.post('/admin-add-motorcyclePost', UnAuthenticated, checkAuth, addMotorcyclePost)
router.get('/admin-get-motorcycle/:id', UnAuthenticated, checkAuth, getMotorcycle)
router.post('/admin-get-motorcyclePost/:id', UnAuthenticated, checkAuth, getMotorcyclePost)

router.get('/admin-index-user', UnAuthenticated, checkAuth, users)

router.get('/cars', cars);
router.get('/motorcycle', motorcycle);
router.get('/spareparts', spareParts);

module.exports = router;