import React from 'react';
import { useQuery } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import Button from '../components/Button';

import { GET_NOTES } from '../gql/query';


const Home = () => {
   //хук запроса
   const { data, loading, error, fetchMore } = useQuery(GET_NOTES);
   //Если данные загружаются, отображаем сообщение о загрузке
   if (loading) {
      return (
         <p>Loadin...</p>
      );
   }
   if (error) {
      return (
         <p>Error!</p>
      );
   }
   return (
      <React.Fragment>
         <NoteFeed notes={data.noteFeed.notes} />
         {data.noteFeed.hasNextPage && (
            <Button
               onClick={() =>
                  fetchMore({
                     variables: {
                        cursor: data.noteFeed.cursor
                     },
                     updateQuery: (previousResult, { fetchMoreResult }) => {
                        return {
                           noteFeed: {
                              cursor: fetchMoreResult.noteFeed.cursor,
                              hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                              notes: [
                                 //совмещаем новые результаты со старыми
                                 ...previousResult.noteFeed.notes,
                                 ...fetchMoreResult.noteFeed.notes
                              ],
                              _typename: 'noteFeed'
                           }
                        };
                     }
                  })
               }>
               Load More
            </Button>
         )}
      </React.Fragment>
   );
};

export default Home;
