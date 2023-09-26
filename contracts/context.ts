import { User } from 'App/Users/interfaces/user.interface';

declare module '@ioc:Adonis/Core/HttpContext' {
  
    interface HttpContextContract {
      user: User | null
    }
  }