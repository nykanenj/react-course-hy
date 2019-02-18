const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const config = require('../utils/config');


const url = config.MONGODB_URI;
console.log('Connecting to: ', url);

mongoose.connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

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
