const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  description: String,
  category: String,
  brand: String,
  condition: { type: String, enum: ['New', 'Gently Used', 'Fair'] },
  price: Number,
  size: String,
  images: [String],
  tags: [String],
  stock: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
