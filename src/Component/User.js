import React, { Component } from 'react';
import '../App.css';
import './Users.css'
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField'

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
    const deleteButton = selectedUser ? <Button onClick={() => this.onDelete()}>Delete</Button> : null;

    const buttonSpan = <ButtonGroup variant="contained" color="primary">
        <Button onClick={() => this.onSubmit()}>{createOrUpdate}</Button>
        {deleteButton}
        <Button onClick={() => this.onCancel()}>Cancel</Button>
    </ButtonGroup>;

    return (
      <Card >
        <Container>
          <Container  >
            <form className='edit-user'>
              <TextField className='field' error={0} name="username" label="User Name" value={this.state.user.username || ""} required onChange={this.handleInputChange}/>
              <TextField className='field' error={0} name="firstname" label="First Name" value={this.state.user.firstname || ""} required onChange={this.handleInputChange}/>
              <TextField className='field' error={0} name="lastname" label="Last Name" value={this.state.user.lastname || ""} required onChange={this.handleInputChange}/>
              <TextField error={0} name="displayname" label="Display Name" value={this.state.user.displayname || ""} required onChange={this.handleInputChange}/>
              <TextField error={0} fullWidth name="email" label="Email" value={this.state.user.email || ""} required onChange={this.handleInputChange}/>
            </form>
            </Container>
        <br/>
        {buttonSpan}
        </Container>
      </Card>
    );
  }
}
export default User;