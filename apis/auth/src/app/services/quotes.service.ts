import { AppDataSource } from "../../config/database";
import { DailyWelcomeQuotes } from "../models/dailywelcomequotes";
import moment from "moment";
import crypto from "crypto";

export class QuotesService {
  private dailyWelcomeQuotesRepo: any;

  constructor() {
    this.dailyWelcomeQuotesRepo = AppDataSource.getRepository(DailyWelcomeQuotes);
  }

  async getDailyQuote(date: string) {
    const allQuotes = await this.dailyWelcomeQuotesRepo.find();

    if (!allQuotes || allQuotes.length === 0) return null;

    const hash = crypto.createHash("md5").update(date).digest("hex");
    const num = parseInt(hash.substring(0, 8), 16);
    const index = num % allQuotes.length;

    return {
      date,
      ...allQuotes[index],
    };
  }
}
