const Post = require('../models/post');
const User = require('../models/user');



module.exports.home = async function(req, res){

    try{
        // following code segment is to populate the user and like of each post and comment.
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate: {
                path: 'likes'
            }
        }).populate('comments')
        .populate('likes');

    
        let users = await User.find({});

        return res.render('home', {
            title: "Friends-Connect | Home",
            posts:  posts,
            all_users: users
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}

// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()
