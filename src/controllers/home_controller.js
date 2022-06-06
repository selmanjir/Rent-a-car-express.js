// controller.js


// index page


const home = (req, res) => {
    res.render('home',{
    layout: './layout/layout.ejs'
        
    });
}

module.exports =  {
    home
};