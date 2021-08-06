import React from 'react';
import { useQuery, gql } from '@apollo/client';

import Note from '../components/Note';

import { GET_NOTE } from '../gql/query';

const NotePage = props => {
  // Сохраняем id из url в виде переменной
  const id = props.match.params.id;
  //запрашиваем хук передевая значение ID в качестве переменной
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error! Note not found</p>;
  }
  return <Note note={data.note} />;


};

export default NotePage;
