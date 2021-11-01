import cron from 'node-cron';

import auctionService from '#services/auction/auction.service';
import userRatingService from '#services/cron/cron.service';

const cronRun = () => {
    cron.schedule('* * * * * *', () => auctionService.stopAuction());
    cron.schedule('10 * * * *', () => userRatingService.updateUserRating());
};

export default cronRun;
