import type { NextPage } from 'next';
import { useQuery, useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { Todo } from '../types/Todo';
import { useCallback, useState } from 'react';
import { Filter, FilterEnum } from '../components/Filter';
import { filterTodos } from '../utils/todo';

const Home: NextPage = () => {
  const [filter, setFilter] = useState<FilterEnum>(FilterEnum.ALL);
  const { data: todos = [], refetch } = useQuery<Todo[]>('todos', async () => {
    return (await fetch('/api/todo')).json();
  });
  const { register, handleSubmit } = useForm<Todo>();

  const postTodoMutation = useMutation<void, Error, Todo>(async (newTodo) => {
    newTodo.completed = false;
    await fetch('/api/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });
  });

  const checkTodoMutation = useMutation<void, Error, string>(
    async (todoId) => {
      await fetch('/api/check/' + todoId, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const uncheckTodoMutation = useMutation<void, Error, string>(
    async (todoId) => {
      await fetch('/api/check/' + todoId, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const onSubmit = useCallback(async () => {
    await handleSubmit(async (todo) => {
      await postTodoMutation.mutateAsync(todo);
      await refetch();
    })();
  }, [handleSubmit, postTodoMutation, refetch]);

  const filteredTodos = filterTodos(todos, filter);

  return (
    <div>
      <Filter
        value={filter}
        onChange={(filter) => {
          setFilter(filter);
        }}
      />
      <ul>
        {filteredTodos.map((todo) => {
          return (
            <li key={todo._id}>
              <span>
                <input
                  onChange={async (e) => {
                    if (e.target.checked) {
                      await checkTodoMutation.mutateAsync(todo._id);
                    } else {
                      await uncheckTodoMutation.mutateAsync(todo._id);
                    }
                  }}
                  type='checkbox'
                  checked={todo.completed === true}
                />
              </span>
              <span> {todo.text}</span>
            </li>
          );
        })}
      </ul>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue='test' {...register('text')} />
        <input type='submit' />
      </form>
    </div>
  );
};

export default Home;
