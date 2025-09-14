import express from "express";
import UserController from "../app/controllers/users.controller";
import { decryptAndVerifyJwt } from "../app/middlewares/PassportJweMiddleware";
import {Validator} from "../app/middlewares/ValidatorMiddleware";
const route = express.Router();
import { asyncHandler } from "../utils/asyncHandler";


route.post("/register", Validator("registerSchema"), asyncHandler(UserController.register));
route.post("/login", Validator("loginSchema"), asyncHandler(UserController.login));
route.get("/users", decryptAndVerifyJwt, asyncHandler(UserController.list));

export default route;
