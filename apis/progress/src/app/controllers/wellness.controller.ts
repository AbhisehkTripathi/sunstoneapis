import { Request, Response } from "express";
import { WellnessService } from "../services/wellness.service";
import { addActivitySchema,updateActivitySchema } from "../validators/wellness.validator";
import { successResponse, errorResponse } from "../../utils/response";
import Controller from "../../libs/Controller";

export default class UserController extends Controller {
  
  static async addActivity(req: Request, res: Response) {
    try {

      const { error, value } = addActivitySchema.validate(req.body);
      if (error) {
        return errorResponse(res, 400, "Validation failed", error.details);
      }

      const service = new WellnessService();
      const user = await service.addActivity(value);

      return successResponse(res, 201, "Activity added successfully", user);
    } catch (err: any) {
      return errorResponse(res, 500, "Internal Server Error", err.message);
    }
  }

  static async updateActivity(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { error, value } = updateActivitySchema.validate(req.body);
      if (error) {
        return errorResponse(res, 400, "Validation failed", error.details);
      }
  
      const service = new WellnessService();
      const updated = await service.updateActivity(Number(id), value);
  
      if (!updated) {
        return errorResponse(res, 404, "Activity not found");
      }
  
      return successResponse(res, 201, "Activity updated successfully", updated);
    } catch (err: any) {
      return errorResponse(res, 500, "Internal Server Error", err.message);
    }
  }
  
  
}
