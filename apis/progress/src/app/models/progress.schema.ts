import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from "typeorm";
  
  @Entity("progress")
  export class Progress {
    @PrimaryGeneratedColumn("increment")
    progress_id: number;
  
    @Column({ type: "int", nullable: true })
    user_id: number;
  
    @Column({ type: "date" })
    period: string;
  
    @Column({ type: "jsonb", nullable: true })
    metrics: Record<string, any>;
  
    @CreateDateColumn({ type: "timestamp", default: () => "now()" })
    created_at: Date;
  }
  