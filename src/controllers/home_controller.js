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

module.exports =  {
    home, 
    cars
};