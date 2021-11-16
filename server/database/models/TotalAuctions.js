import { bookshelfConf } from './bookshelf';

import { TOTAL_AUCTIONS } from '#constants/database.enum';

export const TotalAuctions = bookshelfConf.Model.extend({
    tableName: TOTAL_AUCTIONS
});
