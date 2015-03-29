Template.postsList.rendered = function() {
  this.find('.wrapper')._uihooks = {
    moveElement: function (node, next) {
      var $node = $(node), $next = $(next);
      var oldTop = $node.offset().top;
      var height = $node.outerHeight(true);

      //find all elements between next and node
      var $inBetween = $next.nextUntil(node);
      if ($inBetween.length === 0) {
        $inBetween = $node.nextUntil(next);
      }

      // Put node in place
      $node.insertBefore(next);

      // Measure new top
      var newTop = $node.offset().top;

      // Move node back to where it was before
      $node.removeClass('animate').css('top', oldTop - newTop);
    
      // Push every other elemtn down (or up) to put them back in place
      $inBetween.removeClass('animate').css('top', oldTop < newTop ? height : -1 * height);

      // Force a redraw
      $node.offset();

      // Reset everything to 0, animated
      $node.addClass('animate').css('top', 0);
      $inBetween.addClass('animate').css('top', 0);
    }
  };
};