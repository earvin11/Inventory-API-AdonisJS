import { compareEncrypt, generateJWT } from 'App/Shared';
import { UsersService } from '../../Users/services/user.service';

export class AuthService {
    constructor(private usersService: UsersService) {}

    async login(email: string, password: string) {
        try {
            const user = await this.usersService.findOne(email);
            if( user && compareEncrypt({ value: password, valueEncrypt: user.password }) ) {
                const token = await generateJWT( user.uuid );
                return {
                    token,
                    user
                };
            };

            return null;
        } catch (error) {
            this.handleError(error);       
        }
    }

    private handleError(error: any) {
        console.log(error);
        throw error;
    }
};