import { bookshelfConf } from './bookshelf';

import { LOCATION } from '#constants/database.enum';
export const Location = bookshelfConf.Model.extend({
    tableName: LOCATION
});
