import { FilterEnum } from '../components/Filter';
import { Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[], filter: FilterEnum) => {
  if (filter === FilterEnum.ALL) {
    return todos;
  }
  if (filter === FilterEnum.COMPLETED) {
    return todos.filter((todo) => {
      return todo.completed === true;
    });
  }
  if (filter === FilterEnum.UNCOMPLETED) {
    return todos.filter((todo) => {
      return !todo.completed;
    });
  }
};
