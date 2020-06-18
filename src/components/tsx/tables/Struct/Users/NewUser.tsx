export interface NewUser {
    id: string | undefined;
    username: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    roles: Array<string> | undefined;
    password: string | undefined;
}