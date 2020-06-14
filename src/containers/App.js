import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { searchChange,addRobot,fetchRobots } from "../redux/actions";

const mapStatesToProps = state => {
  return{
    searchfield:state.searchField,
    robots:state.robots,
    isLoading:state.isLoading,
  }
}

const mapDispatchToProps = dispatch => {
  return{
  onSearchChange:(event)=>{dispatch(searchChange(event.target.value))},  
  addRobot:(user)=>{dispatch(addRobot(user))},
  fetchRobots:()=>{dispatch(fetchRobots())},
  }
}
class App extends Component {
  constructor() {
    super()
    this.state = {
      open:false,
      newName:"",
      newEmail: ""
    }
  }6

  componentDidMount() {
    this.props.fetchRobots();
    window.onload = function () {
    if (localStorage.getItem("hasCodeRunBefore") === null) {
        location.reload();
        localStorage.setItem("hasCodeRunBefore", true);
    }
}
  }

  toggleOpen = () => {
      this.setState(
      { open:!this.state.open }
    );
    }
    
    addRobot = () => {
     const {newName:name,newEmail:email} = this.state;
     if(this.state.newName === "" || this.state.newEmail === ""){
       alert("Please enter Name and Email to add your avatar")
      this.toggleOpen();
     }
     else{
        const newUser = {
          id: uuidv4(),
          name: name,
          email: email,
        }
        this.props.addRobot(newUser);
        this.toggleOpen();
        this.setState({
          newName: "",
          newEmail: "",
        });
     }
     
    }
 
  render() {
    const { searchfield,robots } = this.props;
    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
 
    return this.props.isLoading ? (
      <h1 style={{ textAlign: "center" }}>Loading</h1>
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
                  newName: event.target.value
                });
              }}
              value={this.props.newName}
            />
            <input
              type="text"
              name="email"
              placeholder="email"
              onChange={(event) => {
                this.setState({
                  newEmail: event.target.value
                });
              }}
              value={this.props.newEmail}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.addRobot}
            >
              Add
            </Button>
          </form>
        </Modal>
        <h1 className="f1">RoboFriends</h1>
        <div className="tc">
          <SearchBox
            searchfield={this.props.searchfield}
            searchChange={this.props.onSearchChange}
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

export default connect(mapStatesToProps,mapDispatchToProps)(App);
