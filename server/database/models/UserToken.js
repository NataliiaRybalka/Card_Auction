import { bookshelfConf } from './bookshelf';

import { USER_TOKEN } from '#constants/database.enum';
import { User } from './User';

export const UserToken = bookshelfConf.Model.extend({
    tableName: USER_TOKEN,
    user_id: function() {
        return this.hasMany(User);
    }
});
