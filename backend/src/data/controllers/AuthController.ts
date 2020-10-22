import { NextFunction, Request, Response } from 'express';
import { encriptPass } from '../../core/utils/CryptoUtils';
import { createToken, verifyToken } from '../../core/utils/JWTUtils';
import connection from '../connection';

const freePaths = ['/login', '/register'];

export default {
  async authenticate(request: Request, response: Response, next: NextFunction) {
    if(freePaths.includes(request.path)) return next();

    const token = request.headers['authorization']?.replace('Token ', '');

    if(token) {
      const result = verifyToken(token);

      if(typeof(result) == 'number') {
        return next();
      }
      else {
        return response.status(400).json({
          message: result
        });
      }
    }

    return response.status(400).json({
      message: 'need auth token'
    });
  },
  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    if(!email.toString().length) {
      return response.status(400).json({
        message: 'email is missing'
      });
    }

    if(!password.toString().length) {
      return response.status(400).json({
        message: 'password is missing'
      });
    }

    try {
      const result = await connection('users')
        .select('id')
        .where('email', '=', email)
        .andWhere('password', '=', encriptPass(password).toString())
        .first();

      if(result) {
        return response.status(200).json({
          token: createToken(result['id'])
        });
      }

      return response.status(404).send();
    }
    catch(error) {
      return response.status(500).json({error});
    }
  }
}