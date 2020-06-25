export interface Row {
    id: string;
    name: string;
    creationDate: string;
    parentName: string;
    userId: string;
    user: any;
    access: [
        {
            id:string,
            name:string,
            info:string,
        }
    ];
}
