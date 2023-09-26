export interface Role {
    uuid?: string;
    name: RolesNames;
};

export enum RolesNames {
    ADMIN = 'ADMIN',
    USER = 'USER'
};