import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [3, 'Title must be at least 3 characters long']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [10, 'Description must be at least 10 characters long']
  },
  duration: {
    type: String,
    required: [true, 'Duration is required']
  },
  genre: {
    type: String,
    required: [true, 'Genre is required']
  }
}, { timestamps: true });

const movieModel = mongoose.model('Movie', movieSchema);
export default movieModel;
