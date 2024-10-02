import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks';
import { changeFilter, clearAllCompletedToDos } from '../store/todosSlice';
import cn from 'classnames'

const valuesOfFilter = ['All', 'Active', 'Completed'];

const FooterLine = () => {
  const dispatch = useAppDispatch();

  const { todos, filter } = useAppSelector(state => state.todos);

  const handlerChangeFilter = (newFilter: string) => {
    dispatch(changeFilter(newFilter));
  };

  const countOfNecessaryItems = todos.filter((todo) => {
    return !todo.isCompleted;
  })

  const handlerClearAllCompletedToDos = () => {
    dispatch(clearAllCompletedToDos());
  };

  return (
    <FooterLineBody>
      <div>
        {countOfNecessaryItems.length} items left
      </div>
      <div className='footer-buttons-block'>
        {
          valuesOfFilter.map((value) => {
            return (
              <button
                key={value}
                className={cn('footer-button', {
                  active: filter === value,
                })}
                onClick={() => handlerChangeFilter(value)}
              >
                {value}
              </button>
            )
          })
        }
      </div>
      <div>
        <button className='clean-button' onClick={handlerClearAllCompletedToDos}>Clear completed</button>
      </div>
    </FooterLineBody>
  )
}

export default FooterLine;

const FooterLineBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.padding.large};

  @media screen and (max-width: 390px){
    flex-direction: column;
    row-gap: 10px;
  }
  .footer-buttons-block{
    display: flex;
    flex-direction: row;
    column-gap: 20px;
  }

  .footer-button{
    padding: ${({ theme }) => theme.padding.normal};
    background-color: white;
    border: 1px solid transparent;
    border-radius: ${({ theme }) => theme.padding.little};  
  }
  
  .footer-button:hover{
    background-color:${({ theme }) => theme.colors.light_pink};
    cursor: pointer; 
  }

  .clean-button{
    padding: ${({ theme }) => theme.padding.normal};
    background-color: white;
    &:hover {
        text-decoration: underline;
        cursor: pointer; 
    }
  }

  .active {
    border: ${({ theme }) => theme.border.red};
  }
`