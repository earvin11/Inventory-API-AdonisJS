import { Role } from '../../Roles/interfaces';

export interface User {
    uuid?: string;
    email: string;
    password: string;
    role: Role
}