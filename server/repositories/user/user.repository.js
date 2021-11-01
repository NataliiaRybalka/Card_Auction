import { User } from '#models/User';

class UserRepository {
    async getUsers() {
        try {
            return await User.fetchAll();
        } catch (e) {
            console.log(e);
        }
    };

    async getUsersByEmail(email) {
        try {
            return await User.where({ email }).fetchAll();
        } catch (e) {
            console.log(e);
        }
    };

    async getUserByEmail(email) {
        try {
            return await User.where({ email }).fetch();
        } catch (e) {
            console.log(e);
        }
    };

    async getUserById(id) {
        try {
            return await User.where({ id }).fetch();
        } catch (e) {
            console.log(e);
        }
    };

    async updateUserData(id, login, email, password, role) {
      try {
          return await User.forge({ id }).save({ login, email, password, role });
      } catch (e) {
          console.log(e);
      }
    };

    async updateUserRating(id, rating) {
        try {
            return await User.forge({ id }).save({ rating });
        } catch (e) {
            console.log(e);
        }
    };

    async deleteUser(id) {
        try {
           return await User.where({ id }).destroy();
        } catch (e) {
            console.log(e);
        }
    }
}

export default new UserRepository();
