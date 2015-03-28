Posts = new Mongo.Collection('posts');

Meteor.methods({
  postInsert : function(postAttributes) {
    check(Meteor.userId(), String);

    check(postAttributes, {
      title: String,
      url: String
    });

    var user = Meteor.user();
    var extendedPost = _.extend(postAttributes, {
      userId : user._id,
      author: user.username,
      submitted: new Date()
    });

    var postId = Posts.insert(extendedPost);
    return {_id: postId};
  }
})