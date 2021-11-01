import { bookshelfConf } from './bookshelf';

import { EPISODE } from '#constants/database.enum';

export const Episode = bookshelfConf.Model.extend({
    tableName: EPISODE
});
