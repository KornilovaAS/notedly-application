import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm';


//мутация GraphQL
const SIGNUP_USER = gql`
mutation signUp($email: String!, $username: String!, $password: String!) {
   signUp(email: $email, username: $username, password: $password)
}
`;


const SignUp = props => {
   useEffect(() => {
      document.title = 'Sign Up - Notedly';
   });

   const client = useApolloClient();
   const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
      onCompleted: data => {
         //сохраняем токена
         localStorage.setItem('token', data.signUp);

         //обновляем локальный хэш
         client.writeData({ data: { isLoggedIn: true } });
         //перенаправляем пользователя на домашнюю страницу 
         props.history.push('/');
      }
   });


   return (
      <React.Fragment>
         <UserForm action={signUp} formType="signup" />
         {loading && <p>Loading...</p>}
         {error && <p>Error creating an account</p>}
      </React.Fragment>
   );
};

export default SignUp;
