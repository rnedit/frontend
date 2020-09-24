export default interface InternalInterface {
    subject: string;
    recipient: string; //id
    typeAgreement: number;
    draft:boolean;
    creatorProfileId:string;
    сreatorRolesId:string;
    creatorUserId:string;
    fileName:string;
    file: Object;
  }