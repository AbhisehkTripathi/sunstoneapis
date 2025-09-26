import { registerSchema, loginSchema, refreshTokenSchema } from "./user.validator";
import { addActivitySchema, updateActivitySchema } from "./wellness.validator";
export default module.exports = {
    registerSchema,
    loginSchema,
    refreshTokenSchema,
    addActivitySchema,
    updateActivitySchema
}