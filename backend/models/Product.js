const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    category: {
      type: String,
      enum: ['Necklace', 'Earrings', 'Bangles', 'Rings', 'Bracelets', 'Anklets', 'Other'],
      default: 'Other',
    },
    imageUrl: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text" });
productSchema.index({ category: 1 });

module.exports = mongoose.model('Product', productSchema);
