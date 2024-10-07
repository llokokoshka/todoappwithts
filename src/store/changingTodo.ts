import { createSelector } from 'reselect';
import { RootState } from './index';

const getTodos = (state: RootState) => state.todos.todos;
const getId = (state: RootState, id: number) => id;

export const changingTodo = createSelector([getTodos, getId],
    (getTodos, getId) => {
        return getTodos.find((todo) => todo.id === getId);
    }
);
