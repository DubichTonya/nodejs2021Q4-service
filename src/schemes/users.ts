const Joi = require('joi');

export const userPostSchema = Joi.object({
  login: Joi.string().required(),
  name: Joi.string(),
  password: Joi.string().required(),
});
