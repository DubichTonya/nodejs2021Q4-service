const Joi = require('joi');

export const boardPostSchema = Joi.object({
  title: Joi.string(),
  columns: Joi.array().items(
    Joi.object({
      title: Joi.string(),
      order: Joi.number(),
    }),
  ),
});

export const boardPutSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string(),
  columns: Joi.array().items(
    Joi.object({
      id: Joi.string(),
      title: Joi.string(),
      order: Joi.number(),
    }),
  ),
});
