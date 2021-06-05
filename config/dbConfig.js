const config = require("../config/config")
async function configDb(mongoose) {
    await mongoose.connect(config.dbConnectingString,
        { 
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: true,
            useCreateIndex: true
         })
        .catch((e) => {
            console.log(e)
        })

}
module.exports = configDb