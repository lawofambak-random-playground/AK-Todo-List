import React from "react";
import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Loading data onto local storage
  useEffect(() => {
    const loadedTodos = JSON.parse(localStorage.getItem("todos"));

    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, [])

  // Saving data onto local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  // Function that sets todo state variable to user input
  const inputTodo = (e) => {
    setTodo(e.target.value);
  }

  // Function that sets editingText state variable to user editted input
  const editText = (e) => {
    setEditingText(e.target.value);
  }

  // Function that updates the todo list with new todo when form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();

    // Creating a new todo
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    }

    // Updates the todo list with a new todo
    setTodos([...todos].concat(newTodo));
    // Resets the todo to an empty string
    setTodo("");
  }

  // Function that updates the todo list when user wants to delete a todo
  const deleteTodo = (id) => {
    // Creates an updated todo list that excludes the todo that was deleted by the user
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    // Updates the todo list
    setTodos(updatedTodos);
  }

  // Funciton that updates if a certain todo is completed (checked)
  const toggleCompleted = (id) => {
    // Creates an updated todo list with changes made to if a todo is completed or not
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }

      return todo;
    })
    // Updates the todo list
    setTodos(updatedTodos);
  }

  // Function that updates a certain todo when edits are made
  const editTodo = (id) => {
    // Creates an updated todo list with edits made by the user on a certain todo
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }

      return todo;
    })
    // Updates the todo list and resets the editting state variables
    setTodos(updatedTodos);
    setEditingTodo(null);
    setEditingText("");
  }

  return (
    <div className="App">
      <header className="Title">
        <h1>AK's Todo List</h1>
      </header>
      <form onSubmit={handleSubmit} >
        <input type="text" onChange={inputTodo} value={todo} className="InputBox" />
        <button type="submit" className="AddButton" >Add Task</button>
      </form>
      {todos.map((todo) =>
        <div key={todo.id}>

          {editingTodo === todo.id ?
            (<input type="text" onChange={editText} value={editingText} />)
            : (<div className="TodoText">{todo.text}</div>)}

          <button onClick={() => deleteTodo(todo.id)}>Delete</button>

          {editingTodo === todo.id ?
            (<button onClick={() => editTodo(todo.id)}>Submit Edits</button>)
            : (<button onClick={() => setEditingTodo(todo.id)}>Edit</button>)}

          <input type="checkbox" onChange={() => toggleCompleted(todo.id)} checked={todo.completed} />

        </div>)}
    </div>
  );
}

export default App;
