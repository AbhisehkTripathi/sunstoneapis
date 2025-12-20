import Joi from "joi";

export const registerSchema = Joi.object({
  clerk_user_id: Joi.string().optional(),
  email: Joi.string().email().required(),
  name: Joi.string().optional().allow(""),
  profile: Joi.string().uri().optional().allow(null, ""),
  password_hash: Joi.string().optional(),  
  created_at: Joi.date().optional(),
  role: Joi.string().valid("patient", "admin", "therapist").default("patient"),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const refreshTokenSchema = Joi.object({
  user_id: Joi.string().required(),
});

export const logoutSchema = Joi.object({
  user_id: Joi.number().required(),
});

export const profileUpdateSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().optional().allow(""),
  email: Joi.string().email().optional(),
});