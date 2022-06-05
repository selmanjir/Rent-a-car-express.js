
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const mysql = require("mysql");
const config = require("../config/db");
const user = require("../models/user");

const {validationResult} = require('express-validator');
const passport = require("passport");
require('../config/passport_local')(passport);

const register = async (req, res, next) => 	{
    
    res.render('register',{
        
        layout: './layout/layout.ejs'
    });
}
const registerPost = async (req, res, next) => 	{
    const errors  = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('validation_error', errors.array());
        let olds = {'full_name' : req.body.full_name, 'username' : req.body.username, 'email' : req.body.email,}
        req.flash('olds', olds);
        console.log("1.hata bloğu");
        
        res.redirect('/register') 
    }
    else {
        try {
            const _user = await user.findOne({ 
                where : {
                    email : req.body.email
                }
            });
            
            if (_user && _user.email_active == true) {
                req.flash('validation_error', [{msg : "Bu mail kullanımda"}]);
                let olds = {'full_name' : req.body.full_name, 'username' : req.body.username, 'email' : req.body.email,}
                req.flash('olds', olds);
                res.redirect('/register');
                console.log("email hatası çalıştı");
            }else if ((_user && _user.email_active == false) || _user == null) {
                
                // kullanıcı var ama mail aktif değil aynı zamanda tekrardan kayıt sağlanmaya çalışıyorsa aktif olmayan hesabı siler 
                if (_user) {
                    await user.destroy({where : {id : _user.id}});
                }
                
                const newUser = new user({
                    email : req.body.email,
                    username : req.body.username,
                    full_name : req.body.full_name,
                    email_active : false,
                    // yeni bir kullanıcı kaydederken şifresini hashliyoruz
                    password : await bcrypt.hash(req.body.password, 10),
                });
                //veri tabanına kaydolması için.
                await newUser.save();
                console.log("Kullanıcı kaydedildi");
                
                req.flash('success_message', [{msg : 'Kayıt başarılı, lütfen mail kutunuzu kontrol edin. '}])
                res.redirect('/login');
                
                //jwt
                const jwtInfo = {
                    id : newUser.id,
                    email : newUser.email
                }
                // jwt oluşturn
                // expiresIn:'1d'  = bu token 1 gün boyunca geçerli

                const secret = process.env.CONFIRM_EMAIL_JWT_SECRET + '-' + newUser.email_active
                console.log(secret);
                const jwtToken = jwt.sign(jwtInfo,secret, {expiresIn:'1d'})
                console.log(jwtToken);
                
                // SEND MAİL
                const url = process.env.WEB_SITE_URL+'verify'+ '/' + newUser.id + "/" + jwtToken;
                
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth : {
                        user : process.env.GMAIL_USER,
                        pass : process.env.GMAIL_PASS
                    }
                });
                
                
                await transporter.sendMail({
                    
                    from : 'Set Rent-a-car <info@nodejstestmail85.com',
                    to : newUser.email,
                    subject : 'Emailinizi lütfen onaylayın',
                    text : 'Emailinizi onaylamak için lütfen bu linke tıklayınız.' + url,
                    
                }), (err, info) => {
                    if (err) {
                        console.log('kayıt hata çalıştı ' + err);   
                    }
                    console.log('Mail gönderildi');
                    transporter.close();
                }
                
                
            }
        } catch (err) {
            console.log("kayıt hata2 çalıştı"+ err);
        }
    }
    
}
const login = async (req, res, next) => {
    
    res.render('login',{
        layout: './layout/layout.ejs'
    });
}
const loginPost = async (req ,res, next) => {
    const errors  = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        // requestten gelen hatalar objesi boş değilse validation_error yolla içini errors dizi ile doldur 
        req.flash('validation_error', errors.array());
        
    }
    let olds = {'email' : req.body.email}
    req.flash('olds',olds)
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
    (req, res, next);
    
};
module.exports = {
    register,
    registerPost,
    login,
    loginPost
}