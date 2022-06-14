module.exports =  (passport) =>  {
    const options = {
        usernameField: 'email',
        passwordField: 'password'
    }
    
    passport.use('admin-local', new LocalStrategy(options, async (email, password, done) =>  {
        
        try {
            const _findAdmin = await Admin.findOne({where : {
                email : email
            }});
            
            if (!_findAdmin) {
                return done(null, false, {message : 'Kullanıcı bulunamadı'});
                console.log("0");
            }
            const checkPassword = await bcrypt.compare(password, _findAdmin.password);
            if (!checkPassword) {
                return done(null, false, {message : 'Hatalı şifre'});
                console.log("1");
            }
            
        } catch (err) {
            return done(err);
            console.log("2");
        }
        
    }));
    
    passport.serializeUser((user, done) => {
        //cookie de id sakla
        console.log('sessiona kaydedildi'+ ' ' + user.email);
        console.log("3");
        done(null, user.id);
    })
    passport.deserializeUser(async(id, done)=> {
        // cookie den okunan id değerinin kullanıcı tablosunda tekrar okunması ve kullanıcının geriye döndürülmesi
        const admin = await Admin.findOne(
            
            { where: { id: id } },
            
        )
        console.log("4");
        admin.update(
            {
                email: admin.email,
                password: admin.password,
            },
        )
        done(null, admin);
    });
    

    
}