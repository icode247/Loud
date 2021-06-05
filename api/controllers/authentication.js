exports.Signin = (req,res)=>{
    res.render("authentication/signin");
    
}

exports.Signup = (req,res)=>{
    res.render("authentication/signup")
}


module.exports = exports;