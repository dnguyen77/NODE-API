const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Post = require('../model/Post.Model');
const { postValidation } = require('../model/Post.Validation');

//Only registered users can add new post
exports.savePost = async (req, res, next) => {
    //Do some validation first
    try {
        const { error } = await postValidation(req.body);
        //If there is any validation error return the error
        if (error) throw new Error(error.details[0].message);

        //Check to see if the same already exist
        const titleExist = await Post.findOne({ title: req.body.title });
        if (titleExist) throw new Error('There is a post already exists with this title');

        //Create a new
        const post = new Post({
            title: req.body.title,
            description: req.body.description,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy
        });

        const savePost = await post.save();
        //Return the userId
        res.send({ post: savePost });
    }
    catch (err) {
        next(err);
    }
}

//Update Post Sample Query to return the updated record
// var query = { id: 8 };
// var update = { title: "new title" };
// var options = { new: true };
// MyModel.findOneAndUpdate(query, update, options, function (err, doc) {
//     // Done! 
//     // doc.title = "new title" 
// });

//Only registered users can update post
exports.updatePost = async (req, res, next) => {
    try {
        //Do some validation first
        const { error } = await postValidation(req.body);
        //If there is any validation error return the error
        if (error) throw new Error(error.details[0].message);

        const updatePost = await Post.findByIdAndUpdate(
            { _id: req.params.id },
            {
                title: req.body.title,
                description: req.body.description
            },
            { new: true }
        );

        //Return the post
        res.send({ post: updatePost });
    }
    catch (err) {
        next(err);
    }
}

//Only registered user can delete post
exports.deletePost = async (req, res, next) => {
    try {

        const deletePost = await Post.findByIdAndRemove(req.params.id);
        if (!deletePost) throw new Error(`No record found with this _id = ${req.params.id}`);
        //Return
        res.send({ post: deletePost });
    }
    catch (err) {
        next(err);
    }
}

//Get all posts from the db
exports.getAllPost = async (req, res, next) => {
    try {
        const Posts = await Post.find();
        res.send(Posts);
    }
    catch (err) {
        next(err);
    }
}

//Find a single post using post _id
exports.getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) throw new Error(`No record found with this _id = ${req.params.id}`);
        res.send(post);
    }
    catch (err) {
        next(err);
    }
}