import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class AppItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      //list: [],
      task: ''
      //index: 0
    };
    this.EnterTask = this.EnterTask.bind(this);
    this.AddTask = this.AddTask.bind(this);
    this.DeleteTask = this.DeleteTask.bind(this);
  }

  EnterTask(e){
    this.setState({task: e.target.value});
  }
  
  AddTask(e){
    this.props.AddTask(this.props.index,this.state.task);
    this.state.task = '';
  }

  DeleteTask(i){
    // this.state.lists.splice(i,1);
    // this.setState(this.state.lists);
    this.props.DeleteTask(i,this.props.index);
  }

  render(){
    return(
      <div className="bottom">
        <br/>
        <input type = "text" placeholder = "Add Item" onChange={this.EnterTask} value = {this.state.task}/>
        <button className = "btn btn-success" onClick={this.AddTask}>Add</button>
        <AppItemList lists = {this.props.lists} DeleteTask={this.DeleteTask}/>
      </div>
    );
  }
}

class AppItemList extends Component{
  constructor(props){
  super(props);
  this.state = {
    index: 0,
  };
  }

  render(){
    const listItems = this.props.lists.map((item,i)=>
      <li key={i} onDoubleClick={()=>this.props.DeleteTask(i)}><input type="checkbox"/>{item}</li>
  );
  return(
    <div>
      {listItems}
    </div>
  );
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: [{tasks: [],isHidden: true}]
    }
    this.AddList = this.AddList.bind(this);
    //this.childChange = this.childChange.bind(this);
    this.AddTask = this.AddTask.bind(this);
    this.DeleteTask = this.DeleteTask.bind(this);
   // this.toggleHidden = this.toggleHidden.bind(this);
  }

  AddList(){
    // this.state.list.push({tasks: []});
    // this.setState(this.state.list);
    this.setState((prevState) => {
      return { 
        list: prevState.list.concat({tasks: [],isHidden: true}) 
      };
    });
  }

  DeleteList(i){
    // this.state.list.splice(i,1);
    // this.setState(this.state.list);
    this.setState((prevState) => {
      var newList = prevState.list;
      newList = newList.splice(i,1);
      return { 
        newList
      };
    });
  }
  

  AddTask(index,task){
    this.setState((prevState) => {
    var newList = prevState.list[index];
    newList.tasks.push(task);
    return {
      newList
    };
    });
  }

  DeleteTask(i,index){
    // var a = this.state.list[index];
    // a.tasks.splice(i,1);
    // this.setState({a});
    this.setState((prevState) => {
      var newList = prevState.list[index];
      newList.tasks.splice(i,1);
      return {
        newList
      };
      });
  }

  toggleHidden(i){
    this.setState((prevState) => {
      prevState.list[i].isHidden = !(prevState.list[i].isHidden);
      return prevState.list[i].isHidden;
    });
  }
  
  render() {
  return (
<div className="container">
<button className="btn btn-primary" onClick={this.AddList}>Add</button>
<div className="App">
{
this.state.list.map((item,i)=>
<div className="box" key={i}>
<div className="top">
<input type = "text" class = "title" placeholder = "Add Title"/>
<button className="btn btn-danger float-right" onClick={this.DeleteList.bind(this,i)}>X</button>
<button className="btn btn-primary float-right" onClick={this.toggleHidden.bind(this,i)}>__</button>
</div>
{
(this.state.list[i].isHidden) && <AppItem index={i} AddTask = {this.AddTask} DeleteTask = {this.DeleteTask} lists = {this.state.list[i].tasks}/>
}
</div>
)
}
</div>
</div>
    );
  }
}

export default App;
