import { bookshelfConf } from './bookshelf';

import { TRANSACTION_VIEW } from '#constants/database.enum';
import { User } from './User';
import { Transaction } from './Transaction';

export const TransactionView = bookshelfConf.Model.extend({
    tableName: TRANSACTION_VIEW,
    user_id: function() {
        return this.hasMany(User);
    },
    amount: function () {
        return this.hasMany(Transaction);
    }
});
