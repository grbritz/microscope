Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var submittedPost = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    }

    // submittedPost._id = Posts.insert(submittedPost);
    Meteor.call('postInsert', submittedPost, function(error, result){
      if (error) {
        return alert(error.reason);
      }

      if (result.postExists) {
        alert('This link has already been posted');
      }

      Router.go('postPage', {_id: result._id});  
    });
  }
});