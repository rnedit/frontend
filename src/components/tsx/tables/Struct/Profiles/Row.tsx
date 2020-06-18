export interface Row {
    id: string;
    name: string;
    creationDate: string;
    parentId: string;
    userId: string;
    access: [
        {
            id:string,
            name:string,
        }
    ];
}
