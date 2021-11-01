import { bookshelfConf } from './bookshelf';

import { CARD_EPISODE } from '#constants/database.enum';
import { Card } from './Card';
import { Episode } from './Episode';

export const CardEpisode = bookshelfConf.Model.extend({
    tableName: CARD_EPISODE,
    card_id: function() {
        return this.hasMany(Card);
    },
    episode_id: function() {
        return this.hasMany(Episode);
    }
});
