const { Signin, Signup } = require("../controllers/authentication")
function authentication(express){
    const router = express.Router();

    router.route("/auth/signin").get(Signin);

    router.route("/auth/signup").get(Signup);

    return router;
}

module.exports = authentication;