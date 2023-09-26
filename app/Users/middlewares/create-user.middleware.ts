import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class CreateUserMiddleware {
  public handle = async ({ request, response }: HttpContextContract, next: () => Promise<void>) => {
    const createUserSchema = schema.create({
      email: schema.string(),
      password: schema.string(),
      roleUuid: schema.string(),
    });

    try {
      await request.validate({
        schema: createUserSchema,
      });

      await next()
    } catch (error) {
      response.badRequest(error.messages);
    }
  }
}