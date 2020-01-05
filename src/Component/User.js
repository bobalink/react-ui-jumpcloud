import React, { Component } from 'react';
import '../App.css';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Typography from '@material-ui/core/Typography';

class User extends Component {
  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      user: this.props.user || {}
    };
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const user = this.state.user;
    this.state.user[name] = value;
    this.setState(user);
  }
  onCancel() {
    this.props.onCancel();
  }
  onSubmit() {
    this.props.onSubmit(this.state.user);
  }
  onDelete() {
    //todo double check with user
    this.props.onDelete(this.state.user)
  }
  render() {
    const selectedUser = this.props.user;
    const createOrUpdate = selectedUser ? 'Update' : 'Create';
    const newOrEdit = selectedUser ? 'New User' : 'Edit User';
    const deleteButton = selectedUser ? <Button onClick={() => this.onDelete()}>Delete</Button> : null;

    const buttonSpan = <ButtonGroup variant="contained" color="primary">
        <Button onClick={() => this.onSubmit()}>{createOrUpdate}</Button>
        {deleteButton}
        <Button onClick={() => this.onCancel()}>Cancel</Button>
    </ButtonGroup>;

    return (
      <Card className="User-Edit">
        <Container maxWidth="sm">
        <Typography className="Title">{newOrEdit}</Typography>
        <Typography className="field-name">User Name:<br/>
          <Input value={this.state.user.username || ""} name="username" maxLength="40" required onChange={this.handleInputChange} placeholder="User name" />
        </Typography>
        <Typography className="field-name">First Name:<br/>
          <Input value={this.state.user.firstname || ""} name="firstname" maxLength="40" required onChange={this.handleInputChange} placeholder="First Name" />
        </Typography>
        <Typography className="field-name">Last Name<br/>
          <Input value={this.state.user.lastname || ""} name="lastname" maxLength="40" onChange={this.handleInputChange} placeholder="Last Name" />
        </Typography>
        <Typography className="field-name">Display Name:<br/>
          <Input value={this.state.user.displayname || ""} name="displayname" maxLength="" onChange={this.handleInputChange} placeholder="Display Name" />
        </Typography>
        <Typography className="field-name">Email :<br/>
          <Input value={this.state.user.email || ""} name="email" onChange={this.handleInputChange} placeholder="email" />
        </Typography>
        <br/>
        {buttonSpan}
        </Container>
      </Card>
    );
  }
}
export default User;