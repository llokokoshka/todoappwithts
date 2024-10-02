import { createSelector } from 'reselect';
import { RootState } from './index';

const getTodos = (state: RootState) => state.todos.todos;
const getFilter = (state: RootState) => state.todos.filter;

export const getFilteredToDos = createSelector([getTodos, getFilter],
    (getTodos, getFilter) => {
        switch (getFilter) {
            case 'Active':
                return getTodos.filter(todo => !todo.isCompleted);
            case 'Completed':
                return getTodos.filter(todo => todo.isCompleted);
            default:
                return getTodos;
        }
    }
);
