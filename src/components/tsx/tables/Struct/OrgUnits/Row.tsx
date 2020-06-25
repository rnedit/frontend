export interface Row {
    id: string;
    creationDate: string;
    name: string;
    parentName: string;
    homeOrgUnit: boolean;
    profiles: [
        {
            id:string;
            name:string;
        }
    ];
}
