import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EducationEntity {

  @PrimaryGeneratedColumn()
  ID: number

  @Column()
  nameOfInstitution: string

  @Column()
  cityOfInstitution: string

  @Column()
  language: string

  @Column()
  typeOfEducation: string

  @Column()
  comments?: string

}