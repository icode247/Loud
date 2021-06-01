const { dashboard, feeds } = require("../controllers/admin")
function adminRoutes(express) {
   const router = express.Router();

   //@description dashboard route view controller
   router.route("/dashboard").get(dashboard)

   //@description feeds route view controller
   router.route("/feeds").get(feeds)
   return router;
}
module.exports = adminRoutes;