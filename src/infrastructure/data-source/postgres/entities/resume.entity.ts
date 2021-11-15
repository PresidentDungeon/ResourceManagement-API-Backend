import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { SummaryEntity } from "./summary.entity";
import { WorkExperienceEntity } from "./workExperience.entity";
import { EducationEntity } from "./education.entity";
import { CertificatesEntity } from "./certificates.entity";

@Entity()
export class ResumeEntity {

  @PrimaryGeneratedColumn({})
  public ID: number;

  @Column()
  public firstName: string;

  @Column()
  public middleName: string;

  @Column()
  public lastName: string;

  @Column()
  public middleLastName: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  nationality: string;

  @Column()
  occupation: string;

  @OneToOne(() => SummaryEntity, {cascade: ['insert']})
  @JoinColumn()
  public summary: SummaryEntity;

  @OneToMany(() => WorkExperienceEntity, (workExperienceEntity: WorkExperienceEntity) => workExperienceEntity.resume, { cascade: ['insert'] } )
  workExperience?: WorkExperienceEntity[];

  @ManyToMany(() => EducationEntity, { cascade: ['insert'] })
  @JoinTable()
  education: EducationEntity[];

  @ManyToMany(() => CertificatesEntity, { cascade: ['insert'] })
  @JoinTable()
  certificates: CertificatesEntity[];

  @Column()
  otherInformation: string;
}