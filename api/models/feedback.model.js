function feedback(mongoose) {
    const feedbackSchema = new mongoose.Schema({
        feeds: {
            type: String,
            required: true
        },
        dateCreated: {
            type: Date,
            default: Date.now()
        }
    })

    return mongoose.model('feedbacks', feedbackSchema);
}
module.exports = feedback;