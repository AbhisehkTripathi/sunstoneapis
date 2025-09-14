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
    user_id: string;
  
    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column({ nullable: true })
    clerk_user_id?: string;
  
    @Column({ type: "varchar", length: 255, unique: true })
    email: string;
  
    @Column({ type: "varchar", length: 100, unique: true })
    role: string;

    @Column({ type: "varchar", length: 100, unique: true })
    password_hash: string;

    @Column({ type: "varchar", length: 100, unique: true })
    profile: string;
  
    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;
  
  }