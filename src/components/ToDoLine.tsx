import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { updateToDo, toggleToDoComplete, deleteToDo } from '../store/todosSlice';
import cn from 'classnames';
import { Todo } from '../interfaces';

type Props = {
  todo: Todo;
}

const ToDoLine: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const [editValue, setEditValue] = useState<string>(props.todo.value);
  const [isEdit, setIsEdit] = useState(false);

  const handleUpdateToDo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    dispatch(updateToDo({ id: props.todo.id, newValue: editValue }));
    setIsEdit(false);
  }

  const handleToggleToDoComplete = () => {
    dispatch(toggleToDoComplete(props.todo));
  }

  const handleDeleteToDo = () => {
    dispatch(deleteToDo({ id: props.todo.id }));
  }

  function changeIsEdit() {
    setIsEdit(!isEdit);
  }

  const changeEditValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value)
  }

  return (
    <ToDoLineBody>
      <div className={cn('todo-body', { reset: isEdit, })} >
        <input
          className={cn('todo-body__checkbox', {
            hippen: isEdit,
          })}
          type='checkbox'
          checked={props.todo.isCompleted}
          onChange={handleToggleToDoComplete}
        />
        {isEdit ? (
          <input
            autoFocus
            className='todo-body__update-input reset'
            type='text'
            value={editValue}
            onChange={changeEditValue}
            onKeyDown={handleUpdateToDo}
            onBlur={changeIsEdit}
          />
        ) : (
          <>
            <div
              className='todo-body__div-button'
              onDoubleClick={changeIsEdit}
            >
              <div
                className={cn('todo-body__div', {
                  completed: (props.todo.isCompleted),
                })}
                onDoubleClick={changeIsEdit}>
                {props.todo.value}
              </div>
              <button
                className='closed-button'
                onClick={handleDeleteToDo}
              >
                X
              </button>
            </div>
          </>
        )
        }
      </div>
    </ToDoLineBody>
  )
}

export default ToDoLine;

const ToDoLineBody = styled.li`
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  max-width: ${({ theme }) => theme.sizes.desctop};
  min-height: ${({ theme }) => theme.sizes.height};
  width: 100%;
  height: 100%;
  border:  ${({ theme }) => theme.border.grey};;

  .closed-button{
    opacity: 0;
    background-color: white;
    padding: ${({ theme }) => theme.padding.little};
   &:hover{
      cursor: pointer; 
    }
  }

  &:hover .closed-button{
      opacity: 1;
    }

  .todo-body{
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    column-gap: 10px;
    padding: 0 ${({ theme }) => theme.padding.large};
    width: 100%;
    height: 100%;
    max-width: ${({ theme }) => theme.sizes.desctop};
  }

  .reset{
    appearance: none;

  }
  .todo-body__update-input{
    width: ${({ theme }) => theme.sizes.shirt_dectop};
    height: 39px;
  }
  .todo-body__update-input:focus {
    outline: none;
    border:  ${({ theme }) => theme.border.red};
  }

  .todo-body__checkbox{
    appearance: none;
    -webkit-appearance: none;
    display: flex;
    opacity: 1;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    flex-shrink: 0;
    width: 25px;
    height: 25px;
    border:  ${({ theme }) => theme.border.red};
    cursor: pointer;
  }

  .todo-body__checkbox:checked{
    background-color:${({ theme }) => theme.colors.light_pink};
  }
  
  .todo-body__checkbox:checked::after{
    content: '✓';
    position: absolute;
    transform: scale(1.5);
  }

  .hippen{
    opacity: 0;
  }
  .todo-body__div{
    display: flex;
    text-align: left;
    word-wrap: break-word;
    white-space: normal;
    overflow-wrap: break-word;
    max-width: 100%;
    max-height: 100%;
  }

  .completed{
    text-decoration: line-through;
  }

  .todo-body__div-button{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }

`

