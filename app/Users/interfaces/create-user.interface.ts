export interface CreateUserDto {
    uuid?: string;
    email: string;
    password: string;
    roleUuid: string;
};