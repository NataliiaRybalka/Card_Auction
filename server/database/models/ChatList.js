import { bookshelfConf } from './bookshelf';

import { CHAT_LIST } from '#constants/database.enum';
import { Chat } from './Chat';
import { User } from './User';

export const ChatList = bookshelfConf.Model.extend({
    tableName: CHAT_LIST,
    from: function() {
        return this.hasMany(User);
    },
    to: function() {
        return this.hasMany(User);
    },
    chat_id: function() {
        return this.hasMany(Chat);
    }
});
