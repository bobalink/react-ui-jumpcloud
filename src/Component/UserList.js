import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
class UserList extends Component {
  constructor(props) {
    super(props);
    this.selectedUser = this.selectedUser.bind(this);
  }

  render () {
    const selectedUser = this.props.selectedUser;
    const users =  this.props.users || [];
    const usersList = users.map((user) =>{
        const elevation = selectedUser?  0 : 3; // elevate selected user
        return <Paper elevation={elevation} className="User" onClick={() => this.selectedUser(user)}>
          User Name: {user.username}  -  Display Name: {user.displayname } - First Name: {user.firstname} - Last Name: {user.lastname} - Email: {user.email}
        </Paper>
    }

    );
    return (
      <Container className="Users List">
        {usersList}
      </Container>
    );
  }
  selectedUser(user) {
    this.props.onSelect(user);
  }
}
export default UserList;