import Joi from "joi";

export const progressEntrySchema = Joi.object({
  mood: Joi.string().required(),
  notes: Joi.string().optional().allow("")
});