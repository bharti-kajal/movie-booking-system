import Joi from "joi";

export const validateAdd = (req, res, next) => {
  const schema = Joi.object({
    user: Joi.string()
      .trim()
      .required()
      .messages({
        'string.empty': 'User Id cannot be empty',
        'any.required': 'User Id is required',
      }),

    movie: Joi.string()
      .trim()
      .required()
      .messages({
        'string.empty': 'Movie Id cannot be empty',
        'any.required': 'Movie Id is required',
      }),

    showDate: Joi.date()
      .min('now')
      .required()
      .messages({
        'date.base': 'Show Date must be a valid date',
        'date.min': 'Booking for past dates is not allowed',
        'any.required': 'Show Date is required',
      }),

    showTime: Joi.string()
      .trim()
      .required()
      .messages({
        'string.empty': 'Show Time cannot be empty',
        'any.required': 'Show Time is required',
      }),

    seats: Joi.array()
      .items(Joi.string().trim().required())
      .min(1)
      .required()
      .messages({
        'array.base': 'Seats must be an array of seat IDs',
        'array.min': 'At least one seat must be selected',
        'any.required': 'Seats are required',
      }),

    totalPrice: Joi.number()
      .positive()
      .required()
      .messages({
        'number.base': 'Total Price must be a number',
        'number.positive': 'Total Price must be greater than zero',
        'any.required': 'Total Price is required',
      }),
  });

  const { error } = schema.validate(req.body, { abortEarly: true });

  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details[0].message,
    });
  }

  next();
};
