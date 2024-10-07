import React from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../hooks';
import { toggleToDoComplete, deleteToDo } from '../store/todosSlice';
import cn from 'classnames';
import { Todo } from '../interfaces';
import { useNavigate } from 'react-router-dom';

type Props = {
  todo: Todo;
}

const ToDoLine: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const handleToggleToDoComplete = () => {
    dispatch(toggleToDoComplete(props.todo));
  }

  const handleDeleteToDo = () => {
    dispatch(deleteToDo({ id: props.todo.id }));
  }

  const navigate = useNavigate()

  const redirectToPageWithTodo = () => {
    navigate(`todo/${props.todo.id}`)
  }

  return (
    <ToDoLineBody>
      <div className={cn('todo-body')} >
        <input
          className={cn('todo-body__checkbox', {
          })}
          type='checkbox'
          checked={props.todo.isCompleted}
          onChange={handleToggleToDoComplete}
        />
        <>
          <div
            className='todo-body__div-button'
            onClick={redirectToPageWithTodo}
          >
            <div
              className={cn('todo-body__div', {
                completed: (props.todo.isCompleted),
              })}
              >
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
    cursor: pointer;
    padding: 0 ${({ theme }) => theme.padding.large};
    width: 100%;
    height: 100%;
    max-width: ${({ theme }) => theme.sizes.desctop};
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

  .todo-body__div{
    display: flex;
    text-align: left;
    word-wrap: break-word;
    word-break: break-all;
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

