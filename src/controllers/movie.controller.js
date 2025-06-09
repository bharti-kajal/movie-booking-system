import movieModel from "../models/schema/movie.schema.js";
import CommonRepository from "../models/repository/common.repository.js";
class MovieController {

  constructor() {
    this.commonRepository = new CommonRepository();
  }

  
  // Movie Add
  async add(req, res) {
    try {
      const { title, description, duration, genre } = req.body;
      const movieData = {
        title,
        description,
        duration,
        genre
      };

      let result = await this.commonRepository.add(movieModel, movieData);
      if (result) {
        res
          .status(201)
          .json({ status: true, message: "Movie Added Successfully!" });
      } else {
        res
          .status(400)
          .json({ status: false, message: "Something Went Wrong!" });
      }
    } catch (err) {
        return res
        .status(500)
        .json({ status: false, message: "Internal server error" });
    }
  }

  // Movie Lists
  async lists(req, res) {
    try {

      // Extract query params for pagination and filtering
      let { page = 1, limit = 10, genre, title } = req.query;

      page = parseInt(page);
      limit = parseInt(limit);

      const filter = {};
      if (genre) {
        filter.genre = genre;
      }
      if (title) {
        filter.title = { $regex: title, $options: "i" };
      }

      const { movies, totalCount } = await this.commonRepository.get(
        movieModel,
        filter,
        page,
        limit
      );

      res.status(200).json({
        status: true,
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        movies,
      });
    } catch (err) {
        return res
        .status(500)
        .json({ status: false, message: "Internal server error" });
    }
  }
  // End

  // Start Delete Movie
  async delete(req, res) {
    try {
      const movieId = req.body.movieId;
       // Check MovieId Exists or not 
      const movieIdExist = await this.commonRepository.findbyId(
              movieModel,
              movieId
            );

      if(!movieIdExist){
        res
          .status(400)
          .json({ status: false, message: "movieId Incorrect or deleted" });
      }

      const result = await this.commonRepository.delete(movieId, movieModel);
      if (result) {
        res
          .status(200)
          .json({ status: 200, message: "Movie Deleted Successfully!" });
      } else {
        res.status(400).json({ status: false, message: "Something Went Wrong!" });
      }
    } catch (err) {
        return res
        .status(500)
        .json({ status: false, message: "Internal server error" });
    }
  }
  // End Delete Movie

  // Update Movie Details
  async update(req, res) {
    try {
      const { movieId, title, description, duration, genre } = req.body;

      // Check MovieId Exists or not 
      const movieIdExist = await this.commonRepository.findbyId(
              movieModel,
              movieId
            );

      if(!movieIdExist){
        res
          .status(400)
          .json({ status: false, message: "movieId Incorrect" });
      }
      const data = {
        title,
        description,
        duration,
        genre,
      };

      let result = await this.commonRepository.update(movieId, data, movieModel);
      if (result) {
        res
          .status(200)
          .json({ status: true, message: "Movie Updated Successfully!" });
      } else {
        res
          .status(400)
          .json({ status: false, message: "Something Went Wrong!" });
      }
    } catch (err) {
       return res
        .status(500)
        .json({ status: false, message: "Internal server error" });
    }
  }
 
}

export default MovieController;
