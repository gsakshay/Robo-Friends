import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import { v4 as uuidv4 } from "uuid";

class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: [],
      searchfield: '',
      open:false,
      newName:"",
      newEmail:"",
      id:10
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response=> response.json())
      .then(users => {this.setState({ robots: users})});
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  toggleOpen = () => {
      console.log("workingg")
      this.setState(
      { open:!this.state.open }
    );
    }
    
    addRobot = () => {
     const {newName:name,newEmail:email} = this.state;
     console.log(this.state.robots)
     const newUser = {
       id: uuidv4(),
       name: name,
       email: email,
     };
     this.setState({
      robots:[...this.state.robots,newUser]
     })
     this.toggleOpen()
     this.setState({
       newName: "",
       newEmail: ""
     });
    }
 
  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
 
    return !robots.length ? (
      <h1>Loading</h1>
    ) : (
      <div className="tc">
        <Modal open={this.state.open} onClose={this.toggleOpen}>
          <form className="tc">
            <input
              type="text"
              name="name"
              placeholder="name"
              onChange={(event) => {
                this.setState({
                  newName: event.target.value,
                });
              }}
              value={this.state.newName}
            />
            <input
              type="text"
              name="email"
              placeholder="email"
              onChange={(event) => {
                this.setState({
                  newEmail: event.target.value,
                });
              }}
              value={this.state.newEmail}
            />
            <Button variant="contained" color="primary" onClick={this.addRobot}>
              Add
            </Button>
          </form>
        </Modal>
        <h1 className="f1">RoboFriends</h1>
        <div className="tc">
          <SearchBox
            searchfield={this.state.searchfield}
            searchChange={this.onSearchChange}
          />
          <Button
            style={{
              fontFamily: "SEGA LOGO FONT",
              color: "#0ccac4",
            }}
            variant="outlined"
            color="inherit"
            onClick={this.toggleOpen}
          >
            ADD ROBOT
          </Button>
        </div>
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );
  }
}

export default App;