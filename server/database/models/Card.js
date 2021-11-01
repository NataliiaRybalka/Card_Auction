import { bookshelfConf } from './bookshelf';

import { CARD } from '#constants/database.enum';
import { Location } from './Location';

export const Card = bookshelfConf.Model.extend({
    tableName: CARD,
    location_id: function () {
        return this.hasMany(Location);
    }
});
