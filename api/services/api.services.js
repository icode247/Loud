const { Feedback, User } = require("../models")
exports.create = async (req, res) => {
    try {
        const user = await User.findOne({email:req.user.email});
        if (user) {
            const feed = await Feedback.create({feeds:req.body.feedback});
            user.feedbacks.push(feed);
            user.save()
            res.json(user)
        }
    } catch (e) {
    }
}
module.exports = exports;