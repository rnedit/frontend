export interface NewProfile {
   
    name: string | undefined;
    parentId: string | undefined;
    userId: string | undefined;
    oldUserId: string|undefined;
    access: Array<string> | undefined;
}