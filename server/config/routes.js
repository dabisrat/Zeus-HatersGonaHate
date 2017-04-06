var reviewController = require('../reviews/reviewController');
var userController = require('../users/userController');
var eventController = require('../events/eventsController');
var commentController = require('../comments/commentController');
var jwt = require('express-jwt');

//Checks the token for authentication when attatched to route
var authCheck = jwt({
  secret: new Buffer(process.env.secret, 'base64'),
  audience: 'jYPMYlgiL8LUcwbOVQA2Oz0BlifZnPAn'
});

module.exports = function (app, express) {

  //Review Routes
  app.get('/review/:type/:typeId', reviewController.getReviews);

  app.post('/review/:type/:typeId', authCheck, reviewController.postReview);

  app.get('/review/:reviewId', reviewController.getReviewById);

  app.put('/review/:reviewId', authCheck, reviewController.editReview);

  app.put('/review/count/:reviewId', authCheck, reviewController.editCount);

  app.delete('/review/:reviewId', authCheck, reviewController.deleteReview);

  //Comment Routes
  app.get('/comment/:reviewId', commentController.getCommentByReviewId);

  app.post('/comment', authCheck, commentController.postComment);

  app.delete('/comment/:commentId', authCheck, commentController.deleteComment);

  //User Routes
  app.get('/user/:username', userController.getUserByUsername);

  app.get('/user/reviews/:userId', reviewController.getUserReviews);

  app.get('/user/following', userController.getUserLists);

  app.get('/user', authCheck, userController.getAllUsers);

  app.post('/user', authCheck, userController.postUser);

  app.put('/user/add', authCheck, userController.addToUserLists);

  app.put('/user/edit', authCheck, userController.editUser);

  app.delete('/user/delete', authCheck, userController.deleteUser);

  //User favorites/watched/currently watching routes
  app.get('/favorites', authCheck, userController.getUserLists);

  app.delete('/delete/:type', authCheck, userController.removeFromUserLists);

  app.post('/add/:type', authCheck, userController.addToUserLists);

  // Events Routes
  app.get('/event', eventController.getEvents);

};
