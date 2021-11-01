import { bookshelfConf } from './bookshelf';

import { TRANSACTION } from '#constants/database.enum';
import { User } from './User';

export const Transaction = bookshelfConf.Model.extend({
    tableName: TRANSACTION,
    user_id: function() {
        return this.hasMany(User);
    }
});
