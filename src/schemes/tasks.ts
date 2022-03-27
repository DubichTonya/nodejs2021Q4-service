const Joi = require('joi');

export const taskPostSchema = Joi.object({
  title: Joi.string().required(),
  order: Joi.number().required(),
  description: Joi.string(),
  userId: Joi.string().allow(null),
  boardId: Joi.string().allow(null),
  columnId: Joi.string().allow(null),
});

export const taskPutSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string(),
  order: Joi.number(),
  description: Joi.string(),
  userId: Joi.string().allow(null),
  boardId: Joi.string().allow(null),
  columnId: Joi.string().allow(null),
});
