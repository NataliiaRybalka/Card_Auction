import { knexConf } from '../knex/knex';
import bookshelf from 'bookshelf';

export const bookshelfConf = bookshelf(knexConf);