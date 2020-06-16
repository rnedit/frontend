export interface NewUser {
    username: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    roles: Array<string> | undefined;
    password: string | undefined;
}