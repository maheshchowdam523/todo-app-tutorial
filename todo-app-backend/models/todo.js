const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new mongoose.Schema({
    _id: {type: String, unique: true
    },
    name: {
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        default: false
    },
    subTasks: {
        type: [Schema.Types.Mixed]
    }
});

const todoModel  = mongoose.model("Todo", todoSchema);

module.exports = todoModel;