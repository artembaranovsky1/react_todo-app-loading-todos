/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { addTodo, getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [sotrBy, setSotrBy] = useState('');
  const [hasErrorLoad, setHasErrorLoad] = useState('');

  function filterdTodos(sotrByWord: string): Todo[] {
    if (sotrByWord === 'active') {
      return [...todos].filter((todo: Todo) => !todo.completed === true);
    }

    if (sotrByWord === 'completed') {
      return [...todos].filter((todo: Todo) => todo.completed === true);
    }

    return todos;
  }

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(error => {
        setHasErrorLoad('Unable to load todos');

        throw error;
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form
            onSubmit={event => {
              event.preventDefault();

              if (!query.trim()) {
                return;
              }

              addTodo(query).then(newTodo => {
                setTodos(prev => [...prev, newTodo]);
                setQuery('');
              });
            }}
          >
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={query}
              onChange={e => {
                setQuery(e.target.value);
              }}
            />
            <button
              type="submit"
              onClick={() => {
                addTodo(query);
              }}
            ></button>
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {/* This is a completed todo */}

          {filterdTodos(sotrBy).map((todo: Todo) => (
            <div key={todo.id} data-cy="Todo" className="todo">
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
              </span>
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              <div data-cy="TodoLoader" className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}

          {/* This todo is an active todo */}
          {/*<div data-cy="Todo" className="todo">*/}
          {/*  <label className="todo__status-label">*/}
          {/*    <input*/}
          {/*      data-cy="TodoStatus"*/}
          {/*      type="checkbox"*/}
          {/*      className="todo__status"*/}
          {/*    />*/}
          {/*  </label>*/}

          {/*  <span data-cy="TodoTitle" className="todo__title">*/}
          {/*    Not Completed Todo*/}
          {/*  </span>*/}
          {/*  <button type="button" className="todo__remove" data-cy="TodoDelete">*/}
          {/*    ×*/}
          {/*  </button>*/}

          {/*  <div data-cy="TodoLoader" className="modal overlay">*/}
          {/*    <div className="modal-background has-background-white-ter" />*/}
          {/*    <div className="loader" />*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/* This todo is being edited */}
          {/*<div data-cy="Todo" className="todo">*/}
          {/*  <label className="todo__status-label">*/}
          {/*    <input*/}
          {/*      data-cy="TodoStatus"*/}
          {/*      type="checkbox"*/}
          {/*      className="todo__status"*/}
          {/*    />*/}
          {/*  </label>*/}

          {/*  /!* This form is shown instead of the title and remove button *!/*/}
          {/*  <form>*/}
          {/*    <input*/}
          {/*      data-cy="TodoTitleField"*/}
          {/*      type="text"*/}
          {/*      className="todo__title-field"*/}
          {/*      placeholder="Empty todo will be deleted"*/}
          {/*      value="Todo is being edited now"*/}
          {/*    />*/}
          {/*  </form>*/}

          {/*  <div data-cy="TodoLoader" className="modal overlay">*/}
          {/*    <div className="modal-background has-background-white-ter" />*/}
          {/*    <div className="loader" />*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/* This todo is in loadind state */}
          {/*<div data-cy="Todo" className="todo">*/}
          {/*  <label className="todo__status-label">*/}
          {/*    <input*/}
          {/*      data-cy="TodoStatus"*/}
          {/*      type="checkbox"*/}
          {/*      className="todo__status"*/}
          {/*    />*/}
          {/*  </label>*/}

          {/*  <span data-cy="TodoTitle" className="todo__title">*/}
          {/*    Todo is being saved now*/}
          {/*  </span>*/}

          {/*  <button type="button" className="todo__remove" data-cy="TodoDelete">*/}
          {/*    ×*/}
          {/*  </button>*/}

          {/*  /!* 'is-active' class puts this modal on top of the todo *!/*/}
          {/*  <div data-cy="TodoLoader" className="modal overlay is-active">*/}
          {/*    <div className="modal-background has-background-white-ter" />*/}
          {/*    <div className="loader" />*/}
          {/*  </div>*/}
          {/*</div>*/}
        </section>

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {todos.length} items left
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              // className="filter__link selected"
              className={
                sotrBy === '' ? 'filter__link selected' : 'filter__link'
              }
              data-cy="FilterLinkAll"
              onClick={() => {
                setSotrBy('');
              }}
            >
              All
            </a>

            <a
              href="#/active"
              className={
                sotrBy === 'active' ? 'filter__link selected' : 'filter__link'
              }
              data-cy="FilterLinkActive"
              onClick={() => {
                setSotrBy('active');
              }}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={
                sotrBy === 'completed'
                  ? 'filter__link selected'
                  : 'filter__link'
              }
              data-cy="FilterLinkCompleted"
              onClick={() => {
                setSotrBy('completed');
              }}
            >
              Completed
            </a>
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
          >
            Clear completed
          </button>
        </footer>
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      {hasErrorLoad ? (
        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button data-cy="HideErrorButton" type="button" className="delete" />
          {/* show only one message at a time */}
          {hasErrorLoad}
          {/*Unable to load todos*/}
          {/*<br />*/}
          {/*Title should not be empty*/}
          {/*<br />*/}
          {/*Unable to add a todo*/}
          {/*<br />*/}
          {/*Unable to delete a todo*/}
          {/*<br />*/}
          {/*Unable to update a todo*/}
        </div>
      ) : null}
    </div>
  );
};
