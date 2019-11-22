var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
    name: {type: String, required: true, max: 100},
});


AuthorSchema
.virtual('full_name')
.get(function () {
  return this.name;
});

AuthorSchema
.virtual('url')
.get(function () {
  return '/author/' + this._id;
});

const Author = mongoose.model('Author', AuthorSchema);
module.exports = Author;