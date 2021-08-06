
import React, { useState } from 'react';
import styled from 'styled-components';

import Button from './Button';


const Wrapper = styled.div`
 border: 1px solid #f5f4f0;
 max-width: 500px; 
 padding: 1em; 
 margin: 0 auto;
 `;

const Form = styled.form` 
 label,
 input {
 display: block; 
 line-height: 2em;
}

input {
width: 100%;
margin-bottom: 1em;
}
`;

const UserForm = props => {
   const [values, setValues] = useState();

   const handleChange = event => {
      setValues({
         ...values,
         [event.target.name]: event.target.value
      });
   };

   return (
      <Wrapper>
         {props.formType === 'signup' ? <h2>Sign Up</h2> : <h2>Sign In</h2>}
         <Form
            onSubmit={event => {
               event.preventDefault();
               props.action({
                  variables: {
                     ...values
                  }
               });
            }}>
            {props.formType === 'signup' && (
               <React.Fragment>
                  <label htmlFor="username">Имя пользователя:</label>
                  <input
                     required
                     type="text"
                     id="username"
                     placeholder="Username"
                     onChange={handleChange} />
               </React.Fragment>
            )}
            <label htmlFor="email">Email:</label>
            <input
               required
               type="email"
               id="email"
               name="email"
               placeholder="Email"
               onChange={handleChange}
            />
            <label htmlFor="password">Password:</label>
            <input
               required
               type="password"
               id="password"
               name="password"
               placeholder="Password"
               onChange={handleChange}
            />
            <Button type="submit">Отправить</Button>
         </Form>
      </Wrapper>
   );
};

export default UserForm;