import { bookshelfConf } from './bookshelf';

import { CRON_TASK } from '#constants/database.enum';
import { User } from './User';

export const CronTask = bookshelfConf.Model.extend({
    tableName: CRON_TASK,
    user_id: function() {
        return this.hasMany(User);
    }
});
