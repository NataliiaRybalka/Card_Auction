import yup from 'yup';

class SetDataValidator {
    createSetData = yup.object({
        title: yup.string().required(),
        bonus: yup.string().required()
    });
}

export default new SetDataValidator();
