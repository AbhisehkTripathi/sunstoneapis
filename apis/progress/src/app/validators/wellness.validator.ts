import Joi from "joi";

export const addActivitySchema = Joi.object({
  user_id: Joi.string().optional().allow(""),
  data_type: Joi.string().optional(),
  title: Joi.string().optional().allow(""),
  description: Joi.string().optional().allow(""),
  created_at: Joi.date().optional(),
  stress_level: Joi.number().optional(),
  sleep_hours: Joi.number().optional(),
  mindfulness_frequency: Joi.number().optional(),
  energy_time: Joi.string().optional().allow(""),
  routine_type: Joi.string().optional().allow(""),
  activity_time: Joi.string().optional().allow(""),
  focus_goals: Joi.string().optional().allow(""),
});

export const updateActivitySchema = Joi.object({
  id: Joi.number().required(),
  user_id: Joi.string().optional().allow(""),
  data_type: Joi.string().optional(),
  title: Joi.string().optional().allow(""),
  description: Joi.string().optional().allow(""),
  created_at: Joi.date().optional(),
  stress_level: Joi.number().optional(),
  sleep_hours: Joi.number().optional(),
  mindfulness_frequency: Joi.number().optional(),
  energy_time: Joi.string().optional().allow(""),
  routine_type: Joi.string().optional().allow(""),
  activity_time: Joi.string().optional().allow(""),
  focus_goals: Joi.string().optional().allow(""),
});


