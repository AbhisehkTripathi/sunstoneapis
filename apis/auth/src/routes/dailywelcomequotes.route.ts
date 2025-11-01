
import express from "express";
import QuotesController from "../app/controllers/quotes.controller";
import { decryptAndVerifyJwt } from "../app/middlewares/PassportJweMiddleware";
import { Validator } from "../app/middlewares/ValidatorMiddleware";
const route = express.Router();
import { asyncHandler } from "../utils/asyncHandler";

route.get('/daily-welcome-quotes', decryptAndVerifyJwt, asyncHandler(QuotesController.dailyWelcomeQuotes));

export default route;
