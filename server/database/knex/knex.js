import knex from 'knex';
import { development } from '../../knexfile';

export const knexConf = knex(development);
