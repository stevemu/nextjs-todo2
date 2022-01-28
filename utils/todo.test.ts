import { Filter, FilterEnum } from '../components/Filter';
import { filterTodos } from './todo';

describe('filterTodos', () => {
  it('should return empty array when an empty array of todos is passed in', () => {
    const result = filterTodos([], FilterEnum.ALL);
    expect(result).toEqual([]);
    const result2 = filterTodos([], FilterEnum.COMPLETED);
    expect(result2).toEqual([]);
    const result3 = filterTodos([], FilterEnum.UNCOMPLETED);
    expect(result3).toEqual([]);
  });

  it('should return all todos if filter is all', () => {
    const result = filterTodos(
      [
        { _id: '1', text: 'a', completed: true },
        { _id: '2', text: 'b', completed: false },
        { _id: '2', text: 'c', completed: false },
      ],
      FilterEnum.ALL
    );
    expect(result).toEqual([
      { _id: '1', text: 'a', completed: true },
      { _id: '2', text: 'b', completed: false },
      { _id: '2', text: 'c', completed: false },
    ]);
  });

  it('should return all todos if filter is completed', () => {
    const result = filterTodos(
      [
        { _id: '1', text: 'a', completed: true },
        { _id: '2', text: 'b', completed: false },
        { _id: '2', text: 'c', completed: false },
      ],
      FilterEnum.COMPLETED
    );
    expect(result).toEqual([{ _id: '1', text: 'a', completed: true }]);
  });

  it('should return all todos if filter is uncompleted', () => {
    const result = filterTodos(
      [
        { _id: '1', text: 'a', completed: true },
        { _id: '2', text: 'b', completed: false },
        { _id: '2', text: 'c', completed: false },
      ],
      FilterEnum.UNCOMPLETED
    );
    expect(result).toEqual([
      { _id: '2', text: 'b', completed: false },
      { _id: '2', text: 'c', completed: false },
    ]);
  });
});
