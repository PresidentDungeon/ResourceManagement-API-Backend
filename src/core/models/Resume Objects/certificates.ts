export interface certificates {
  issueDate: string, //date
  expiryDate: string, //date
  certificateTypeID: string,
  certificateTitle: string,
  issuingAuthority: string,
  certificateType: string //Allowed values: 'mandatory', 'induction', 'roleSpecific', 'siteSpecific', 'other'
}