import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ResumeEntity } from "./resume.entity";

@Entity()
export class WorkExperienceEntity {

  @PrimaryGeneratedColumn()
  ID: number

  @ManyToOne(() => ResumeEntity, (resumeEntity: ResumeEntity) => resumeEntity.workExperience)
  public resume: ResumeEntity

  @Column()
  fromDate: string

  @Column()
  toDate: string

  @Column()
  client: string

  @Column()
  clientID?: string

  @Column()
  site: string

  @Column()
  siteID?: string

  @Column()
  roleHeld: string

  @Column()
  roleHeldReferenceCode?: string

  @Column()
  comments: string

  @Column()
  experienceType: string

}