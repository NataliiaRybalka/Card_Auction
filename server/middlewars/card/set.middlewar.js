import { BadRequest } from '#constants/responseCodes.enum';
import setVlidator from '#validators/setData.validator';

class SetMiddlewar {
    async checkSetDataValidity(req, res, next) {
        try {
            const { error } = await setVlidator.createSetData.validate(req.body);

            if (error) {
                throw new Error(error);
            }

            next();
        } catch (e) {
            console.log(e);
            next(res.sendStatus(BadRequest));
        }
    };
}

export default new SetMiddlewar();
