const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var moment = require('moment');
var utcDate = moment.utc().toDate();

// create post Schema & model
const PostSchema = new Schema({

    title: {
        type: String,
        required: [true, 'Title of your post']
    },
    content: {
        type: String,
        required: [true, 'Content here']
    },
    created_at : { type: Date, required: true, default: utcDate },

    created_by: {
        type: String,
        required: [true]
    },

});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;