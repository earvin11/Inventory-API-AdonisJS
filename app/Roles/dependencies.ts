import { RolesController } from './controllers/roles.controller';
import { RolesService } from './services/roles.service';

export const rolesService = new RolesService();
export const rolesController = new RolesController(
    rolesService
);