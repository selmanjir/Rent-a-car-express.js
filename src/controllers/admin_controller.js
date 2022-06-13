const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const mysql = require("mysql");
const config = require("../config/db");
const Admin = require("../models/admin");
const SpareParts = require("../models/sparepart");
const Accessory = require("../models/accessory");
const Motorcycle = require("../models/motorcycle");
const User = require("../models/user");

const {validationResult} = require('express-validator');
const passport = require("passport");
require('../config/passport_local')(passport);

const adminLogin = async (req, res) => {
    
    res.render('Admin/AdminLogin.ejs', {
        layout: './layout/login-layout.ejs'
    });
}
const adminLoginPost = async (req ,res, next) => {
    const errors  = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        // requestten gelen hatalar objesi boş değilse validation_error yolla içini errors dizi ile doldur 
        req.flash('validation_error', errors.array());
        
    }
    let olds = {'email' : req.body.email}
    req.flash('olds',olds)
    passport.authenticate('admin-local', {
        successRedirect: '/',
        failureRedirect: '/admin-login',
        failureFlash: true
    })
    (req, res, next);
    
};

const spareParts = async (req, res) => {

    let results = "";
    let content = "";
    

    const spareParts = await SpareParts.findAll();


    spareParts.forEach(element => {
        results +=
        ` 
            <tr>
                <td>${element.id}</td>
                <td>${element.partName}</td>
                <td>${element.unitPrice}</td>
                <td>${element.unitInStock}</td>
                <td> <a href="/admin-delete-spareParts/${element.id}">Sil</a></td>
                <td> <a href="/admin-update-spareParts/${element.id}">Güncelle</a></td>
            </tr>
            
        `

    })
    
    content = `
        

            <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Parça Adı</th>
                    <th scope="col">Birim Fiyatı</th>
                    <th scope="col">Stoktaki Ürün Miktarı</th>
                    <th scope="col">Sil</th>
                    <th scope="col">Güncelle</th>
            </tr>
            
                ${results}

            
                 `
    
    

   console.log(content);
    res.render('Admin/SparePart/Index.ejs', {
        layout : '../views/layout/admin-layout.ejs',
        content,
        isAuth: req.isAuthenticated()
        
    })
}
const deleteSpareParts = async (req, res ) => {
    await SpareParts.destroy({
        where : {id : req.params.id}
    })
    res.redirect('/admin-index-spareParts')
}
const addSpareParts = async(req, res) => {
    res.render('Admin/SparePart/AddSparePart.ejs', {
        layout : './layout/admin-layout.ejs'
    })
}

const addSparePartsPost = async (req, res) => {
    const newSparePart = await SpareParts.create({
        partName : req.body.partName,
        unitInStock : req.body.unitInStock,
        unitPrice : req.body.unitPrice,
        isDeleted : false,
        isActive : true
    })
    newSparePart.save();
    res.redirect('/admin-index-spareParts')
}
const updateSparePart = async (req, res) => {
    let content = await SpareParts.findOne({where : {id : req.params.id }})
    res.render('Admin/SparePart/UpdateSparePart.ejs', {
        layout : './layout/admin-layout.ejs',
        content
})

}
const updateSparePartPost = async (req, res ) => {

    let result = await SpareParts.findOne({where : {id : req.params.id}})

    result.partName = req.body.partName,
    result.unitInStock = req.body.unitInStock,
    result.unitPrice = req.body.unitPrice

    result.save();

    res.redirect('/admin-index-spareParts')

}


const accessories = async (req, res) => {

    let results = "";
    let content = "";
    

    const accessories = await Accessory.findAll();


    accessories.forEach(element => {
        results +=
        ` 
            <tr>
                <td>${element.id}</td>
                <td>${element.accessoryName}</td>
                <td>${element.unitPrice}</td>
                <td>${element.unitInStock}</td>
                <td> <a href="/admin-delete-accessories/${element.id}">Sil</a></td>
                <td> <a href="/admin-update-accessories/${element.id}">Güncelle</a></td>
            </tr>
            
        `

    })
    
    content = `
        

            <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Aksesuar Adı</th>
                    <th scope="col">Birim Fiyatı</th>
                    <th scope="col">Stoktaki Ürün Miktarı</th>
                    <th scope="col">Sil</th>
                    <th scope="col">Güncelle</th>
            </tr>
            
                ${results}

            
                 `
    
    

   console.log(content);
    res.render('Admin/Accessory/Index.ejs', {
        layout : '../views/layout/admin-layout.ejs',
        content,
        isAuth: req.isAuthenticated()
        
    })
}

