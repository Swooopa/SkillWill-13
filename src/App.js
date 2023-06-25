import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
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

  const handleToggleCompletion = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const TodoItem = ({ todo }) => {
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
      </li>
    );
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
