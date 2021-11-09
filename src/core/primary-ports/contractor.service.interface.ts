import {Contractor} from "../models/contracter";
import {Filter} from "../models/filter";
import {FilterList} from "../models/filterList";

export const IContractorServiceProvider = 'IContractorServiceProvider'
export interface IContractorService{

  getContractByID(ID: number): Promise<Contractor>
  getContracts(filter: Filter): Promise<FilterList<Contractor>>

}
