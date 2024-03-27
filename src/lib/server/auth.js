import knex from "$lib/server/knex";
import bcrypt from 'bcrypt';

const ERROR_INVALID_CREDENTIALS = 'Seu usuário ou senha estão incorretos, por favor verifique os dados e tente novamente.';

async function validateCredentials(credentials) {
  const { username, password } = credentials;

  const user = await knex('users')
  .select()
  .where('username', username)
  .first();

  if (!user) {
    return {
      error: ERROR_INVALID_CREDENTIALS
    };
  }

  const isValidPass = await bcrypt.compare(password, user['password']);

  if (!isValidPass) {
    return {
      error: ERROR_INVALID_CREDENTIALS
    };
  }

  return { 
    id: user.id, 
    name: user.name, 
    username: user.username 
  };
}

export {
  validateCredentials
};