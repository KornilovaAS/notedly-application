import React, { useState } from 'react';
import styled from 'styled-components';

import Button from './Button';

const Wrapper = styled.div`
 height: 100%;
 `;
const Form = styled.form` 
 height: 100%;
 `;
const TextArea = styled.textarea` 
 width: 70%;
 height: 90%;
 `;

const NoteForm = props => {
   const [value, setValue] = useState({ content: props.content || '' });

   const handleChange = event => {
      setValue({
         ...value,
         [event.target.name]: event.target.value
      });
   };
   return (
      <Wrapper>
         <Form
            onSubmit={event => {
               event.preventDefault();
               props.action({
                  variables: {
                     ...value
                  }
               });
            }}
         >
            <TextArea
               required
               type="text"
               name="content"
               placeholder="Введите текст заметки"
               value={value.content}
               onChange={handleChange}
            />
            <Button type="submit">Сохранить</Button>
         </Form>
      </Wrapper>
   );
};

export default NoteForm;;