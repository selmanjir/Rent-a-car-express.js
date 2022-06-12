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

module.exports =  {
    home, 
    cars,
    motorcycle,
    spareparts
};