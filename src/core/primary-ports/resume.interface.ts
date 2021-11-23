import { Resume } from "../models/Resume Objects/resume";
import { Filter } from "../models/filter";
import { FilterList } from "../models/filterList";

export const IResumeServiceProvider = 'IResumeServiceProvider'
export interface IResumeService{
  createResume(resume: Resume)

  getResumes(filter: Filter): Promise<FilterList<Resume>>;

  getResumeByID(ID: number): Promise<Resume>;
}
