import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("user_wellness_data")
export class UserWellnessData {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int", nullable: true })
  user_id: number | null;

  @Column({ type: "varchar", length: 50 })
  data_type: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  title: string | null;

  @Column({ type: "text", nullable: true })
  description: string | null;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "int", nullable: true })
  stress_level: number | null;

  @Column({ type: "int", nullable: true })
  sleep_hours: number | null;

  @Column({ type: "int", nullable: true })
  mindfulness_frequency: number | null;

  @Column({ type: "varchar", length: 50, nullable: true })
  energy_time: string | null;

  @Column({ type: "varchar", length: 50, nullable: true })
  routine_type: string | null;

  @Column({ type: "time", nullable: true })
  activity_time: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  focus_goals: string | null;
}
