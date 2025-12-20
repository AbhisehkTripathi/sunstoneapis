import { Request, Response } from "express";
import { QuotesService } from "../services/quotes.service";
import { successResponse, errorResponse } from "../../utils/response";
import Controller from "../../libs/Controller";
import moment from "moment";

export default class QuotesController extends Controller {
  static async dailyWelcomeQuotes(req: Request, res: Response) {
    try {
      const service = new QuotesService();

      const today = moment().format("YYYY-MM-DD");

      const quote = await service.getDailyQuote(today);

      if (!quote) {
        return errorResponse(res, 404, "No quote found for today");
      }

      return successResponse(res, 200, "Daily quote fetched successfully", quote);
    } catch (err: any) {
      return errorResponse(res, 500, "Internal Server Error", err.message);
    }
  }
}
