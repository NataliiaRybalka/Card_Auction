import cron from 'node-cron';

import auctionService from '#services/auction/auction.service';
import cronService from '#services/cron/cron.service';

const cronRun = () => {
    cron.schedule('* * * * * *', () => auctionService.stopAuction());
    // cron.schedule('10 * * * *', () => cronService.updateUserRating());
    // cron.schedule('* * * * * *', () => cronService.updateUserRating());
    cron.schedule('0 0 * * *', () => cronService.countTotal());
    cron.schedule('0 0 * * *', () => cronService.deleteTokens());
};

export default cronRun;
