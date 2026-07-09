import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discountPrice: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  sizes: [{
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  }],
  colors: [{
    type: String
  }],
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  fit: {
    type: String,
    default: ''
  },
  fabric: {
    type: String,
    default: ''
  },
  sleeve: {
    type: String,
    default: ''
  },
  washCare: {
    type: String,
    default: ''
  },
  returnPolicy: {
    type: String,
    default: '7 din ke andar return/exchange available'
  },
  deliveryInfo: {
    type: String,
    default: '3-5 din mein delivery'
  },
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);