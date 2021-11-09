import { Injectable } from '@nestjs/common';
import {IContractorService} from "../primary-ports/contractor.service.interface";
import {Contractor} from "../models/contracter";
import {Filter} from "../models/filter";
import {FilterList} from "../models/filterList";
import {InjectRepository} from "@nestjs/typeorm";
import {ContractorEntity} from "../../infrastructure/data-source/postgres/entities/contractor.entity";
import {Repository} from "typeorm";

@Injectable()
export class ContractorService implements IContractorService {

    constructor(
        @InjectRepository(ContractorEntity) private contractorRepository: Repository<ContractorEntity>,
    ) {}

    async getContractByID(ID: number): Promise<Contractor> {

        if(ID == null || ID == undefined || ID <= 0){
            throw new Error('Contractor ID must be instantiated or valid');
        }

        let qb = this.contractorRepository.createQueryBuilder("contractor");
        qb.andWhere(`contractor.ID = :contractorID`, { contractorID: `${ID}`});
        const foundContractor: ContractorEntity = await qb.getOne();

        if(foundContractor == null)
        {
            throw new Error('No contractor registered with such ID');
        }

        return foundContractor;
    }

    async getContracts(filter: Filter): Promise<FilterList<Contractor>> {

        if(filter == null || filter == undefined){
            throw new Error('Invalid filter entered');
        }

        if(filter.itemsPrPage == null || filter.itemsPrPage == undefined || filter.itemsPrPage <= 0){
            throw new Error('Invalid items pr. page entered');
        }

        if(filter.currentPage == null || filter.currentPage == undefined || filter.currentPage < 0){
            throw new Error('Invalid current page entered');
        }

        let qb = this.contractorRepository.createQueryBuilder("contractor");

        qb.offset((filter.currentPage) * filter.itemsPrPage);
        qb.limit(filter.itemsPrPage);

        const result = await qb.getMany();
        const count = await qb.getCount();

        const filterList: FilterList<ContractorEntity> = {list: result, totalItems: count};
        return filterList;
    }
}
