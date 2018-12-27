import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';
import Participants from './Components/Participants.js';
import AddParticipant from './Components/AddParticipant.js';
// import dataSet from './dataSet.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      participant: {},
      participants:[]
    }
  }

  componentWillMount() {
    fetch('/persons')
      .then(res => res.json())
      .then(participants => this.setState({participants}));
  }

// button submit event handler function
  handleAddParticipants(value){
    let participants=this.state.participants;
    participants.push(value);
    this.setState({
      participant: {},
      participants
    });
  }
// button delete event handler function
  handleDeleteParticipant(id) {
    let participants=this.state.participants;
    let index=participants.findIndex(x=>x.id === id);
    participants.splice(index, 1);
    this.setState({participants:participants})
  }

// edit input field event handler
  handleChange(user) {
    this.setState({
      participant: user
    })
  }

// save edit event handler
  handleParticipantUpdate(index, valueList) {
    let participants=this.state.participants;
    // participants.map(obj => obj.id===id ? valueList : obj);
    participants[index]=valueList;
    this.setState({participants:participants});
  }

// sort function
  sortBy(key) {
    let programs=this.state.participants;
    this.setState({
      participants: programs.sort(function(a,b){
        if(a[key].toLowerCase()<b[key].toLowerCase()) {return -1}
        if(a[key].toLowerCase()>b[key].toLowerCase()) {return 1}
        return 0;
    })
  })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="logo" alt="logo"/>
          <h3>Nord Software</h3>
        </div>
        <div className="app-body">
          <div className="list-title">
            <h2>List of Participants</h2>
          </div>
          <div className="addParticipant">
            <AddParticipant
              addParticipant={this.handleAddParticipants.bind(this)}
            />
          </div>
            <Participants
              {...this.state}
              onDelete={this.handleDeleteParticipant.bind(this)}
              onEdit={this.handleParticipantUpdate.bind(this)}
              sortBy={this.sortBy.bind(this)}
              changeInput={this.handleChange.bind(this)}
            />
        </div>
      </div>
    );
  }
}

export default App;
