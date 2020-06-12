export interface Row {
    id: string;
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
