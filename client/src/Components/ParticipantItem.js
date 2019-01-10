import React, { Component } from 'react';
import * as type from 'prop-types';

const cellStyle = {
  verticalAlign: 'middle',
  color: '#505050',
  lineHeight: '24px',
  fontWeight: '400',
  fontSize: '16px',
  paddingLeft: '24px'
}

const formStyle = {
  verticalAlign: 'middle'
}

const editStyle = {
  verticalAlign: 'middle',
  fill: '#909090',
  lineHeight: '24px',
  fontWeight: '400'
}

const cancelStyle = {
  verticalAlign: 'middle',
  height: '40px',
  width: '10px',
  margin: '0',
  padding: '0'
}

const saveStyle = {
  verticalAlign: 'middle',
  color: '#ffffff',
  fontWeight: '500',
  margin: '0',
  padding: '0'
}

class ParticipantItem extends Component {
  constructor() {
    super();
    this.state = {
      editing: false
    }
  }
  // handler for the edit button that makes the data editable
  handleClick() {
    const { editing }=this.state;
    this.setState({
      editing: !editing
    })
  };
  // handler for the cancel button to cancel edit
  cancelEdit() {
    this.setState({
      editing: false
    })
  }

//handler function that fetches /persons api and save the edited data
  saveChanges(e) {
    e.preventDefault();
    const valueList={
      id: this.props.id,
      name: this.name.value,
      email: this.email.value,
      phone: this.phone.value
    }
    fetch('/persons', {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(valueList)
    });
    this.props.handleClick(this.props.index, valueList);
    this.handleClick();
  }
  //change handler
  handleChange(e) {
    this.props.changeValue(e.target.value);
  }


  render() {
    let textOrInput;
    if (this.state.editing) {
      textOrInput =
      <tr>
        <td style={formStyle} className="col-md-2"><input className="form-control" type='text' ref={(value)=>{this.name=value}} defaultValue={this.props.name} onChange={this.handleChange.bind(this)}/></td>
        <td style={formStyle} className="col-md-4"><input className="form-control" type='text' ref={(value)=>{this.email=value}} defaultValue={this.props.email} onChange={this.handleChange.bind(this)}/></td>
        <td style={formStyle} className="col-md-2"><input className="form-control" type='text' ref={(value)=>{this.phone=value}} defaultValue={this.props.phone} onChange={this.handleChange.bind(this)}/></td>
        <td style={cancelStyle} className="col-md-2"><input type="submit" className="btn btn-default" onClick={this.cancelEdit.bind(this)} value="Cancel"/></td>
        <td style={saveStyle} className="col-md-2"><input type="submit" className="btn btn-primary" onClick={this.saveChanges.bind(this)} value="Save"/></td>
      </tr>
    } else {
      textOrInput=
      <tr>
        <td style={cellStyle} className="col-md-3">{this.props.name}</td>
        <td style={cellStyle} className="col-md-4">{this.props.email}</td>
        <td style={cellStyle} className="col-md-3">{this.props.phone}</td>
        <td style={editStyle} className="col-md-1"><i className="fas fa-pencil-alt" onClick={this.handleClick.bind(this)}></i></td>
        <td style={editStyle} className="col-md-1"><i className="fas fa-trash" onClick={this.props.handleDelete}></i></td>
      </tr>
    }
    return (
      <tbody>
      {textOrInput}
      </tbody>
    );
  }
}

ParticipantItem.propTypes = {
  index: type.PropTypes.number,
  handleClick: type.PropTypes.func,
  handleDelete: type.PropTypes.func,
  changeValue: type.PropTypes.func
}

export default ParticipantItem;
