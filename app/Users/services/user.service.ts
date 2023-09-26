import UserModel from '../models/user.model';
import { encrypt, generateUuid, isUUid } from '../../Shared';
import { RolesService } from '../../Roles/services/roles.service';
import { CreateUserDto } from '../interfaces/create-user.interface';

export class UsersService {
    constructor(private rolesService: RolesService) {}
    
    async createUser(data: CreateUserDto) {
        try {
            const uuid = generateUuid();
            const { password, roleUuid, ...dataUser } = data;
            const role = await this.rolesService.findOne(roleUuid);

            const newUser = new UserModel({
                ...dataUser,
                uuid,
                role,
                password: encrypt(password)
            });
            await newUser.save();
            return newUser;
        } catch (error) {
            this.handleError(error);
        }
    }

    async allUsers() {
        try {
            const users = await UserModel.find();
            return users;
        } catch (error) {
            this.handleError(error);
        }
    }

    async findOne(term: string) {
        try {
            let user: any;

            if( isUUid( term ) ){
                user = UserModel.findOne({ uuid: term });
            }
            if(!user ) {
                user = UserModel.findOne({ email: term });
            }
            if(!user) return null;
            return user;
        } catch (error) {
            this.handleError(error);
        }
    }

    async updateOne(dataToUpdate: Partial<CreateUserDto>) {
        try {
            if(!dataToUpdate.uuid) return null;
            if(dataToUpdate.password) {
                dataToUpdate.password = encrypt(dataToUpdate.password)
            }

            if(dataToUpdate.roleUuid) {
                dataToUpdate['role'] = await this.rolesService.findOne(dataToUpdate.roleUuid);
                delete dataToUpdate.roleUuid;
            }

            const user = await UserModel.findOneAndUpdate(
                { uuid: dataToUpdate.uuid }, 
                dataToUpdate, 
                { new: true }
            );
            if(!user) return null;

            return user;
        } catch (error) {
            this.handleError(error);
        }
    }

    async deleteUser(uuid: string) {
        try {
            await UserModel.findOneAndDelete({ uuid });
            return;
        } catch (error) {
            this.handleError(error);
        }
    }

    private handleError(error: any) {
        console.log(error);
        throw error;
    }
};