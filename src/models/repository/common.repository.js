class CommonRepository {

    // 1. Create User
    async create(model, user) {
      try {
        const newUser = new model(user);
        await newUser.save();
        return newUser; // return saved user
      } catch (err) {
        throw err;
      }
    }
  
    // 2.Search user using email
    async findbyEmail(model, email) {
      try {
        return await model.findOne({ email: email });
      } catch (err) {
        console.log("Error ", err);
      }
    }

  //1. Add Movie
  async add(model, data) {
    try {
      let result = await new model(data);
      return result.save();
    } catch (err) {
      console.log("Error in Repository", err);
    }
  }

  // 2. Show Listing of Movies filter and skip
  async get(model, filter = {}, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const totalCount = await model.countDocuments(filter);
      const movies = await model
        .find(filter)
        .select("title description duration genre")
        .skip(skip)
        .limit(limit);

      return { movies, totalCount };
    } catch (err) {
      console.log("Error in fetching lists", err);
      throw err;
    }
  }

  // 3. Delete a Movie
  async delete(movieId, model) {
    try {
      const result = await model.deleteOne({ _id: movieId });

      if (result.deletedCount === 0) {
        return null;
      }

      return result;
    } catch (err) {
      console.error("Error in delete data:", err);
      throw err;
    }
  }

  // 4. Blog Updated
  async update(movieId, update, model) {
    try {
      const result = await model.findOneAndUpdate({ _id: movieId }, update);
      return result;
    } catch (err) {
      console.log("Error in delete data", err);
    }
  }


// 5.Search user using email
    async findbyId(model, id) {
      try {
        return await model.findOne({ "_id": id });
      } catch (err) {
        console.log("Error ", err);
      }
    }

  // 5. View Users booking
  async usersBooking(model) {
    try {
      const result = await model
        .find({})
        .populate({
          path: "user",
          select: "name email",
        })
        .populate({
          path: "movie",
          select: "title",
        });
      return result;
    } catch (err) {
      console.log("Error in fetching lists", err);
      throw err;
    }
  }

}

export default CommonRepository;
