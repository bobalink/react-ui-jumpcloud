import React, { Component } from 'react';
import '../App.css';
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
    console.log('selected User', selectedUser);
    const createOrUpdate = selectedUser ? 'Update' : 'Create';
    const newOrEdit = selectedUser ? 'New User' : 'Edit User';
    const deleteButton = selectedUser ? <button onClick={() => this.onDelete()}>Delete</button> : null;

    const buttonSpan = <span>
        <button onClick={() => this.onSubmit()}>{createOrUpdate}</button>
        {deleteButton}
        <button onClick={() => this.onCancel()}>Cancel</button>
    </span>;

    return (
      <div className="input-panel">
        <span className="form-caption">{newOrEdit}</span>
        <div>
          <label className="field-name">User Name:<br/>
            <input value={this.state.user.username || ""} name="username" maxLength="40" required onChange={this.handleInputChange} placeholder="User name" />
          </label>
        </div>
        <div>
          <label className="field-name">First Name:<br/>
            <input value={this.state.user.firstname || ""} name="firstname" maxLength="40" required onChange={this.handleInputChange} placeholder="First Name" />
          </label>
        </div>
        <div>
          <label className="field-name">Last Name<br/>
            <input value={this.state.user.lastname || ""} name="lastname" maxLength="40" onChange={this.handleInputChange} placeholder="Last Name" />
          </label>
        </div>
        <div>
          <label className="field-name">Display Name:<br/>
            <input value={this.state.user.displayname || ""} name="displayname" maxLength="" onChange={this.handleInputChange} placeholder="Display Name" />
          </label>
        </div>
        <div>
          <label className="field-name">Email :<br/>
            <textarea value={this.state.user.email || ""} name="email" onChange={this.handleInputChange} placeholder="email" />
          </label>
        </div>
        <br/>
        {buttonSpan}
      </div>
    );
  }
}
export default User;