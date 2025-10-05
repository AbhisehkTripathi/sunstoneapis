// src/validators/index.ts
import {
    registerSchema,
    loginSchema,
    refreshTokenSchema,
    logoutSchema,
    profileUpdateSchema,
  } from "./user.validator";
  
  const Validators = {
    registerSchema,
    loginSchema,
    refreshTokenSchema,
    logoutSchema,
    profileUpdateSchema,
  };
  
  export default Validators;
  