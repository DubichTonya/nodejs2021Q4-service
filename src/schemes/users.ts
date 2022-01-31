const Joi = require('joi');

export const userPostSchema = Joi.object({
  login: Joi.string().required(),
  name: Joi.string().optional(),
  password: Joi.string().required(),
});

export const userPutSchema = Joi.object({
  id: Joi.string(),
  login: Joi.string(),
  name: Joi.string(),
  password: Joi.string(),
});