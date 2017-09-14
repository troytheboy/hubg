import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
var request = require('request');
var rp = require('request-promise');

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>HUBG</h1>
          <h2>Your HUB for PUBG</h2>
        </div>
        <div className="app-body container-fluid">
          <Body />
        </div>
      </div>
    );
  }
}

class Body extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rendered: false,
      data: [],
      avatar : '',
      solo: [],
      duo: [],
      squad: [],
      search: false,
      first: true,
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderStats(plNum) {
    //console.log(this.state.stats)
    var tables = [];
    for (var i = 0; i  < plNum; i++) {
      if (this.state.stats[i].Region == 'agg') {
        console.log(this.state.stats[i].Region);
        tables.push(<Stats key={i} value={this.state.stats[i]} />)
      }
    }
    return tables;
  }

  handleChange(event) {
    console.log("handleChange");
    this.setState({temp: event.target.value});
  }

  handleSubmit(event) {
    this.setState({submitted: true});
    this.setState({first: false});
    this.setState({username: this.state.temp})
    event.preventDefault();
  }

  changeSubmit() {
    this.setState({submitted: false});
  }

  changeLoading() {
    this.setState({loading: !this.state.loading});
  }

  setPlayerInfo(data) {
    console.log(JSON.parse(data));
    this.setState({ data });
    let avatar = JSON.parse(data).Avatar;
    this.setState({ avatar })
    let username = JSON.parse(data).PlayerName;
    this.setState({ username })
    let stats = JSON.parse(data).Stats;
    this.setState({ stats });
    this.changeLoading();
  }

  render() {
    console.log("Rendering... " + "username: " + this.state.username + " submitted: " + this.state.submitted)
    console.log("loading:" +this.state.loading)
    if(!this.state.first) {
      if(this.state.submitted) {
        var options = {
            url: 'https://pubgtracker.com/api/profile/pc/' + this.state.temp,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'TRN-Api-Key': 'f4afb664-05f8-40ea-b3cd-e9810c2c68e2'
            }
        };
        this.changeLoading();
        rp(options)
          .then(data => {
            this.setPlayerInfo(data);
          }
        );
        this.changeSubmit();
      }

      try {
        if (this.state.loading) {
          return(
            <div className="Body">
              <form className="form-inline" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input type="text" className="form-control" id="usernameInput" value={this.state.temp} onChange={this.handleChange} placeholder="Enter username" />
                  <button className="btn btn-default" type="submit" id="usernameSubmit" value="Search" onClick={this.handleSubmit}>Search</button>
                </div>
              </form>
              <div className="Body-header">
                <h2>Loading <i className="fa fa-circle-o-notch fa-spin"></i></h2>
              </div>
            </div>
          )
        } else {
          return (
            <div className="Body">
              <form className="form-inline" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input type="text" className="form-control" id="usernameInput" value={this.state.temp} onChange={this.handleChange} placeholder="Enter username" />
                  <button className="btn btn-default" type="submit" id="usernameSubmit" value="Search" onClick={this.handleSubmit}>Search</button>
                </div>
              </form>
              <div className="Body-header">
                <h2><img src={this.state.avatar}/> {this.state.username}</h2>
              </div>
              <div className="Stats-tables">
                {this.renderStats(this.state.stats.length)}
              </div>
            </div>
          )
        }
      }
      catch (e) {
        console.log(e);
      }
    }
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" id="usernameInput" value={this.state.temp} onChange={this.handleChange} placeholder="Enter username" />
          <button className="btn btn-default" type="submit" id="usernameSubmit" value="Search" onClick={this.handleSubmit}>Search</button>
        </div>
      </form>
    )
  }
}

function Stats(props) {
  let stats = props.value.Stats;
  try {
    return (
      <div className="Stats-container">
        <p><span className="badge badge-secondary">{props.value.Match}</span> {props.value.Season}</p>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>{stats[0].label}</th>
              <th>{stats[1].label}</th>
              <th>{stats[2].label}</th>
              <th>{stats[3].label}</th>
              <th>{stats[4].label}</th>
              <th>{stats[5].label}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{stats[0].value}</td>
              <td>{stats[1].value}</td>
              <td>{stats[2].value}</td>
              <td>{stats[3].value}</td>
              <td>{stats[4].value}</td>
              <td>{stats[5].value}</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>{stats[6].label}</th>
              <th>{stats[7].label}</th>
              <th>{stats[8].label}</th>
              <th>{stats[9].label}</th>
              <th>{stats[10].label}</th>
              <th>{stats[11].label}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{stats[6].value}</td>
              <td>{stats[7].value}</td>
              <td>{stats[8].value}</td>
              <td>{stats[9].value}</td>
              <td>{stats[10].value}</td>
              <td>{stats[11].value}</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>{stats[12].label}</th>
              <th>{stats[13].label}</th>
              <th>{stats[14].label}</th>
              <th>{stats[15].label}</th>
              <th>{stats[16].label}</th>
              <th>{stats[17].label}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{stats[12].value}</td>
              <td>{stats[13].value}</td>
              <td>{stats[14].value}</td>
              <td>{stats[15].value}</td>
              <td>{stats[16].value}</td>
              <td>{stats[17].value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  catch (e) {
    console.log(e);
  }
  return (
    <div className="Stats-container">
      <h3>Loading...</h3>
    </div>
  )
}

export default App;
