import { Module } from '@nestjs/common';
import { ContractorController } from "./controllers/contractor.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContractorEntity } from "../infrastructure/data-source/postgres/entities/contractor.entity";
import {IContractorServiceProvider} from "../core/primary-ports/contractor.service.interface";
import {ContractorService} from "../core/services/contractor.service";

@Module({
  imports: [TypeOrmModule.forFeature([ContractorEntity])],
  controllers: [ContractorController],
  providers: [{provide: IContractorServiceProvider, useClass: ContractorService}],
  exports: [IContractorServiceProvider]
})
export class ContractorModule {}
