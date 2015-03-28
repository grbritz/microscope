// Null as name since this data will never be saved, and thus needs no mongodb collection
Errors = new Mongo.Collection(null);

throwError = function(message) {
  Errors.insert({message: message});
}