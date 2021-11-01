import { Role } from '#models/Role';
import { User } from '#models/User';

class RegistrRepository {
    async getRoles() {
        try {
            return await Role.fetchAll();
        } catch (e) {
            console.log(e);
        }
    };

    async getRoleById(id) {
        try {
            return await Role.where({ id }).fetch();
        } catch (e) {
            console.log(e);
        }
    };

    async createUser(login, email, password, role_id) {
        try {
            return await User.forge({ login, email, password, role_id }).save();
        } catch (e) {
            console.log(e);
        }
    }
}

export default new RegistrRepository();
