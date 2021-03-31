import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { offsetLimitPagination } from "@apollo/client/utilities";
import App from './App';

const httpLink = createHttpLink({
  uri: 'http://localhost:2000/graphql?',
});

const authLink = setContext((_, { headers }) => {
  const auth_token = localStorage.getItem('token');   
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: auth_token,
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          feed: offsetLimitPagination()
        },
      },
    },
  })
});


ReactDOM.render(  
    <ApolloProvider client={client} >
      <App />
    </ApolloProvider>,
  document.getElementById('root')
);