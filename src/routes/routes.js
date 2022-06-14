// routes.js

const express = require('express');


const {body, checkSchema, validationResult} = require('express-validator');

const { home, cars, motorcycle, spareparts, accessory, aboutus, contactus} = require('../controllers/home_controller');
const { register, registerPost, login, loginPost} = require('../controllers/auth_controller');
const { adminLogin, adminLoginPost, spareParts, addSpareParts, addSparePartsPost, updateSparePart, updateSparePartPost, deleteSpareParts, motorcycles, addMotorcycle, addMotorcyclePost, deleteMotorcycle, getMotorcycle, getMotorcyclePost, users, addUser, addUserPost, deleteUser, updateUser, updateUserPost, accessories, deleteAccessory, addAccessory, addAccessoryPost,  getAccessory, getAccessoryPost, statistic, car, addCar, addCarPost, deleteCar} = require('../controllers/admin_controller');

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

router.get('/admin-index-accessory', UnAuthenticated, checkAuth, accessories)
router.get('/admin-delete-accessory/:id', UnAuthenticated, checkAuth, deleteAccessory)
router.get('/admin-add-accessory', UnAuthenticated, checkAuth, addAccessory)
router.post('/admin-add-accessoryPost', UnAuthenticated, checkAuth, addAccessoryPost)
router.get('/admin-get-accessory/:id', UnAuthenticated, checkAuth, getAccessory)
router.post('/admin-get-accessoryPost/:id', UnAuthenticated, checkAuth, getAccessoryPost)

router.get('/admin-index-motorcycle', UnAuthenticated, checkAuth, motorcycles)
router.get('/admin-delete-motorcycle/:id', UnAuthenticated, checkAuth, deleteMotorcycle)
router.get('/admin-add-motorcycle', UnAuthenticated, checkAuth, addMotorcycle)
router.post('/admin-add-motorcyclePost', UnAuthenticated, checkAuth, addMotorcyclePost)
router.get('/admin-get-motorcycle/:id', UnAuthenticated, checkAuth, getMotorcycle)
router.post('/admin-get-motorcyclePost/:id', UnAuthenticated, checkAuth, getMotorcyclePost)

router.get('/admin-index-user', UnAuthenticated, checkAuth, users)
router.get('/admin-add-user', UnAuthenticated, checkAuth, addUser)
router.post('/admin-add-userPost', UnAuthenticated, checkAuth, addUserPost)
router.get('/admin-delete-user/:id', UnAuthenticated, checkAuth, deleteUser)
router.get('/admin-update-user/:id', UnAuthenticated, checkAuth, updateUser)
router.post('/admin-update-userPost/:id', UnAuthenticated, checkAuth, updateUserPost)

router.get('/admin-index-statistic', UnAuthenticated, checkAuth, statistic)

router.get('/admin-index-car', UnAuthenticated, checkAuth, car)
router.get('/admin-add-car', UnAuthenticated, checkAuth, addCar)
router.post('/admin-add-carPost', UnAuthenticated, checkAuth, addCarPost)
router.get('/admin-delete-car/:id', UnAuthenticated, checkAuth, deleteCar)

router.get('/cars', cars);
router.get('/motorcycle', motorcycle);
router.get('/spareparts', spareParts);
router.get('/accessory', accessory);
router.get('/about-us', aboutus);
router.get('/contact-us', contactus);

module.exports = router;