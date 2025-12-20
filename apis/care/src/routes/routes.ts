import express from "express";
import UserController from "../app/controllers/users.controller";
import { decryptAndVerifyJwt } from "../app/middlewares/PassportJweMiddleware";

const route = express.Router();

route.post("/register", UserController.register);
route.get("/uses", decryptAndVerifyJwt, UserController.list);
route.post('/login',UserController.login);
export default route;
