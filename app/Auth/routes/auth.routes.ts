import Route from "@ioc:Adonis/Core/Route";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { UsersService } from "App/Users/services/user.service";


const controller = new AuthController(
    new AuthService(
        new UsersService()
    )
)

const AuthRoutes = async () => {
    Route.post('/login', (ctx) => controller.login(ctx)).middleware('login');
};

export default AuthRoutes;