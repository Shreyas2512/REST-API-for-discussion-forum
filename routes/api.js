const express = require ('express');
const router = express.Router();
const Post = require('../models/post');
const passport = require('passport');
const UsersController = require('../controllers/users');
const passportConf = require('../config/passport-setup');
const expressJwt = require('express-jwt');  
const { JWT_SECRET } = require('../configuration');
const authenticate = expressJwt({secret : JWT_SECRET});
const postcontroller = require('../controllers/postapi');

router.get('/posts', authenticate , postcontroller.get_all_posts);

router.get('/posts/:id', authenticate , postcontroller.get_single_post);

router.post('/posts', authenticate, postcontroller.create_post);

router.put('/posts/:id', authenticate, postcontroller.update_post);

router.delete('/posts/:id',authenticate, postcontroller.delete_post);

router.route('/oauth/google')
  .post(passport.authenticate( "googleToken",{ session: false }), UsersController.googleOAuth);

module.exports = router;
