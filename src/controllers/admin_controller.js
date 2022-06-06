
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const mysql = require("mysql");
const config = require("../config/db");
const Admin = require("../models/admin");
const SpareParts = require("../models/sparepart");

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

    let results ;
    let content;
    

    const spareParts = await SpareParts.findAll();


    spareParts.forEach(element => {
        results +=
        ` 
            <tr>
                <td>${element.partName}</td>
                <td>${element.unitPrice}</td>
                <td>${element.unitInStock}</td>
            </tr>
            
        `

    })

    
    content = `
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Parça Adı</th>
                    <th scope="col">Birim Fiyatı</th>
                    <th scope="col">Stoktaki Ürün Miktarı</th>
                </tr>
            </thead>
            
            <tbody>
            
                ${results}

            </tbody>
            
                
    
        </table> `
    
   
    res.render('Admin/SparePart/Index.ejs', {
        layout : '../views/layout/admin-layout.ejs',
        content,
        isAuth: req.isAuthenticated()
        
    })
}

module.exports = {
    adminLogin,
    adminLoginPost,
    spareParts
}