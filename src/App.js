import React from 'react';
import ReactDOM from 'react-dom';
import {
   ApolloClient,
   ApolloProvider,
   InMemoryCache,
   createHttpLink
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

import GlobalStyle from './components/GlobalStyle';
import Pages from './pages';

const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

//Проверяем наличие токена и возвращаем заголовки в контекст
const authLink = setContext((_, { headers }) => {
   return {
      headers: {
         ...headers,
         authorization: localStorage.getItem('token') || ''
      }
   };
});

const client = new ApolloClient({
   link: authLink.concat(httpLink),
   cache,
   resolvers: {},
   connectToDevTools: true,
});

const data = {
   isLoggedIn: !!localStorage.getItem('token')
};

//записываем данные кеша при начальной загрузке
cache.writeData({ data });
//записываем данные кеша после его сброса
client.onResetStore(() => cache.writeData({ data }));

const App = () => {
   return (
      <ApolloProvider client={client}>
         <GlobalStyle />
         <Pages />
      </ApolloProvider>
   );
};

ReactDOM.render(<App />, document.getElementById('root'));