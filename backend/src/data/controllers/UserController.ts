import { Request, Response } from 'express';
import { encriptPass } from '../../core/utils/CryptoUtils';
import { verifyMandatoryFields } from '../../core/utils/FieldsUtils';
import { getUIDByToken } from '../../core/utils/RequestUtils';
import connection from './../connection';

const mandatoryFields: string[] = [
  'first_name', 'last_name', 'email', 'password'
]

export default {
  async show(request: Request, response: Response) {
    let user_id;

    if(request.headers['authorization'])
      user_id = getUIDByToken(
        request.headers['authorization'].replace('Token ', '')
      );

    if(!user_id) {
      return response.status(400).json({
        message: 'need user_id'
      });
    }

    try {
      const result = await connection('users')
        .select('*')
        .where('id', '=', user_id)
        .first();
      
      if(!result['first_name'].length) {
        return response.status(404).send();
      }

      return response.status(200).json(result);
    }
    catch(err) {
      return response.status(500).send(err);
    }
  },
  async add(request: Request, response: Response) {
    const emptyFields: string[] = verifyMandatoryFields(request.body, mandatoryFields);

    if(emptyFields.length) {
      return response.status(400).json({
        message: `${emptyFields.join(', ')} fields are required`
      });
    }

    const password = encriptPass(request.body['password']);

    request.body['password'] = password;

    try {
      await connection('users').insert(
        request.body
      );

      return response.status(201).send();
    }
    catch (error) {
      return response.status(500).json({error});
    }
  }
}