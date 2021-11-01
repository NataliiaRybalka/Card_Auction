import { USER } from "#constants/database.enum";
import { Forbidden } from '#constants/responseCodes.enum';
import userCardRepository from '#repositories/user/userCard.repository';

class UserCardMiddlewar {
    async checkIsUserCardNotSold(req, res, next) {
        try {
            const {
                body: { lotId },
                role
            }= req;

            if (role === USER) {
                let userCard = await userCardRepository.getOneUserCardById(lotId);
                userCard = userCard.toJSON();

                if (userCard.sold_at) {
                    throw new Error('You can not sell this card');
                }
            }

            next();
        } catch (e) {
            console.log(e);
            next(res.sendStatus(Forbidden));
        }
    };
}

export default new UserCardMiddlewar();
