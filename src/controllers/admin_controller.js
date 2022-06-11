const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const mysql = require("mysql");
const config = require("../config/db");
const Admin = require("../models/admin");
const SpareParts = require("../models/sparepart");
const Accessories = require("../models/accessories");

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
    res.redirect('/admin-add-spareParts')
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
    

    const accessories = await Accessories.findAll();


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
module.exports = {
    adminLogin,
    adminLoginPost,
    spareParts,
    addSpareParts,
    addSparePartsPost,
    updateSparePart,
    updateSparePartPost,
    deleteSpareParts,
    accessories
}