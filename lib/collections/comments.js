Comments = new Mongo.Collection('comments');

Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(Meteor.userId(), String);
    check(commentAttributes, {
      postId: String,
      body: String
    });

    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);
    if (!post) {
      throw new Meteor.Error('invalid-comment', 'Comments can only be made on posts');
    }

    comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    return Comments.insert(comment);
  }
});

