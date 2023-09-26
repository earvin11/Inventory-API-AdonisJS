import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { verifyToken } from '../utils-token';
import { usersService } from '../../Users/dependencies';

export default class CheckToken {
  public handle = async (ctx: HttpContextContract, next: () => Promise<void>) => {
    const token = ctx.request.header('x-token');
    if(!token) return ctx.response.unauthorized({ message: 'Token is required' })
    
    try {
      const verify: any = verifyToken(token);
      if(!verify) return ctx.response.unauthorized({ message: 'Token invalid' });

      const user = await usersService.findOne(verify.uuid);
      if(!user) return ctx.response.unauthorized({ message: 'User not found' });

      ctx.user = user;     
      await next();
    } catch (error) {
      ctx.response.badRequest(error.messages);
    }
  }
}