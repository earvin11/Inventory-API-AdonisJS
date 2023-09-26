import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { RolesNames } from 'App/Roles/interfaces';

export default class OnlyAdmin {
  public handle = async ({ response, user }: HttpContextContract, next: () => Promise<void>) => {
    if(!user) return response.unauthorized({ msg: 'User not found' });
    if(user.role.name !== RolesNames.ADMIN) return response.unauthorized({ msg: `User is not ${ RolesNames.ADMIN }` });

    await next();
  }
}