Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); }
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // Removes those two field names and checks that the user passed no others to the update function
    // thereby enforcing that they can only update these two fields
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Meteor.methods({
  postInsert : function(postAttributes) {
    check(Meteor.userId(), String);

    check(postAttributes, {
      title: String,
      url: String
    });

    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if(postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      };
    }


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