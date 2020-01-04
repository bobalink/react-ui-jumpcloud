fetch = require('node-fetch');

class UserService {
  constructor() {

  }

  async listUsers() {
    try{
      console.log('UserService.createUser():');
      // const url = new URL('http://localhost:8005/api/systemusers');
      const res = await fetch('http://localhost:8005/api/systemusers');
      const json = await res.json();
      console.log('got the json', json.results);
      console.log('got the json', typeof json.results);
      return json.results;
    }
    catch (e) {
      console.log('hit error', e);
    }
  }

  async getUser(UserLink) {
    for(var i = 0; i < this.users.length; i++) {
      if ( this.users[i].link === UserLink) {
        return Promise.resolve(this.users[i]);
      }
    }
    return null;
  }
  async createUser(User) {
    console.log('UserService.createUser():');
    console.log(User);
    return Promise.resolve(User);
  }
  async deleteUser(UserId) {
    console.log('UserService.deleteUser():');
    console.log('User ID:' + UserId);
  }
  async updateUser(User) {
    console.log('UserService.updateUser():');
    console.log(User);
  }
}
export default UserService;