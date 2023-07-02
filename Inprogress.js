import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inProgressTodos, setInProgressTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleMoveToInProgress = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setInProgressTodos((prevTodos) => [...prevTodos, todo]);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }
  };

  const handleToggleCompletion = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const TodoItem = ({ todo, onMoveToInProgress }) => {
    return (
      <li>
        <span
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
          }}
        >
          {todo.text}
        </span>
        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
        <button onClick={() => handleToggleCompletion(todo.id)}>
          {todo.completed ? 'Undo' : 'Complete'}
        </button>
        <button onClick={() => onMoveToInProgress(todo.id)}>
          Move to In Progress
        </button>
      </li>
    );
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
      <h3>Todo</h3>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onMoveToInProgress={handleMoveToInProgress} />
        ))}
      </ul>
      <h3>In Progress</h3>
      <ul>
        {inProgressTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onMoveToInProgress={() => {}} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
