import { Summary } from "./Summary";
import { WorkExperience } from "./WorkExperience";
import { Education } from "./Education";
import { Certificates } from "./Certificates";

export interface Resume {
  ID: number,
  firstName: string,
  middleName: string,
  lastName: string,
  middleLastName: string,
  dateOfBirth: Date, //date
  nationality: string, //ISO 3166 Alpha-3 country code
  occupation: string,
  summary: Summary,
  workExperience?: WorkExperience[],
  education: Education[],
  certificates: Certificates[],
  otherInformation: string
}
