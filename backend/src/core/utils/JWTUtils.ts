import jwt from 'jsonwebtoken';
import { decript, encriptId } from './CryptoUtils';

require('dotenv-safe').config();

export function createToken(userId: number) {
  const secret = process.env.TOKEN_SECRET || '';

  const token = jwt.sign({ userId: encriptId(userId) }, secret, {
    expiresIn: 120
  });

  return token;
}

export function verifyToken(token: string) {
  let result: number | string;

  const secret = process.env.TOKEN_SECRET || '';

  try {
    const decoded: string | object = jwt.verify(token, secret);

    if(typeof(decoded) === 'object') {
      // @ts-ignore
      result = decoded.userId;
    }
    else {
      result = JSON.parse(decoded.toString())['userId'];
    }

    result = Number(decript(result.toString()).toString());
  }
  catch(err) {
    if(err.toString().includes('TokenExpiredError')) {
      result = 'token expired';
    }
    else if(err.toString().includes('JsonWebTokenError')) {
      result = 'invalid token'
    }
    else {
      result = err;
    }
  }

  return result;
}

