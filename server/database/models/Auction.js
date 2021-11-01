import { bookshelfConf } from './bookshelf';

import { AUCTION } from '#constants/database.enum';
import { User } from './User';

export const Auction = bookshelfConf.Model.extend({
    tableName: AUCTION,
    customer_id: function() {
        return this.hasMany(User);
    }
});
