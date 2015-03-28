Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var submittedPost = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    }

    submittedPost._id = Posts.insert(submittedPost);
    Router.go('postPage', submittedPost);
  }
});