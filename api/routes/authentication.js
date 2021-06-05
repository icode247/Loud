const { Signin, Signup } = require("../controllers/authentication")
const { createAccount, Login, Users } = require('../services/auth')
const { userValidationRules, loginValidationRules, validate } = require('../validators/authValidation')
function authentication(express) {
    const router = express.Router();

    router.route("/auth/signin")
        .get(Signin)
        .post(loginValidationRules(), validate, Login)


    router.route("/auth/signup")
        .get(Signup)
        .post(userValidationRules(), validate, createAccount)
    // router.route("/api/users/:email")
    //     .get(Users)
    

    return router;
}

module.exports = authentication;