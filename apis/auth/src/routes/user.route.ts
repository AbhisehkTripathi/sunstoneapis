import express from "express";
import UserController from "../app/controllers/users.controller";
import { decryptAndVerifyJwt } from "../app/middlewares/PassportJweMiddleware";
import {Validator} from "../app/middlewares/ValidatorMiddleware";
const route = express.Router();
import { asyncHandler } from "../utils/asyncHandler";


route.post("/register", Validator("registerSchema"), asyncHandler(UserController.register));
route.post("/login", Validator("loginSchema"), asyncHandler(UserController.login));
route.patch("/logout", decryptAndVerifyJwt,Validator("logoutSchema"), asyncHandler(UserController.logout));
route.post('/refresh-token', decryptAndVerifyJwt, Validator("refreshTokenSchema"), asyncHandler(UserController.refreshToken));
route.get("/find-user", decryptAndVerifyJwt, asyncHandler(UserController.list));
route.get('/me', decryptAndVerifyJwt, asyncHandler(UserController.profileInfo));
route.patch('/profile-update/:id', Validator("profileUpdateSchema"), asyncHandler(UserController.profileUpdate));

export default route;
