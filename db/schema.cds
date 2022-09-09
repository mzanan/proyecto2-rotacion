namespace bHub;

// consumo de api hub
using {API_BUSINESS_PARTNER as bupa} from '../srv/external/API_BUSINESS_PARTNER';

//Obtengo los datos del api hub y los guardo en una entidad
entity Suppliers as projection on bupa.A_BusinessPartner {
  BusinessPartner,
  Customer,
  Supplier,
  AcademicTitle,
  AuthorizationGroup,
  BusinessPartnerCategory,
  BusinessPartnerFullName,
  BusinessPartnerName,
  BusinessPartnerUUID,
  CreatedByUser,
  CreationDate,
  CreationTime,
  FirstName,
  IsFemale,
  IsMale,
  IsNaturalPerson,
  GenderCodeName,
  Language,
  LastChangeDate,
  LastChangeTime,
  LastChangedByUser,
  LastName,
  LegalForm,
  OrganizationBPName1,
  OrganizationBPName2,
  OrganizationFoundationDate,
  OrganizationLiquidationDate,
  BirthDate,
  BusinessPartnerDeathDate,
  BusinessPartnerIsBlocked,
  PersonNumber,
  BusPartMaritalStatus,
  BusPartNationality
}

//entidad secundaria en la que guardo 5 campos de Suppliers y le agrego 2 más
entity Extras {
  key BusinessPartnerUUID     : UUID;
      FirstName               : String;
      CreationDate            : String;
      BusinessPartnerFullName : String;
      BusinessPartnerName     : String;
      ZcatMonotributo         : String(1) enum {A;B;C;D}; //sólo permitirá estos datos
      ZCUIT                   : Double;
}
