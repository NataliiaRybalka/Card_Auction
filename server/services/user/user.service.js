import { ADMIN, USER } from "#constants/project.constants";
import registrRepository from "#repositories/auth/registr.repository";
import userRepository from '#repositories/user/user.repository';
import tokenRepository from "#repositories/auth/token.repository";

class UserService {
    async getAllUsers(id) {
        try {
            let users = await userRepository.getUsers();
            users = users.toJSON();

            let roleId;
            users.find(user => {
                if (user.id === id) roleId = user.role_id;
            });
            let role = await registrRepository.getRoleById(roleId);
            role = role.toJSON();
            if (role.title === USER) {
                users = users.filter(user => user.role_id === role.id);
            }

            return users;
        } catch (e) {
            console.log(e);
        }
    };

    async getOneUser(id) {
        try {
            let user = await userRepository.getUserById(id);
            if (!user) {
                throw new Error('This user is not registered');
            }
            user = user.toJSON();

            let roleId = user.role_id;
            let role = await registrRepository.getRoleById(roleId);
            role = role.toJSON();
            if (role.title === ADMIN) {
                throw  new Error('Your are not admin');
            }

            return user;
        } catch (e) {
            console.log(e);
        }
    };

    async updateUserData(id, userData, idFromTokens) {
        const { login, email, password } = userData;

        if (Number(id)  !== idFromTokens) {
            throw new Error('You can not update this user');
        }
        await userRepository.updateUserData(id, login, email, password);
        return await userRepository.getUserById(id);
    };

    async deleteUser(id, idFromTokens) {
        try {
            if (Number(id) !== idFromTokens) {
                throw new Error('You can not delete this user');
            }

            await tokenRepository.deleteTokens(id);
            return await userRepository.deleteUser(id);
        } catch (e) {
            console.log(e);
        }
    };
}

export default new UserService();
