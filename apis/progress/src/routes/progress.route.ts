import express from "express";
import { Validator } from "../app/middlewares/ValidatorMiddleware";
const route = express.Router();
import { asyncHandler } from "../utils/asyncHandler";
import ProgressController from "../app/controllers/progress.controller";


route.post("/user/:id/entries", Validator("progressEntrySchema"), asyncHandler(ProgressController.addProgressEntry));

route.get(
    "/reports/:id",
    asyncHandler(ProgressController.getProgressReport)
);
export default route;


