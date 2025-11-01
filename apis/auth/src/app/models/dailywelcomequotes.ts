import {
    Entity,
    PrimaryGeneratedColumn,
    Column
  } from "typeorm";
  

  @Entity("daily_welcome_quotes")
  export class DailyWelcomeQuotes {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ type: "int" })
    day_number: number;
  
    @Column({ type: "text" })
    category: string;

    @Column({ type: "text" })
    quote_text: string;

    @Column({ type: "text" })
    mood_intent: string;

    @Column({ type: "text" })
    author: string;

    @Column({ type: "timestamp" })
    created_at: Date;
  }
