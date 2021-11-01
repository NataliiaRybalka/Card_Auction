import yup from 'yup';

class UserValidator {
    createUserData = yup.object({
        login: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().min(6).required()
    });

    updateUserData = yup.object({
        login: yup.string(),
        email: yup.string().email(),
        password: yup.string().min(6)
    });
}

export default new UserValidator();