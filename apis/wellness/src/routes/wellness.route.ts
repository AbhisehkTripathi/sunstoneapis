import express from "express";
import {Validator} from "../app/middlewares/ValidatorMiddleware";
const route = express.Router();
import { asyncHandler } from "../utils/asyncHandler";
import WellnessController from "../app/controllers/wellness.controller";


route.post("/add-activities", Validator("addActivitySchema"), asyncHandler(WellnessController.addActivity));
route.patch("/update-activities/:id", Validator("updateActivitySchema"), asyncHandler(WellnessController.updateActivity));

export default route;
