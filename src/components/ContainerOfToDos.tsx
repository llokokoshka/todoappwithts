import React from 'react';
import styled from 'styled-components';
import ToDoForm from './ToDoForm';
import ToDoLine from './ToDoLine';
import FooterLine from './FooterLine';
import { getFilteredToDos } from '../store/filterToDos';
import { useAppSelector } from '../hooks';

const ContainerOfToDos = () => {
  const filteredToDos = useAppSelector(getFilteredToDos);
  return (
    <ContainerForTodos>
      <ToDoForm />
      <ul className='todo-main-body'>
        {filteredToDos.map((todo) => {
          return (
            <ToDoLine
              key={todo.id}
              todo={todo}
            />
          )
        })}
      </ul>
      <FooterLine />
    </ContainerForTodos>
  )
}

export default ContainerOfToDos;

const ContainerForTodos = styled.div`
     display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    box-shadow: 5px 3px 5px 1px rgba(0, 0, 0, 0.25);
    max-width: ${({ theme }) => theme.sizes.desctop};
    width: 100%;
    
    @media screen and (max-width: 390px){
      max-width: ${({ theme }) => theme.sizes.modile};
    }

  .todo-main-body{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%; 
  }
`



