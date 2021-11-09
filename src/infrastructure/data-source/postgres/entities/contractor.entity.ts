import {
  Entity, PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class ContractorEntity {

  @PrimaryGeneratedColumn({})
  public ID: number;

}
