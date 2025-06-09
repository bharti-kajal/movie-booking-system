import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  }
}, { timestamps: true });

const movieModel = mongoose.model('Movie', movieSchema);
export default movieModel;
