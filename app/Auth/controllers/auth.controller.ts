import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { AuthService } from '../services/auth.service';

export class AuthController {
    constructor(private authService: AuthService) {}

    async login({ request, response }: HttpContextContract) {
        try {
            const { email, password } = request.body();

            const user = await this.authService.login(email, password);
            if(!user)
                return response.unauthorized({
                    message: 'Not valid credentials'
                });

            response.ok({
                message: 'User logged',
                ...user
            });

        } catch (error) {
          console.log(error);
          response.internalServerError({ message: 'Talk to administrator' });  
        }
    }
}