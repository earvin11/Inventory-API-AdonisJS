import { UsersController } from './controllers/user.controller';
import { UsersService } from './services/user.service';

export const usersService = new UsersService()
export const usersController = new UsersController(
    usersService
);