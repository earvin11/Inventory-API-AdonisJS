import Env from '@ioc:Adonis/Core/Env';
import jwt from 'jsonwebtoken';

export const generateJWT = (uuid: string) => {

    return new Promise( (resolve, reject) => {

        const payload = { uuid };

        jwt.sign( payload, Env.get('APP_KEY'), {
            expiresIn: '4h'
        }, ( err, token ) => {
            if(err) {
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve( token );
            }
        });
    });
}