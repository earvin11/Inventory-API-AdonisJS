import RoleModel from '../models/role.model';
import { generateUuid, isUUid } from '../../Shared';

export class RolesService {
    async create(data: any) {
        try {
            const uuid = generateUuid();
            const newRole =  new RoleModel({
                uuid,
                name: data.name.toUpperCase().trim()
            });
            await newRole.save();
            return newRole;
        } catch (error) {
            
        }
    };

    async findAll() {
        try {
            const roles = await RoleModel.find();
            return roles;
        } catch (error) {
            
        }
    };

    async findOne(term: string) {
        let role: any;

        if(isUUid(term)) {
            role = await RoleModel.findOne({ uuid: term });
        }

        if(!role) {
            role = await RoleModel.findOne({ name: term });
        }

        if(!role) return null;

        return role;
    }
};