const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: Schema.ObjectId, ref: 'Author', required: true},
    description: {type: String, required: true},
    categoryId: {type: Schema.ObjectId},
    img: String,
    id: Number,
});
BookSchema.virtual('category', {
  ref: 'Category',
  localField: 'categoryId',
  foreignField: '_id',
  justOne: true
});

// Virtual for book's URL
BookSchema
.virtual('url')
.get(function () {
  return '/book/' + this._id;
});

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;