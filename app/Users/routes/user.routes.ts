import Route from "@ioc:Adonis/Core/Route";
import { UsersController } from "../controllers/user.controller";
import { UsersService } from "../services/user.service";


const controller = new UsersController(
    new UsersService()
)

const UserRoutes = async () => {
    Route.post('/', (ctx) => controller.store(ctx)).middleware('createUser');
    Route.get('/', (ctx) => controller.index(ctx));
    Route.get('/:uuid', (ctx) => controller.show(ctx));
    Route.patch('/:uuid', (ctx) => controller.update(ctx));
};

export default UserRoutes;