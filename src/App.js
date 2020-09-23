import React, { useState } from 'react';
import './App.css';
import { connect } from "react-redux";
import { store } from './index'

function App(props) {
  const [task, updateTask] = useState("")
  const [objvalue, updateObj] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('this is the task' + task)
    props.addTodo(task)
  }

  const handleSubmitObj = (event) => {
    event.preventDefault();
    console.log('this is the obj' + objvalue)
    props.addobj(objvalue)
  }



  const del = (val) => {
    console.log(val)
    props.removeTodo(val)
  }
  const delobj = (val) => {
    console.log(val)
    props.removeobj(val)
  }


  return (
    <div className="App">
      <div className="wordAdder">
        <h1>add duplicate values</h1>
        <form onSubmit={handleSubmit}>
          <input onChange={e => updateTask(e.target.value)} placeholder="add a value"></input>

        </form>
        {props.todoReducer.taskArray.map((value, index) => {
          const temp =
            <div key={value+index}>
              <div > {value} </div>
              <button onClick={e => del(value)}>delete</button>
            </div>
          return temp;
        })}
      </div>
      <div className="numberChanger">
        <button onClick={e => props.addnum()} >+</button>
        <button onClick={e => props.removenum()}>-</button>
        {props.numReducer.num}
      </div>
      <div className="objChanger">
        <h1>Cannot add duplicate values</h1>
        <form onSubmit={handleSubmitObj}>
          <input onChange={e => updateObj(e.target.value)} placeholder="add a value"></input>
        </form>

        {Object.keys(props.objReducer.obj).map((value, index) => {
          const temp =
            <div key={value+index}>
              <div > {value} </div>
              <button onClick={e => delobj(value)}>delete</button>
            </div>
          return temp;
        })}
      </div>
    </div>
  );
}


const mapStateToProps = state => {
  return store.getState();
};

export const addTodo = content => ({
  type: "add",
  payload: content
});

export const removeTodo = content => ({
  type: "remove",
  payload: content
});

export const addnum = () => ({
  type: "addnum",
});

export const removenum = () => ({
  type: "removenum",
});

export const addobj = content => ({
  type: "addobj",
  payload: content
});

export const removeobj = content => ({
  type: "removeobj",
  payload: content
});


export default connect(
  mapStateToProps,
  { addTodo, removeTodo, addnum, removenum, addobj, removeobj }
)(App);
