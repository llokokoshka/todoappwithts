import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { updateToDo, deleteToDo } from '../store/todosSlice';
import cn from 'classnames';
import { useAppSelector } from '../hooks';
import { RootState } from '../store/index';



export default function TodosPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const location = useLocation();
  const data = location.state?.data;
  const [editValue, setEditValue] = useState<string>(data.value);
  // const a = useAppSelector((state: RootState) => state.todos.todos)
  // console.log('a = '+a);
  // let b:Array<object>;
  // a.forEach((todo) => {
  //     if (data.id === todo.id) {
  //         b.push(todo);
  //         console.log('b = '+b);
  //         return todo;

  //     }
  // }
  // )
  // console.log(b);

  const handleUpdateToDo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    dispatch(updateToDo({ id: data.id, newValue: editValue }));
    setIsEdit(false);
  }

  const handleDeleteToDo = () => {
    dispatch(deleteToDo({ id: data.id }));
    navigate(`/`)
  }

  function changeIsEdit() {
    setIsEdit(!isEdit);
  }

  const changeEditValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value)
  }

  return (
    <BodyWrapper>
      <div className='main-container'>
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
                  completed: (data.isCompleted),
                })}
                onDoubleClick={changeIsEdit}>
                {data.value}
              </div>
            </div>
          </>
        )
        }
        <div className='button-div'>
          <button className='button-style'>Edit</button>
          <button className='button-style'
            onClick={handleDeleteToDo}
          >Delete</button>
        </div>

        <textarea></textarea>
        <button className='button-style' onClick={()=>{navigate(`/`)}}>Back</button>
      </div>
    </BodyWrapper>
  )
}
const BodyWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 155px;
  background-color: ${({ theme }) => theme.colors.background};
  min-height:100vh;

  .main-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 40px;
    padding: 60px 100px;
    background-color: white;
    box-shadow: 5px 3px 5px 1px rgba(0, 0, 0, 0.25);
    max-width: 550px;
  }

  .button-div{
    display: flex;
    column-gap: 20px;
  }

    .button-style{
        width: 100px;
        height: 50px;
        background-color: ${({ theme }) => theme.colors.light_pink};
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

  .todo-body__div{
    display: flex;
    align-items: center;
    /* text-align: left; */
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal;
    overflow-wrap: break-word;
    /* max-width: 100%;
    max-height: 100%; */
  }

`