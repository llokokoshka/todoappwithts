import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { updateToDo, deleteToDo, updateDescription } from '../store/todosSlice';
import cn from 'classnames';
import { RootState } from '../store/index';
import { useAppSelector } from '../hooks';
import { Todo } from '../interfaces';

export default function TodosPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let { userId } = useParams();
  const todos: Todo = location.state?.data;

  const getTodos = useAppSelector((state: RootState) => state.todos.todos);
  const changindTodo = getTodos.find((todo) => todo.id === todos.id);

  useEffect(() => {
    if (!changindTodo) {
      navigate(`/`);
    }
  });

  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState<string>(changindTodo?.value || '');
  const [description, setDescription] = useState<string>(changindTodo?.description || '');

  const handleUpdateToDo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    dispatch(updateToDo({ id: changindTodo!.id, newValue: editValue }));
    setIsEdit(false);
  }

  const handleUpdateDescription = () => {
    dispatch(updateDescription({ id: changindTodo!.id, newValue: description }));
  }

  const handleDeleteToDo = () => {
    dispatch(deleteToDo({ id: changindTodo!.id }));
    navigate(`/`)
  }

  function changeIsEdit() {
    setIsEdit(!isEdit);
  }

  const changeEditValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value)
  }

  const changeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  }

  const resetDescription = () => {
    setDescription('');
    dispatch(updateDescription({ id: changindTodo!.id, newValue: '' }));
  }

  return (
    <BodyWrapper>
      <div className='main-container'>
        <div className='main-container__mini-block'>
          {isEdit ? (
            <input
              autoFocus
              className='main-container__update-input reset'
              type='text'
              value={editValue}
              onChange={changeEditValue}
              onKeyDown={handleUpdateToDo}
              onBlur={changeIsEdit}
            />
          ) : (
            <>
              <div
                className={cn('main-container__todo', {
                  completed: (changindTodo?.isCompleted),
                })}
                onDoubleClick={changeIsEdit}>
                {editValue}
              </div>
            </>
          )
          }
          <div className='main-container__button-div'>
            <button
              className='button-div__button-style'
              onClick={changeIsEdit}
            >
              Edit
            </button>
            <button
              className='button-div__button-style'
              onClick={handleDeleteToDo}
            >
              Delete
            </button>
          </div>
        </div>
        <div className='main-container__mini-block'>
          <textarea
            className='main-container__textarea'
            placeholder='Add description'
            value={description}
            onChange={changeDescription}
          >
          </textarea>
          <div className='main-container__button-div'>
            <button
              className='button-div__button-style'
              onClick={resetDescription}
            >
              Reset
            </button>
            <button
              className='button-div__button-style'
              onClick={handleUpdateDescription}
            >
              Save
            </button>
          </div>
        </div>
        <button
          className='button-div__button-style'
          onClick={() => { navigate(`/`) }}
        >
          Back
        </button>
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

    @media screen and (max-width: 390px){
      max-width: ${({ theme }) => theme.sizes.modile};
    }
  }
  
  .main-container__mini-block{
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 15px;
  }

  .main-container__todo{
    display: flex;
    align-items: center;
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal;
    overflow-wrap: break-word;
    padding-left: 7px;
    width: ${({ theme }) => theme.sizes.shirt_dectop};   
     min-height: 39px;
    border: ${({ theme }) => theme.border.grey} ;

    @media screen and (max-width: 390px){
      max-width: ${({ theme }) => theme.sizes.modile};
    }
  }

  .main-container__button-div{
    display: flex;
    column-gap: 20px;
  }

  .button-div__button-style{
      width: 100px;
      height: 50px;
      background-color: ${({ theme }) => theme.colors.light_pink};
      border-radius: 5px;
  }

  .button-div__button-style:hover{
    cursor: pointer;
    border:  ${({ theme }) => theme.border.red};
    text-decoration: underline;
  }

  .reset{
    appearance: none;
  }

  .main-container__update-input{
    width: ${({ theme }) => theme.sizes.shirt_dectop};
    height: 39px;
    padding-left: 7px;

    @media screen and (max-width: 390px){
      max-width: ${({ theme }) => theme.sizes.modile};
    }
  }

  .main-container__update-input:focus {
    outline: none;
    border:  ${({ theme }) => theme.border.red};
  }

  .main-container__textarea{
    border: ${({ theme }) => theme.border.grey} ;
    width: 300px;
    min-height: 100px;
    padding: 7px;
    resize: none;

    @media screen and (max-width: 390px){
      max-width: ${({ theme }) => theme.sizes.modile};
    }
  }
  .main-container__textarea:focus{
    outline: none;
    border:  ${({ theme }) => theme.border.red};
  }

`