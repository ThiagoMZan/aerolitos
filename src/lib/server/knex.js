import knex from 'knex';
import { PG_HOST, PG_USER, PG_PASS, PG_PORT, PG_DATABASE } from "$env/static/private";

export default knex({
  client: 'postgresql',
  connection: {
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USER,
    password: PG_PASS
  }
});