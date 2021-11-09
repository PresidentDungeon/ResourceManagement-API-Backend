import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post, Put, Query, UseGuards } from "@nestjs/common";
import {IContractorService, IContractorServiceProvider} from "../../core/primary-ports/contractor.service.interface";
import {Filter} from "../../core/models/filter";

@Controller('contract')
export class ContractorController {

  constructor(@Inject(IContractorServiceProvider) private contractorService: IContractorService) {}

  @Get('getContractorByID')
  async getContractorByID(@Query() contractorID: any){
    try{
      let foundContractor = await this.contractorService.getContractByID(contractorID.ID);
      return foundContractor;
    }
    catch (e) {throw new HttpException(e.message, HttpStatus.BAD_REQUEST);}
  }

  @Get('getContractors')
  async getAllContractors(@Query() filter: Filter){
    try{
      return await this.contractorService.getContracts(filter);
    }
    catch(e){
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
