import setRepository from "#repositories/card/set.repository";

class SetService {
    async createSet(title, bonus) {
      try {
          return await setRepository.createSet(title, bonus);
      }  catch (e) {
          console.log(e);
      }
    };
}

export default new SetService();
