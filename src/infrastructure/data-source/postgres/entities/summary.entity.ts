import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SummaryEntity {

  @PrimaryGeneratedColumn()
  ID: number

  @Column()
  summaryHeadline: string;

  @Column()
  summaryBody: string;

}