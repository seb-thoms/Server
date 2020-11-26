const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

//Creates a collections users with the schema specified
mongoose.model('users', userSchema);