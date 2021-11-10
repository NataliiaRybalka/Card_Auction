import yup from 'yup';

class CardDataValidator {
    createCardData = yup.object({
        name: yup.string().required(),
        isAlive: yup.boolean().required(),
        species: yup.string().required(),
        gender: yup.string().required(),
        locationTitle: yup.string().required(),
        locationType: yup.string().required(),
        episodeTitle: yup.string().required(),
        episodeAirDate: yup.string().required(),
        series: yup.string().required(),
        image: yup.string().required()
    });
}

export default new CardDataValidator();
