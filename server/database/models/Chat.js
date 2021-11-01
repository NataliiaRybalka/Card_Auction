import { bookshelfConf } from './bookshelf';

import { CHAT } from '#constants/database.enum';
import { User } from './User';

export const Chat = bookshelfConf.Model.extend({
    tableName: CHAT,
    from: function() {
        return this.hasMany(User);
    },
    to: function() {
        return this.hasMany(User);
    }
});
