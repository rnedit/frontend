export interface Row {
    id: string;
    creationDate: Date;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: [
        {
            id:string,
            name:string,
        }
    ];
}
