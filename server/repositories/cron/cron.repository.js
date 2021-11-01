import { ACTIVE } from "#constants/project.constants";
import { CronTask } from "#models/CronTask";

class CronRepository {
  async createTask(user_id) {
    try {
      return await CronTask.forge({
        user_id,
        created_at: new Date(),
        status: ACTIVE
      }).save();
    } catch (e) {
      console.log(e);
    }
  };

  async getAllTasks() {
    try {
      return await CronTask.fetchAll();
    } catch (e) {
      console.log(e);
    }
  };

  async deleteTasks(id) {
    try {
      return await CronTask.where({ id }).destroy();
    } catch (e) {
      console.log(e)
    }
  }
}

export default new CronRepository();
