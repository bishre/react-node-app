import React, { Component } from 'react';
import ParticipantItem from './ParticipantItem.js';
import './Participants.css';
import * as type from 'prop-types';

const headStyle = {
  verticalAlign: 'middle',
  paddingLeft: '24px'
}

class Participants extends Component {
  //calling delete method in the api
  deleteParticipant(id) {
    fetch('/persons', {
      method: 'DELETE',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({id: id})
    })
    this.props.onDelete(id);
  }
  editParticipant(index, valueList) {
    this.props.onEdit(index, valueList);
  }
  handleChange(project) {
    this.props.changeInput(project);
  }
  render() {
    let participantItems =
      this.props.participants.map((project,index)=>(
        <ParticipantItem
          key={project.id}
          index={index}
          {...project}
          handleClick={this.editParticipant.bind(this)}
          handleDelete={this.deleteParticipant.bind(this, project.id)}
          changeValue={this.handleChange.bind(this)}
        />
      ));
    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th style={headStyle} className="th-sm col-md-3">Name
                <i className="fas fa-arrow-down float-right" aria-hidden="true" onClick={()=>this.props.sortBy('name')}></i>
              </th>
              <th style={headStyle} className="th-sm col-md-4">Email address
                <i className="fas fa-arrow-down float-right" aria-hidden="true" onClick={()=>this.props.sortBy('email')}></i>
              </th>
              <th style={headStyle} className="th-sm col-md-3">Phone number
                <i className="fas fa-arrow-down float-right" aria-hidden="true" onClick={()=>this.props.sortBy('phone')}></i>
              </th>
            </tr>
          </thead>
            {participantItems}
        </table>
      </div>
    );
  }
}

Participants.propTypes = {
  onDelete: type.PropTypes.func,
  onEdit: type.PropTypes.func,
  sortBy: type.PropTypes.func,
  changeInput: type.PropTypes.func
}

export default Participants;
