import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { RolesService } from '../services/roles.service';

export class RolesController {
    constructor(private rolesService: RolesService) {}

    async store({ request, response }: HttpContextContract) {
        try {
            const newRole = await this.rolesService.create(request.body());
            response.created({ message: 'Role created', role: newRole });
        } catch (error) {
            console.log(error);
            response.internalServerError({ message: 'Internal server error' });
        }
    }

    async index({ response }: HttpContextContract) {
        try {
            const roles = await this.rolesService.findAll();
            response.ok({ message: 'Roles listed', roles });
        } catch (error) {
            console.log(error);
            response.internalServerError({ message: 'Internal server error' });
        }
    }

    async show({ request, response }: HttpContextContract) {
        try {
            const { uuid } = request.params();
            const role = await this.rolesService.findOne(uuid);
            response.ok({ message: 'Role obtained', role });
        } catch (error) {
            console.log(error);
            response.internalServerError({ message: 'Internal server error' });
        }
    }
};