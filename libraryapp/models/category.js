const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var CategorySchema = new Schema({
  
  title: { type: String, required: true, max: 100 },
  name: { type: String, required: true, max: 100 },
  id: Number
});

CategorySchema
  .virtual('url')
  .get(function () {
    return '/category/' + this._id;
  });



const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;