export interface NewUser {
    id: string | undefined;
    username: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    roles: Array<Object> | undefined;
    password: string | undefined;
}