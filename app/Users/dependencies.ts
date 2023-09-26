import { rolesService } from '../Roles/dependencies';
import { UsersController } from './controllers/user.controller';
import { UsersService } from './services/user.service';

export const usersService = new UsersService( rolesService );
export const usersController = new UsersController(
    usersService,  
);