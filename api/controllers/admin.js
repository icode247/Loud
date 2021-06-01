// @description dashboard route
//@method Get
exports.dashboard = (req,res) =>{
    res.render("admin/dashboard.ejs")
}

// @description created feeds route
//@method Get
exports.feeds = (req,res)=>{
    res.render("admin/feeds.ejs")
}

module.exports = exports;