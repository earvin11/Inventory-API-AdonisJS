import Route from '@ioc:Adonis/Core/Route';
import { usersController } from '../dependencies';


const controller = usersController;

const UserRoutes = async () => {
    Route.post('/', (ctx) => controller.store(ctx)).middleware('createUser');
    Route.get('/', (ctx) => controller.index(ctx));
    Route.get('/:uuid', (ctx) => controller.show(ctx));
    Route.patch('/:uuid', (ctx) => controller.update(ctx));
    Route.delete('/:uuid', (ctx) => controller.destroy(ctx));
};

export default UserRoutes;