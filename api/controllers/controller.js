// @description root route
//@method Get
exports.index = (req,res) =>{
    res.render("index.ejs")
}


// @description feedback route
//@method Get
exports.feedback = (req,res)=>{
    res.render("feedback.ejs");
}

// @description faq route
//@method Get
exports.faq = (req,res)=>{
    res.render("faq.ejs")
}


module.exports = exports;