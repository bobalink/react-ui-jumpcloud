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

  async getUser(UserId) {
    try{
      console.log('UserService.getUser():', UserId);
      // const url = new URL('http://localhost:8005/api/systemusers');
      const res = await fetch('http://localhost:8005/api/systemusers/'+ UserId);
      const json = await res.json();
      console.log('got the json', json);
      console.log('got the json', typeof json);
      return json;
    }
    catch (e) {
      console.log('hit error', e);
    }
  }

  async createUser(user) {
    console.log('UserService.createUser():', user);
    try{
      const res = await fetch('http://localhost:8005/api/systemusers', {
        method: 'post',
        body:    JSON.stringify(user),
        headers: { 'Content-Type': 'application/json', 'Accept' : 'application/json'}
      });
      if(res.ok) {
        console.log('created user', user);
        return user;
      }
      else {
        throw new Error('failed to create user');
      }
    }
    catch(e) {
      console.log("wahhh", e);
      throw new Error('failed to create user')
    }
  }

  async deleteUser(user) {
    console.log('UserService.deleteUser():', user);
    try{
      const res = await fetch('http://localhost:8005/api/systemusers/'+ user.id, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json', 'Accept' : 'application/json'}
      });
      if(res.ok) {
        console.log('deleted user', user);
        return user;
      }
      else {
        throw new Error('failed to delete user');
      }
    }
    catch(e) {
      console.log("wahhh", e);
      throw new Error('failed to delete user')
    }
  }
  async updateUser(user) {
    console.log('UserService.updateUser():', user);
    try{
      const res = await fetch('http://localhost:8005/api/systemusers/'+ user.id, {
        method: 'put',
        body:    JSON.stringify(user),
        headers: { 'Content-Type': 'application/json', 'Accept' : 'application/json'}
      });
      if(res.ok) {
        console.log('updated user', user);
        return user;
      }
      else {
        throw new Error('failed to update user');
      }
    }
    catch(e) {
      console.log("wahhh", e);
      throw new Error('failed to update user')
    }
  }
}
export default UserService;