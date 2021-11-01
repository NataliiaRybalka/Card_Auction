import { bookshelfConf } from './bookshelf';

import { CARD_SET } from '#constants/database.enum';
import { Card } from './Card';
import { Set } from './Set';

export const CardSet = bookshelfConf.Model.extend({
    tableName: CARD_SET,
    card_id: function() {
        return this.hasMany(Card);
    },
    set_id: function() {
        return this.hasMany(Set);
    }
});
