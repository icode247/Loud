const { index, feedback, faq } = require("../controllers/controller")
function appRoutes(express) {
    const router = express.Router();
    //@description index route view controller
    router.route("/").get(index)

    //@description feedback route view controller
    router.route("/feedback").get(feedback)

    //@description faq route view controller
    router.route("/faq").get(faq);

    return router;

}
module.exports = appRoutes;