import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn
  } from "typeorm";
  
  @Entity("users")
  export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ type: "varchar", length: 255 })
    name: string;
  
    @Column({ type: "varchar", length: 255, unique: true })
    email: string;
  
    @Column({ type: "varchar", length: 100, unique: true })
    username: string;
  
    @Column({ type: "text" })
    password_hash: string;
  
    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;
  
  }