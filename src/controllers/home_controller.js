// controller.js


// index page


const home = (req, res) => {
    res.render('home',{
    layout: './layout/layout.ejs'
        
    });
}

const cars = (req, res) => {
    res.render('cars',{
    layout: './layout/layout.ejs'
        
    });
}

const motorcycle = (req, res) => {
    res.render('motorcycle',{
    layout: './layout/layout.ejs'
        
    });
}

const spareparts = (req, res) => {
    res.render('spareparts', {
        layout: './layout/layout.ejs'
    });
}

const accessory = (req, res) => {
    res.render('accessory',{
        layout: './layout/layout.ejs'
    });
}

const aboutus = (req, res) => {
    res.render('about-us',{
        layout: './layout/layout.ejs'
    });
}

const contactus = (req, res) => {
    res.render('contact-us',{
        layout: './layout/layout.ejs'
    });
}

const cart = (req, res) => {
    res.render('cart',{
        layout: './layout/layout.ejs'
    })
}


const paymentscreen = (req, res) => {
    res.render('paymnet-screen',{
        layout: './layout/layout.ejs'
    });
}
module.exports =  {
    home, 
    cars,
    motorcycle,
    spareparts,
    accessory,
    aboutus,
    contactus,
    cart,
    paymentscreen
};