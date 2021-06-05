const { create } = require("../services/api.services")
const apiMiddleware = require('../middlewares/auth.middleware')
function apiRoutes(express) {
    const router = express.Router();
    //@description feedback api route view controller
    router.route("/api/feedback").post(apiMiddleware,create)
    return router;

}
module.exports = apiRoutes;