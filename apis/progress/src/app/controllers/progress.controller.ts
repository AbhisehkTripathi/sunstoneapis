import { Request, Response } from "express";
import { ProgressService } from "../services/progress.service";
import { successResponse, errorResponse } from "../../utils/response";

export default class ProgressController {
  static async addProgressEntry(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = new ProgressService();

      const entry = await service.addProgressEntry(Number(id), req.body);

      return successResponse(res, 201, "Progress entry saved", entry);
    } catch (err: any) {
      return errorResponse(res, 500, "Internal Server Error", err.message);
    }
  }

  static async getProgressReport(req: Request, res: Response) {
    try {
      const { id } = req.params; 
      const service = new ProgressService();

      const report = await service.getProgressReport(Number(id));

      return successResponse(res, 200, "Progress report generated", report);
    } catch (err: any) {
      return errorResponse(res, 500, "Internal Server Error", err.message);
    }
  }
}
