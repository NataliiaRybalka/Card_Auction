import { bookshelfConf } from './bookshelf';

import { TOTAL_USERS } from '#constants/database.enum';

export const TotalUsers = bookshelfConf.Model.extend({
    tableName: TOTAL_USERS
});
