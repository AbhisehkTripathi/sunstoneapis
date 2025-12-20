import { AppDataSource } from "../../config/database";
import { UserWellnessData } from "../models/userwellnessdata.schema";

export class WellnessService {
  private WellnessRepo;

  constructor() {
    this.WellnessRepo = AppDataSource.getRepository(UserWellnessData);
  }

  async addActivity(data: any) {
    const payload: Partial<UserWellnessData> = {
      user_id: data.user_id ? Number(data.user_id) : null,
      data_type: data.data_type,
      title: data.title,
      description: data.description,
      stress_level: data.stress_level,
      sleep_hours: data.sleep_hours,
      mindfulness_frequency: data.mindfulness_frequency,
      energy_time: data.energy_time,
      routine_type: data.routine_type,
      activity_time: data.activity_time,
      focus_goals: data.focus_goals
    };
    console.warn("Payload",payload)
    const activity = this.WellnessRepo.create(payload);
    return await this.WellnessRepo.save(activity);
  }

  async updateActivity(id: number, data: any) {
    const payload: Partial<UserWellnessData> = {
      user_id: data.user_id ? Number(data.user_id) : null,
      data_type: data.data_type,
      title: data.title,
      description: data.description,
      stress_level: data.stress_level,
      sleep_hours: data.sleep_hours,
      mindfulness_frequency: data.mindfulness_frequency,
      energy_time: data.energy_time,
      routine_type: data.routine_type,
      activity_time: data.activity_time,
      focus_goals: data.focus_goals,
    };
  
    console.warn("Update Payload:", payload);
  
    await this.WellnessRepo.update({ id }, payload);
  
    return await this.WellnessRepo.findOneBy({ id });
  }
  
}
