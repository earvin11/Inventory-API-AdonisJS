import UserModel from '../models/user.model';
import { User } from '../interfaces/user.interface';
import { encrypt, generateUuid, isUUid } from '../../Shared';

export class UsersService {
    async createUser(data: User) {
        try {
            const uuid = generateUuid();
            const { password, ...dataUser } = data;
            const newUser = new UserModel({
                ...dataUser,
                uuid,
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

    async updateOne(dataToUpdate: Partial<User>) {
        try {
            if(!dataToUpdate.uuid) return null;
            if(dataToUpdate.password) {
                dataToUpdate.password = encrypt(dataToUpdate.password)
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