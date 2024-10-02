import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TodoState, Todo } from '../interfaces'


const initialState: TodoState = {
  todos: [],
  filter: 'All',
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {

    addTodo: {
      prepare(data: string) {
        return {
          payload: {
            value: data,
            id: Math.random(),
          }
        }
      },
      reducer(state, action: PayloadAction<{ id: number, value: string }>) {
        state.todos.push({
          id: action.payload.id,
          value: action.payload.value,
          isCompleted: false,
        },);
      }
    },

    updateToDo: (state, action: PayloadAction<{ id: number, newValue: string, }>) => {
      const { id, newValue } = action.payload;
      state.todos.forEach((todo) => {
        if (id === todo.id) {
          todo.value = newValue;
        }
      })
    },

    toggleToDoComplete: (state, action: PayloadAction<Todo>) => {
      const todo = action.payload;

      state.todos.forEach((myTodo) => {
        if (todo.id === myTodo.id) {
          myTodo.isCompleted = !myTodo.isCompleted;
        }
      })
    },

    deleteToDo: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      console.log(id);
      state.todos = state.todos.filter((todo) => todo.id !== id)
    },

    clearAllCompletedToDos: (state) => {
      state.todos = state.todos.filter(todo => !todo.isCompleted);
    },
    toggleAllToDoCompletion: (state) => {
      const areAllCompleted = state.todos.every(todo => todo.isCompleted);
      state.todos = state.todos.map(todo => ({ ...todo, isCompleted: !areAllCompleted }));
    },
    changeFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  }
})

export const {
  addTodo,
  updateToDo,
  toggleToDoComplete,
  deleteToDo,
  clearAllCompletedToDos,
  toggleAllToDoCompletion,
  changeFilter,
} = todosSlice.actions;

export default todosSlice.reducer;