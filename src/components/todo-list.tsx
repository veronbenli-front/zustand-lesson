import type { FC } from "react";
import { fetchTodos, useIsLoading, useTodos } from "../store/use-todos-store";
import { completeTodo, deleteTodo } from "../store/use-todos-store";


const TodoList: FC = () => {
  const todos = useTodos();
  const isLoading = useIsLoading();

  return (
    <>
    <button onClick={fetchTodos}>Загрузить Список</button>

      <div className='todos'>
        <h1>Todo List</h1>
        {
          !isLoading ? (
            <ul className="todo-list">
              {todos.map((todo) => (
                <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                  <span
                    className={`todo-text ${todo.completed ? 'completed-text' : ''}`}
                  >{todo.todo}</span>
                  <div className="todo-actions">
                    <button onClick={() => completeTodo(todo.id)}>{todo.completed ? '✅' : '↩'}</button>
                    <button onClick={() => deleteTodo(todo.id)}>❌</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Грузим тудушки аки кирпичи...</p>
          )
        }
      </div>

    </>
  );
};

export default TodoList;