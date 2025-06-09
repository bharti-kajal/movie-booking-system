import Joi from "joi";

// 1. Add  Validation
export const validateAddMovie = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(2).required().messages({
      'any.required': 'Title is required',
      'string.empty': 'Title cannot be empty',
      'string.min': 'Title should have at least 2 characters'
    }),
     description: Joi.string().min(10).required().messages({
      'any.required': 'Description is required',
      'string.empty': 'Description cannot be empty',
      'string.min': 'Description should have at least 10 characters'
    }),
     duration: Joi.string().required().messages({
      'any.required': 'Duration is required',
      'string.empty': 'Duration cannot be empty'
    }),
     genre: Joi.string().required().messages({
      'any.required': 'Genre is required',
      'string.empty': 'Genre cannot be empty',
    })
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details[0].message,
    });
  }

  next();
};

// 2. Update Validation 
export const validateUpdateMovie = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(2).required().messages({
      'any.required': 'Title is required',
      'string.min': 'Title should have at least 2 characters'
    }),
     description: Joi.string().min(10).required().messages({
      'any.required': 'Description is required',
      'string.min': 'Description should have at least 10 characters'
    }),
     duration: Joi.string().required().messages({
      'any.required': 'Duration is required'
    }),
     genre: Joi.string().required().messages({
      'any.required': 'Genre is required'
    }),
     movieId: Joi.string().required().messages({
      'any.required': 'movieId is required'
    })
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details[0].message,
    });
  }

  next();
};

// 3. Delete 
export const validateDeleteMovie = (req, res, next) => {
  const schema = Joi.object({
     movieId: Joi.string().required().messages({
      'any.required': 'movieId is required'
    })
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details[0].message,
    });
  }

  next();
};