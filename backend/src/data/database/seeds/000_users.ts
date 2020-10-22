import Knex from 'knex';
import User from '../../../core/models/UserInterface';
import { encriptPass } from '../../../core/utils/CryptoUtils';

export async function seed(knex: Knex) {
  const users: User[] = [
    {
      email: 'email@email.com',
      first_name: 'Administrador',
      last_name: '01',
      description: 'The administrator of application',
      password: encriptPass('123456'),
    }
  ];

  return knex('users').insert(users);
}