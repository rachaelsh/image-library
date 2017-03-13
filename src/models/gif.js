let mongoose = require('mongoose');

let GifSchema = new mongoose.Schema({
  name: String,
  url: String,
  description: String,
  owner: {
    type: String,
    //type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Gif', GifSchema);
