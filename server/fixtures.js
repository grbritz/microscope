if (Posts.find().count() === 0) {
  var now = new Date().getTime();

  var johnId = Meteor.users.insert({
    profile: { name: 'John Johnson'}
  });
  var john = Meteor.users.findOne(johnId);
  var billId = Meteor.users.insert({
    profile: { name: 'Bill Dufus'}
  });
  var bill = Meteor.users.findOne(billId);

  var telescopeId = Posts.insert({
    title: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope/',
    userId: john._id,
    author: john.profile.name,
    submitted: new Date(now - 7 * 3600 * 1000),
    numComments: 2
  });

  Comments.insert({
    postId : telescopeId,
    userId : bill._id,
    author: bill.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'Interesting article john!'
  });

  Comments.insert({
    postId : telescopeId,
    userId : john._id,
    author: john.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'Thanks bill!'
  });

  Posts.insert({
    title: 'Meteor',
    url: 'http://meteor.com',
    userId: bill._id,
    author: bill.profile.name,
    submitted: new Date(now - 10 * 3600 * 1000),
    numComments: 0
  });

  Posts.insert({
    title: 'The Meteor Book',
    url: 'http://themeteorbook.com',
    userId: john._id,
    author: john.profile.name,
    submitted: new Date(now - 12 * 3600 * 1000),
    numComments: 0
  });

  // Lets get lots of posts
  for (var i = 0; i < 20; i++) {
    Posts.insert({
      title: 'test post #' + i,
      url: 'http://google.com/?q=test-' + i,
      userId: john._id,
      author: john.profile.name,
      submitted: new Date(now - i * 3600 * 1000),
      numComments: 0
    });
  }
}

