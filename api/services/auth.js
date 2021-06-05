const bcrypt = require("bcrypt")
const { User } = require("../models")
const jwt = require("jsonwebtoken");
const config = require('../../config/config')

exports.createAccount = async (req, res) => {
    const { name, email, regNumber, password } = req.body;
    try {
        hashedPasswod = await bcrypt.hash(password, 10)
        const createdUser = await User.create({
            name,
            email,
            regNumber,
            password: hashedPasswod
        })
        res.status(201).json({msg :'created'});
    }
    catch (error) {
        res.sendStatus(400)
    }
}

exports.Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) res.json({ msg: "invalid" })
        if (foundUser) {
            const userPassword = foundUser.password;
            const matchedpassword = await bcrypt.compare(password, userPassword);
            if (!matchedpassword) res.json({ msg: "invalid" })
            if (matchedpassword) {
                const token = jwt.sign({
                    email: foundUser.email,
                    iat: Math.floor(Date.now() / 1000) - 30,
                }, config.SECRET_KEY, {
                    expiresIn: '1h'
                })
                res.json({ token })
            }
        }
    } catch (e) {
        console.log(e)
    }

}

exports.Users = async (req, res) => {
    let email = req.query.email;
    if (email) {
        let userObj = await User.findOne({ email }).select("email -_id").exec();
        res.json(userObj)
    } else {
        let userObj = await User.find({}, ['email','name']).exec();
        res.json(userObj)
    }

}
//do this on the frontend.
// function change(val){
//     val = val.replace("&#x2F;", "/")
//     val = val.replace("&#x2F;", "/")
//     return val;
// }
module.exports = exports