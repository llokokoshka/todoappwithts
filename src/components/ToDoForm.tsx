import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { addTodo, toggleAllToDoCompletion } from '../store/todosSlice';

const ToDoForm = () => {
  const dispatch = useAppDispatch();
  const [todoValue, setTodoValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleAddToDo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!todoValue.trim()) {
      return;
    }
    dispatch(addTodo(todoValue));
    setTodoValue('');
  };

  const handleToggleAllToDosCompletion = () => {
    dispatch(toggleAllToDoCompletion());
  };

  const changeTodoValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.target.value);
  }

  return (
    <ToDoBody
      onSubmit={handleAddToDo}
      isFocused={isFocused}
    >
      <div
        className='todo-input__arrow'
        onClick={handleToggleAllToDosCompletion}
      >✔</div>
      <input
        className='todo-input__field' type='text' value={todoValue}
        onChange={changeTodoValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder='What needs to be done?'
      />
    </ToDoBody>
  )
}

export default ToDoForm;

interface ToDoBodyProps {
  isFocused: boolean
}

const ToDoBody = styled.form<ToDoBodyProps>` 
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: ${({ isFocused }) => (isFocused ? '1px solid #b83f45' : '1px solid transparent')};

    @media screen and (max-width: 390px){
      max-width: ${({ theme }) => theme.sizes.modile};
    }

  .todo-input__arrow{
    transform: scale(2);
    margin: 0 15px;
    &:hover{
      cursor: pointer; 
    }
  }

  .todo-input__field{
    width: ${({ theme }) => theme.sizes.shirt_dectop};
    height: ${({ theme }) => theme.sizes.height};
    padding-left: ${({ theme }) => theme.padding.large};
  }

  .todo-input__field:focus{
    outline: none;
  }

`
