import Route from '@ioc:Adonis/Core/Route';
import { usersController } from '../dependencies';


const controller = usersController;

const UserRoutes = async () => {
    Route.post('/', (ctx) => controller.store(ctx))
        .middleware(['checkToken', 'onlyAdmin','createUser']);
    Route.get('/', (ctx) => controller.index(ctx))
        .middleware(['checkToken']);
    Route.get('/:uuid', (ctx) => controller.show(ctx))
        .middleware(['checkToken']);
    Route.patch('/:uuid', (ctx) => controller.update(ctx))
        .middleware(['checkToken']);
    Route.delete('/:uuid', (ctx) => controller.destroy(ctx))
        .middleware(['checkToken']);
};

export default UserRoutes;