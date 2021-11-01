import { bookshelfConf } from './bookshelf';

import { USER } from '#constants/database.enum';
import { Role } from './Role';

export const User = bookshelfConf.Model.extend({
    tableName: USER,
    role: function() {
        return this.hasMany(Role);
    }
});
