import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client"
import { ApolloProvider } from "@apollo/client/react"
import { createFragmentRegistry } from "@apollo/client/cache"
import { TODO_FRAGMENT } from './graphql/fragments/todo.fragment.ts'

const lastLink = new HttpLink({
  uri: import.meta.env.VITE_SCHEMA
});

const client = new ApolloClient({
  link: ApolloLink.from([
    lastLink
  ]),
  cache: new InMemoryCache({
    fragments: createFragmentRegistry(TODO_FRAGMENT)
  })
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
