import React, { Component } from 'react';
import './App.css';
import UserService from './services/UserService';
class App extends Component {
  constructor(props) {
    super(props);
    this.UserService =  new UserService;
    this.state = {
    }
  }

  componentDidMount() {
    console.log('comp mounted');
    this.getUsers();
  }

  render () {
    const users =  this.state.users || [];
    const usersList = users.map((user) =>
      <li key={user.id} onClick={() => this.onSelect(user.link)}>
        <span className="User info ">
          Display Name: {user.displayname } - First Name: {user.firstName} - Last Name: {user.lastName} - Email: {user.email}
         </span>
      </li>
    );
    console.log('listed users', usersList);

    return (
      <div className="App">
        hello world
        <ul className="Users">
          {usersList}
        </ul>
      </div>
    );
  }

  getUsers() {
    console.log('in get users');
    this.UserService.listUsers().then(Users => {
        console.log('users in getUsers return ', Users);
        this.setState({users: Users});
      }
    );
  }
}
export default App;