const Post = require('../models/post');

exports.get_all_posts = async(req, res, next) => {
    let googleid = req.query.googleid;
    Post.find({created_by: googleid}).then(function(posts){
        res.send(posts);
    }).catch(next);
};

exports.get_single_post = function(req, res, next){
    Post.findById({_id: req.params.id}).then(function(post){
        res.send(post);
    }).catch(next);
};

exports.create_post = function(req, res, next){
    Post.create(req.body).then(function(post){
    res.send(post);
}).catch(next);
};

exports.update_post = function(req, res, next){
    Post.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Post.findOne({_id: req.params.id}).then(function(post){
            res.send(post);
        });
    }).catch(next);
};

exports.delete_post = function(req, res){
    Post.findByIdAndRemove({_id:req.params.id}).then(function(post){
        res.send(post);
    });
};