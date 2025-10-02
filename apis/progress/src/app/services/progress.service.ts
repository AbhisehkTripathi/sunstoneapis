import { AppDataSource } from "../../config/database";
import { Progress } from "../models/progress.schema";

export class ProgressService {
  private repo;

  constructor() {
    this.repo = AppDataSource.getRepository(Progress);
  }

  // Add or update progress entry by date (per user)
  async addProgressEntry(userId: number, data: any) {
    const { period, metrics } = data;

    // Check if entry already exists for user + date
    let entry = await this.repo.findOne({ where: { user_id: userId, period } });

    if (entry) {
      // Update existing entry
      entry.metrics = metrics;
      return await this.repo.save(entry);
    } else {
      // Insert new entry
      const payload: Partial<Progress> = {
        user_id: userId,
        period,
        metrics,
      };
      const newEntry = this.repo.create(payload);
      return await this.repo.save(newEntry);
    }
  }

  // Fetch date-wise report for a user
  async getProgressReport(userId: number) {
    return await this.repo.find({
      where: { user_id: userId },
      order: { period: "ASC" },
    });
  }
}
