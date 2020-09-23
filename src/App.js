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

      <p>I wanted to make a React-Redux example that shows common patters, but as simple as humanly possible. I believe the redux docs leave much to be desired in way of easy to follow examples.</p> 
      <p>I have also found very little in the way of easy to follow tutorials on youtube. With the exception of Dev Ed, whose <a href="https://www.youtube.com/watch?v=CVpUuw9XSjY">video</a> I highly recomend you go and watch if you are a complete noob to Redux.</p>
      <p>To understand these examples you will need to look at the code. But I put all the code in just two files so its easier to wrap your mind around the patterns when they are not seperated and abstracted.</p>
      <p>I included examples of how to use arrays, primitives like a number, and objects. these are the main types you will deal with.</p>
      <p>Code here on my github <a href="https://github.com/davidfarley71/React-Redux-asSimpleAsPossible">React-Redux-asSimpleAsPossible</a></p>
      <p>To make sense of this example you will need to understand React, obviously. Also <a href="https://reactjs.org/docs/hooks-intro.html">React hooks</a> (Btw, I do think highly of the react docs. They are excellent.), and the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax">ES6 spread opperator</a>, and  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer">javascript object initializing syntax.</a></p>

      <div className="container">
        <div className="wordAdder">
          <h2>Add duplicate values</h2>
          <p>This reducer uses an array. Use this pattern with arrays. </p>
          <form onSubmit={handleSubmit}>
            <input onChange={e => updateTask(e.target.value)} placeholder="add a value"></input>
          </form>
          {props.todoReducer.taskArray.map((value, index) => {
            const temp =
              <div key={value + index}>
                <div className="displayInlineBlock"> {value} </div>
                <button onClick={e => del(value)}>delete</button>
              </div>
            return temp;
          })}
        </div>
        <div className="numberChanger">
          <p>Use the patter here to update any primative values</p>
          <button onClick={e => props.addnum()} >+</button>
          <button onClick={e => props.removenum()}>-</button>
          {props.primitiveReducer.num}
        </div>
        <div className="objChanger">
          <h2>No duplicate values</h2>
          <p>This reducer uses a javascript object, which does allow duplicates. The way I am using it here takes advantage of that fact. Remember the patter is the same for adding and updating values, but i have it removing values also so you can see how to do it.</p>
          <p></p>
          <form onSubmit={handleSubmitObj}>
            <input onChange={e => updateObj(e.target.value)} placeholder="add a value"></input>
          </form>
          {/* NOte using Object.keys here because you can only use map on an array. Object.keys returns the keys of the object, which you can then use to get the values of the object with map. */}
          {Object.keys(props.objReducer.obj).map((key, index) => {
            const temp =
              <div key={key + index}>
                <div className="displayInlineBlock"> {props.objReducer.obj[key]} </div>
                <button onClick={e => delobj(key)}>delete</button>
              </div>
            return temp;
          })}
        </div>
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
