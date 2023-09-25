import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class LoginMiddleware {
  public handle = async ({ request, response }: HttpContextContract, next: () => Promise<void>) => {
    const loginSchema = schema.create({
      email: schema.string(),
      password: schema.string(),
    });

    try {
      await request.validate({
        schema: loginSchema,
      });

      await next()
    } catch (error) {
      response.badRequest(error.messages);
    }
  }
}