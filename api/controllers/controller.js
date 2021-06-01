// @description root route
//@method Get
exports.index = (req,res) =>{
    res.render("index.ejs")
}

// @description dashboard route
//@method Get
exports.dashboard = (req,res) =>{
    res.render("dashboard.ejs")
}

module.exports = exports;