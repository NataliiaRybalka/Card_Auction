import { bookshelfConf } from './bookshelf';

import { ROLE } from '#constants/database.enum';

export const Role = bookshelfConf.Model.extend({
    tableName: ROLE
});
