import Joi from "joi";

export const registerSchema = Joi.object({
  clerk_user_id: Joi.string().required(),
  email: Joi.string().email().required(),
  name: Joi.string().optional().allow(""),
  profile: Joi.string().uri().optional().allow(null, ""),
  created_at: Joi.date().optional(),
  role: Joi.string().valid("patient", "admin", "therapist").default("patient"),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
});
