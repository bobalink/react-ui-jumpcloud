import React, { Component } from 'react';
import './App.css';
import UserService from './services/UserService';
import User from './Component/User';
import UserList from './Component/UserList';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import theme from './theme';
import { palette, spacing, typography } from '@material-ui/system';
import styled, { ThemeProvider } from 'styled-components';

const Box = styled.div`${palette}${spacing}${typography}`;

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
    this.clearState = this.clearState.bind(this);
    this.state = {
      selectedUser: null,
      newUser: null,
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  render () {
    return (
      <ThemeProvider theme={theme}>
        <Container display="flex" className="Container" color="primary.main"
                   bgcolor=""
                   fontFamily="h6.fontFamily" theme={theme}>
          <Box border={4}
            color="primary.main"
               bgcolor="background.paper"
               fontFamily="h6.fontFamily" theme={theme} className="Users Page">
            <UserList users={this.state.users} onSelect={(user) => this.onSelect(user.id)}> </UserList>
            <br/>
            <Button className="new-button" variant="contained" color="primary" onClick={() => this.onNewUser()}>New User</Button>
            <br/>
          </Box>
          <Box className="SpecificUserPage">
            {this.state.newUser && <User onSubmit={this.onCreateUser} onCancel={this.onCancel}/>}
            {this.state.selectedUser && <User user={this.state.selectedUser} onSubmit={this.onUpdateUser} onDelete={this.onDeleteUser} onCancel={this.onCancel}/>}
          </Box>
        </Container>
      </ThemeProvider>
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