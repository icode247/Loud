const {index,dashboard} = require("../controllers/controller")
function dashboardRoute(express){
   const router = express.Router();

   //@description index route view controller
   router.route("/").get(index)

   //@description dashboard route view controller
   router.route("/dashboard").get(dashboard)
   return router;
}
module.exports = dashboardRoute;