import { Module } from "@nestjs/common";
import { DatabaseModule } from './infrastructure/data-source/postgres/database.module';
import { ConfigModule } from "@nestjs/config";
import * as Joi from '@hapi/joi';
import { ResumeModule } from "./api/resume.module";

@Module({
  imports: [ResumeModule, ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
    validationSchema: Joi.object({
      POSTGRES_HOST: Joi.string().required(),
      POSTGRES_PORT: Joi.number().required(),
      POSTGRES_USER: Joi.string().required(),
      POSTGRES_PASSWORD: Joi.string().required(),
      POSTGRES_DB: Joi.string().required(),
      PORT: Joi.number(),
      FRONTEND_ROUTE: Joi.string().required(),
    })
  }), DatabaseModule],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
