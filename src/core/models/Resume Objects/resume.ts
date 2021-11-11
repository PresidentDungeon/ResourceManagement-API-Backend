import { summary } from "./summary";
import { workExperience } from "./workExperience";
import { education } from "./education";
import { certificates } from "./certificates";

export interface resume {
  firstName: string,
  middleName: string,
  lastName: string,
  middleLastName: string,
  dateOfBirth: string, //date
  nationality: string, //ISO 3166 Alpha-3 country code
  occupation: string,
  summary: summary,
  workExperience: workExperience,
  education: education,
  certificates: certificates,
  otherInformation: string
}