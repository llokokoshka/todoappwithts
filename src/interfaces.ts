export interface Todo {
    id: number,
    value: string,
    isCompleted: boolean,
  }
  
  export interface TodoState {
    todos: Todo[],
    filter: string,
  }
  