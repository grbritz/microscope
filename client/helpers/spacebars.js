Template.registerHelper('pluralize', function(n, thing) {
  // Really basic pluralizer
  return n + ' ' + thing + (n === 1 ? '' : 's');
});