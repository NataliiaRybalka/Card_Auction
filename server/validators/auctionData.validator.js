import yup from 'yup';

class AuctionDataValidator {
    createAuctionData = yup.object({
        lotId: yup.number().required(),
        initPrice: yup.number().required(),
        maxPrice: yup.number().required(),
        minStep: yup.number().required(),
        maxTime: yup.number().required()
    });
}

export default new AuctionDataValidator();
