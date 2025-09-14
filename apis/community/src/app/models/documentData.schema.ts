import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn
  } from "typeorm";
  

  @Entity("documentdata")
  export class DocumentData {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ type: "text" })
    file_path: string;
  
    @CreateDateColumn({ type: "timestamp" })
    uploaded_at: Date;

  }