import { usersService } from 'App/Users/dependencies';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

export const authService = new AuthService(
    usersService
);

export const authController = new AuthController(
    authService
);