const motorcycles = async (req, res) => {

    let results = "";
    let content = "";
    

    const motorcycles = await Motorcycle.findAll();


    motorcycles.forEach(element => {
        results +=
        ` 
            <tr>
                <td>${element.id}</td>
                <td>${element.brand}</td>
                <td>${element.model}</td>
                <td>${element.salePrice}</td>
                <td> <a href="/admin-delete-motorcycle/${element.id}">Sil</a></td>
                <td> <a href="/admin-get-motorcycle/${element.id}">Güncelle</a></td>
            </tr>
            
        `

    })
    
    content = `
        

            <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Marka</th>
                    <th scope="col">Model</th>
                    <th scope="col">Satış Fiyatı</th>
                    <th scope="col">Sil</th>
                    <th scope="col">Güncelle</th>
            </tr>
            
                ${results}

            
                 `
    
    

   console.log(content);
    res.render('Admin/Motorcycle/Index.ejs', {
        layout : '../views/layout/admin-layout.ejs',
        content,
        isAuth: req.isAuthenticated()
        
    })
}
const deleteMotorcycle = async (req, res ) => {
    await Motorcycle.destroy({
        where : {id : req.params.id}
    })
    res.redirect('/admin-index-motorcycle')
}
const addMotorcycle = async(req, res) => {
    res.render('Admin/Motorcycle/AddMotorcycle.ejs', {
        layout : './layout/admin-layout.ejs'
    })
}

const addMotorcyclePost = async (req, res) => {
    const newMotorcycle = await Motorcycle.create({
        brand : req.body.brand,
        model : req.body.model,
        salePrice : req.body.salePrice,
        isDeleted : false,
        isActive : true
    })
    newMotorcycle.save();
    res.redirect('/admin-index-motorcycle')
}
const getMotorcycle = async (req, res) => {
    let content = await Motorcycle.findOne({where : {id : req.params.id }})
    res.render('Admin/Motorcycle/GetMotorcycle.ejs', {
        layout : './layout/admin-layout.ejs',
        content
})

}
const getMotorcyclePost = async (req, res ) => {

    let result = await Motorcycle.findOne({where : {id : req.params.id}})

    result.brand = req.body.brand,
    result.model = req.body.model,
    result.salePrice = req.body.salePrice

    result.save();

    res.redirect('/admin-index-motorcycle')

}

const users = async (req, res) => {

    let results = "";
    let content = "";
    

    const _users = await User.findAll();


    _users.forEach(element => {
        results +=
        ` 
            <tr>
                <td>${element.id}</td>
                <td>${element.username}</td>
                <td>${element.full_name}</td>
                <td>${element.email}</td>
                <td>${element.avatar}</td>
                <td> <a href="/admin-delete-user/${element.id}">Sil</a></td>
                <td> <a href="/admin-update-user/${element.id}">Güncelle</a></td>
            </tr>
            
        `

    })
    
    content = `
        

            <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Kullanıcı Adı</th>
                    <th scope="col">Ad Soyad</th>
                    <th scope="col">Mail</th>
                    <th scope="col">Profil Fotoğrafı</th>
                    <th scope="col">Sil</th>
                    <th scope="col">Güncelle</th>
            </tr>
            
                ${results}

            
                 `
    
    

   console.log(content);
    res.render('Admin/User/Index.ejs', {
        layout : '../views/layout/admin-layout.ejs',
        content,
        isAuth: req.isAuthenticated()
        
    })
}
const addUser = async(req, res) => {
    res.render('Admin/User/AddUser.ejs', {
        layout : './layout/admin-layout.ejs'
    })
}
const addUserPost = async (req, res) => {
    const newUser = await User.create({
        username : req.body.username,
        full_name : req.body.full_name,
        email : req.body.email,
        avatar : req.body.avatar
    })
    newUser.save();
    res.redirect('/admin-index-user')
}
const deleteUser = async (req, res ) => {
    await User.destroy({
        where : {id : req.params.id}
    })
    res.redirect('/admin-index-user')
}
const updateUser = async (req, res) => {
    let content = await User.findOne({where : {id : req.params.id }})
    res.render('Admin/User/UpdateUser.ejs', {
        layout : './layout/admin-layout.ejs',
        content
})

}
const updateUserPost = async (req, res ) => {

    let result = await User.findOne({where : {id : req.params.id}})

    result.username = req.body.username,
    result.full_name = req.body.full_name,
    result.email = req.body.email,
    result.avatar = req.body.avatar

    result.save();

    res.redirect('/admin-index-user')

}

module.exports = {
    adminLogin,
    adminLoginPost,
    spareParts,
    addSpareParts,
    addSparePartsPost,
    updateSparePart,
    updateSparePartPost,
    deleteSpareParts,
    accessories,
    motorcycles,
    addMotorcycle,
    addMotorcyclePost,
    deleteMotorcycle,
    getMotorcycle,
    getMotorcyclePost,
    users,
    addUser,
    addUserPost,
    deleteUser,
    updateUser,
    updateUserPost
}