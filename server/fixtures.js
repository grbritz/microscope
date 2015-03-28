if (Posts.find().count() === 0) {
  var now = new Date().getTime();

  var graemeId = Meteor.users.insert({
    profile: { name: 'Graeme Britz'}
  });
  var graeme = Meteor.users.findOne(graemeId);
  var viId = Meteor.users.insert({
    profile: { name: 'Violeta Lio King'}
  });
  var vi = Meteor.users.findOne(viId);

  var telescopeId = Posts.insert({
    title: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope/',
    userId: graeme._id,
    author: graeme.profile.name,
    submitted: new Date(now - 7 * 3600 * 1000)
  });

  Comments.insert({
    postId : telescopeId,
    userId : vi._id,
    author: vi.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'Interesting article Graeme!'
  });

  Comments.insert({
    postId : telescopeId,
    userId : graeme._id,
    author: graeme.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'Thanks Vi!'
  });

  Posts.insert({
    title: 'Meteor',
    url: 'http://meteor.com',
    userId: vi._id,
    author: vi.profile.name,
    submitted: new Date(now - 10 * 3600 * 1000)
  });

  Posts.insert({
    title: 'The Meteor Book',
    url: 'http://themeteorbook.com',
    userId: graeme._id,
    author: graeme.profile.name,
    submitted: new Date(now - 12 * 3600 * 1000);
  });
}

