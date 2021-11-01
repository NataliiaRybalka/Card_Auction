import { bookshelfConf } from './bookshelf';

import { SET } from '#constants/database.enum';
import { CardSet } from "./CardSet";

export const Set = bookshelfConf.Model.extend({
    tableName: SET,
    card_set: function () {
        return this.hasMany(CardSet);
    }
});
