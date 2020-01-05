import React, { Component } from 'react';
import './App.css';
import UserService from './services/UserService';
import User from './Component/user';
class App extends Component {
  constructor(props) {
    super(props);
    this.UserService =  new UserService;
    this.onNewUser = this.onNewUser.bind(this);
    this.onCreateUser = this.onCreateUser.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onCreateUser = this.onCreateUser.bind(this);
    this.onUpdateUser = this.onUpdateUser.bind(this);
    this.onDeleteUser = this.onDeleteUser.bind(this);
    this.state = {
      selectedUser: null,
      newUser: null,
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  render () {
    const users =  this.state.users || [];
    const usersList = users.map((user) =>
      <li key={user.id} onClick={() => this.onSelect(user.id)}>
        <span className="User info ">
          User Name: {user.username}  -  Display Name: {user.displayname } - First Name: {user.firstname} - Last Name: {user.lastname} - Email: {user.email}
         </span>
      </li>
    );
    return (
      <div className="App">
        <ul className="Users">
          {usersList}
        </ul>
        <br/>
        <button type="button" name="button" onClick={() => this.onNewUser()}>New User</button>
        <br/>
        {this.state.newUser && <User onSubmit={this.onCreateUser} onCancel={this.onCancel}/>}
        {this.state.selectedUser && <User user={this.state.selectedUser} onSubmit={this.onUpdateUser} onDelete={this.onDeleteUser} onCancel={this.onCancel}/>}
      </div>
    );
  }

  getUsers() {
    this.UserService.listUsers().then(Users => {
        this.setState({users: Users});
      }
    );
  }
  onCancel() {
    this.clearState();
  }
  onNewUser() {
    this.clearState();
    this.setState({
      newUser: true
    });
  }
  onCreateUser(newUser) {
    this.clearState();
    this.UserService.createUser(newUser).then(User => {
        console.log('');
        this.getUsers();
      }
    ).catch((e) =>{
      //TODO: notify user of failure.
      this.getUsers();
    });
  }
  onUpdateUser(User) {
    this.clearState();
    this.UserService.updateUser(User).then(User => {
        this.getUsers();
      }
    );
  }
  onDeleteUser(UserLink) {
    this.clearState();
    this.UserService.deleteUser(UserLink).then(res => {
        this.getUsers();
      }
    );
  }
  onSelect(UserId) {
    this.clearState();
    this.UserService.getUser(UserId).then(User => {
        this.setState({
          selectedUser: User
        });
      }
    );
  }
  clearState() {
    this.setState({
      selectedUser: null,
      newUser: null
    });
  }
}
export default App;