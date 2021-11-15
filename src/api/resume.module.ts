import { Module } from '@nestjs/common';
import { ResumeController } from "./controllers/resume.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ResumeEntity } from "../infrastructure/data-source/postgres/entities/resume.entity";
import { IResumeServiceProvider } from "../core/primary-ports/resume.interface";
import { ResumeService } from "../core/services/resume.service";

@Module({
  imports: [TypeOrmModule.forFeature([ResumeEntity])],
  controllers: [ResumeController],
  providers: [{provide: IResumeServiceProvider, useClass: ResumeService}],
  exports: [IResumeServiceProvider]
})
export class ResumeModule {}
