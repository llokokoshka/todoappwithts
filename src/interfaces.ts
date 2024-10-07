export interface Todo {
    id: number,
    value: string,
    isCompleted: boolean,
    description: string,
  }
  
  export interface TodoState {
    todos: Todo[],
    filter: string,
  }
  