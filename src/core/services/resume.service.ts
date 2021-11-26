import { Injectable } from '@nestjs/common';
import { IResumeService } from "../primary-ports/resume.interface";
import { Resume } from "../models/Resume Objects/resume";
import { InjectRepository } from "@nestjs/typeorm";
import { ResumeEntity } from "../../infrastructure/data-source/postgres/entities/resume.entity";
import { Repository } from "typeorm";
import { Filter } from "../models/filter";
import { FilterList } from "../models/filterList";

@Injectable()
export class ResumeService implements IResumeService{

  constructor(
    @InjectRepository(ResumeEntity) private resumeRepository: Repository<ResumeEntity>) {}

  async createResume(resume: Resume): Promise<Resume>{

    resume.dateOfBirth = new Date(resume.dateOfBirth);

    const newResume = await this.resumeRepository.create(resume);

    const savedResume = await this.resumeRepository.save(newResume);
    return savedResume;

    }

  async getResumes(filter: Filter): Promise<FilterList<Resume>> {

    let qb = this.resumeRepository.createQueryBuilder("resume");

    if(filter.name != null && filter.name !== '')
    {
      qb.andWhere(`CONCAT(resume.firstName, ' ', resume.middleLastName) ILIKE :fullName`, { fullName: `%${filter.name}%` });
    }

    if(filter.occupation != null && filter.occupation !== '')
    {
      qb.andWhere(`resume.occupation ILIKE :occupation`, { occupation: `%${filter.occupation}%` });
    }

    if(filter.sorting != null && filter.sorting === 'ASC' || filter.sorting != null && filter.sorting === 'DESC')
    {
      if(filter.sortingType != null && filter.sortingType === 'AZ')
      {
        qb.orderBy('resume.firstName', filter.sorting);
      }
      if(filter.sortingType != null && filter.sortingType === 'ADDED')
      {
        qb.orderBy('resume.ID', filter.sorting);
      }
      if(filter.sortingType != null && filter.sortingType === 'OCC')
      {
        qb.orderBy('resume.occupation', filter.sorting);
      }
    }

    qb.offset((filter.currentPage) * filter.itemsPrPage);
    qb.limit(filter.itemsPrPage);

    const result = await qb.getMany();
    const count = await qb.getCount();

    const filterList: FilterList<Resume> = {list: result, totalItems: count};
    return filterList;
  }

  async getResumeByID(ID: number): Promise<Resume> {

    if (ID == null || ID == undefined || ID <= 0) {
      throw new Error('User ID must be instantiated or valid');
    }

    let qb = this.resumeRepository.createQueryBuilder("resume");
    qb.leftJoinAndSelect('resume.summary', 'summary');
    qb.leftJoinAndSelect('resume.workExperience', 'workExperience');
    qb.leftJoinAndSelect('resume.education', 'education');
    qb.leftJoinAndSelect('resume.certificates', 'certificates');
    qb.andWhere(`resume.ID = :resumeID`, { resumeID: `${ID}` });
    const foundResume: ResumeEntity = await qb.getOne();

    if (foundResume == null) {
      throw new Error('No resume registered with this ID');
    }
    return foundResume;
  }

  async getResumesByID(IDs: number[]): Promise<Resume[]> {

    if(IDs.length == 0){return []}

    let qb = this.resumeRepository.createQueryBuilder("resume");
    qb.leftJoinAndSelect('resume.summary', 'summary');
    qb.leftJoinAndSelect('resume.workExperience', 'workExperience');
    qb.leftJoinAndSelect('resume.education', 'education');
    qb.leftJoinAndSelect('resume.certificates', 'certificates');
    qb.andWhere('resume.ID IN (:...resumeIDs)', {resumeIDs: IDs});
    const foundResumes: ResumeEntity[] = await qb.getMany();

    return foundResumes;
  }
}
