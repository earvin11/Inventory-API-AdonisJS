import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { UsersService } from '../services/user.service';

export class UsersController {
    constructor(private userService: UsersService) {}

    async store({ request, response }: HttpContextContract) {
        try {
            const newUser = await this.userService.createUser({
                email: request.body().email,
                password: request.body().password
            });
    
            response.created({
                message: 'User created',
                newUser
            });
        } catch (error) {
            console.log(error);
            response.internalServerError({ message: 'Internal server error' });
        }
    }

    async index({ response }: HttpContextContract) {
        try {
            const users = await this.userService.allUsers()
            response.ok({
                message: 'Users list',
                users
            });
        } catch (error) {
            console.log(error);
            response.internalServerError({ message: 'Internal server error' });
        }
    }

    async show({ request, response }: HttpContextContract) {
        try {
            const user = await this.userService.findOne( request.params().uuid );
            response.ok({
                message: 'User found',
                user
            });
        } catch (error) {
            console.log(error);
            response.internalServerError({ message: 'Internal server error' });
        }
    }

    async update({ request, response }: HttpContextContract) {
        try {
            const { email, password } = request.body();
            const { uuid } = request.params();
            const user = await this.userService.updateOne({ uuid, email, password });
            if(!user) return response.notFound({ message: 'User not found' });
    
            response.ok({
                message: 'User updated',
                user
            });
        } catch (error) {
            console.log(error);
            response.internalServerError({ message: 'Internal server error' });
        }
    }

    async destroy({ request, response }: HttpContextContract) {
        try {
            await this.userService.deleteUser(request.params().uuid);
            response.noContent();
        } catch (error) {
            console.log(error);
            response.internalServerError({ message: 'Internal server error' });
        }
    }
}