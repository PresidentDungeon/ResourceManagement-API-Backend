export interface WorkExperience {
  fromDate: string, //date
  toDate: string, //date
  client: string,
  clientID?: string,
  site: string,
  siteID?: string,
  roleHeld: string,
  roleHeldReferenceCode?: string,
  comments: string,
  experienceType: string //only value 'internal' or 'external'
}
