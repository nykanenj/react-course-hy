const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  author: String,
  url: {
    type: String,
    minlength: 3,
    required: true,
  },
  likes: Number,
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

blogSchema.plugin(uniqueValidator);


module.exports = mongoose.model('Blog', blogSchema);
