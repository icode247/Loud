function userModel(mongoose) {
    const userSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        regNumber: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            default: false
        },
        feedbacks: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "feedbacks"
            }
        ],
        dateJoined: {
            type: Date,
            default: Date.now
        }
    })

    return mongoose.model("Users", userSchema);
}
module.exports = userModel;