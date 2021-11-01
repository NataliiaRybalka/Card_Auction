import { bookshelfConf } from './bookshelf';

import { USER_CARD } from '#constants/database.enum';
import { User } from './User';
import { Card } from './Card';

export const UserCard = bookshelfConf.Model.extend({
    tableName: USER_CARD,
    user_id: function() {
        return this.hasMany(User);
    },
    card_id: function() {
        return this.hasMany(Card);
    }
});
