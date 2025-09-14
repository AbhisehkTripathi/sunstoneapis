import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn
  } from "typeorm";
  
  @Entity("ocr")
  export class Ocr {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ type: "varchar", length: 255 })
    key: string;
  
    @Column({ type: "text", nullable: true })
    value: string;
  
    @Column({ type: "jsonb", nullable: true })
    bbox: Record<string, any>;
  
    @Column({ type: "int" })
    page_no: number;
  }