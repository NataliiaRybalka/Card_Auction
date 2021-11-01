import { bookshelfConf } from './bookshelf';

import { USER_SET } from '#constants/database.enum';
import { User } from './User';
import { Set } from './Set';

export const UserSet = bookshelfConf.Model.extend({
    tableName: USER_SET,
    user_id: function() {
        return this.hasMany(User);
    },
    set_id: function() {
        return this.hasMany(Set);
    }
});
