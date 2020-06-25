export interface Row {
    id: string;
    name: string;
    type: string;
    parentId: string;
    homeOrgUnit: Boolean;
    user:{
        username:string;
    }
}
