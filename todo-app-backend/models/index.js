const mongoose = require('mongoose');
const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB,
    ENV
} = process.env;

let url;
if (!ENV) {
    url = 'mongodb://localhost/todo-app'
} else {
   url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
}

const options = {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    connectTimeoutMS: 10000,
};
mongoose.connect(url, options).then( function() {
    console.log('MongoDB is connected');
}).catch( function(err) {
        console.log(err);
    });
mongoose.set('debug', true);
mongoose.Promise = Promise;

module.exports.Todo = require("./todo");
module.exports.User = require("./user");