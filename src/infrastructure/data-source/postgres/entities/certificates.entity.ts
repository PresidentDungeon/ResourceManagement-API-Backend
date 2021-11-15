import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

export enum certificateTypeValues {
  MANDATORY = 'mandatory',
  INDUCTION = 'induction',
  ROLESPECIFIC = 'roleSpecific',
  SITESPECIFIC = 'siteSpecific',
  OTHER = 'other'
}

@Entity()
export class CertificatesEntity {

  @PrimaryGeneratedColumn()
  ID: number

  @Column()
  issueDate: string

  @Column({nullable: true})
  expiryDate: string

  @Column()
  certificateTypeID: string

  @Column()
  certificateTitle: string

  @Column()
  issuingAuthority: string

  @Column({ type: "enum", enum: certificateTypeValues, default: certificateTypeValues.OTHER})
  certificateType: string
}