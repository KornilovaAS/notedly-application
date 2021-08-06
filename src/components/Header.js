import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { Link, withRouter } from 'react-router-dom';

import logo from '../img/logo.svg';
import ButtonAsLink from './ButtonAsLink';

import { IS_LOGGED_IN } from '../gql/query';

const UserState = styled.div`
margin-left: auto;
`;

const HeaderBar = styled.header` 
 width: 100%;
 padding: 0.5em 1em; 
 display: flex; 
 height: 64px; 
 position: fixed; 
 align-items: center;
 background-color: #fff;
 box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
 z-index: 1;
 `;

const LogoText = styled.h1` 
 margin: 0;
 padding: 0; 
 display: inline;
 `;

const Header = pops => {
   //хук запроса проверки состояния авторизации пользователя, включая клиент для обращения к хранилищу Apollo
   const { data, client } = useQuery(IS_LOGGED_IN);
   return (
      <HeaderBar>
         <img src={logo} alt="Notedly logo" height="40" />
         <LogoText >Notedly </LogoText>
         <UserState>
            {data.isLoggedIn ? (
               <ButtonAsLink
                  onClick={() => {
                     //удаляем токен
                     localStorage.removeItem('token');
                     //очищаем кеш приложения
                     client.resetStore();
                     //обновляем локальное состояние
                     client.writeData({ data: { isLoggedIn: false } });
                     //перенаправляем пользователя на домашнюю страницу
                     props.history.push('/');
                  }}>Выйти</ButtonAsLink>
            ) : (
               <p>
                  <Link to={'/signin'}>Войти</Link>{' '}
                  <Link to={'/signup'}>Зарегистрироваться</Link>
               </p>
            )}
         </UserState>
      </HeaderBar>
   );
};

export default withRouter(Header);