import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post, Query } from "@nestjs/common";
import {Filter} from "../../core/models/filter";
import { IResumeService, IResumeServiceProvider } from "../../core/primary-ports/resume.interface";
import { Resume } from "../../core/models/Resume Objects/resume";

@Controller('resume')
export class ResumeController {

  constructor(@Inject(IResumeServiceProvider) private resumeService: IResumeService) {}

  @Post('createResume')
  async createResume(@Body() resume: Resume){
    try{
     let createdResume = await this.resumeService.createResume(resume) ;
     return createdResume;
    }
    catch (e) {throw new HttpException(e.message, HttpStatus.BAD_REQUEST);}
  }

  @Post('createResumes')
  async createResumes(@Body() resumes: Resume[]){
    for(let resume of resumes) {
      let createdResumes = await this.resumeService.createResume(resume);
    }
  }

  @Get('getResumes')
  async getResumes(@Query() filter: Filter){
    try{
    return await this.resumeService.getResumes(filter);
    }
    catch (e) {throw new HttpException(e.message, HttpStatus.BAD_REQUEST);}
  }

  @Get('getResumeByID')
  async getResumeByID(@Query() resumeID: any){
    try{
    return await this.resumeService.getResumeByID(resumeID.ID);
    }
    catch (e) {throw new HttpException(e.message, HttpStatus.BAD_REQUEST);}
  }

  @Post('getResumesByID')
  async getResumesByID(@Body() resumeIDs: number[]){
    try{
      return await this.resumeService.getResumesByID(resumeIDs);
    }
    catch (e) {throw new HttpException(e.message, HttpStatus.BAD_REQUEST);}
  }


}
