import {ApolloClient, createHttpLink} from '@apollo/client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: 'http://staging.athenea.elenas.la/gql/'
})

const authLink = setContext( (_, {headers}) => {
    const token = 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiKzU3MzA1NzE5OTk5NSIsImlhdCI6MTYwMzE1MzcyNH0.-AbbsX_EpvtEHTiD4zi4_hcCvwg2czq7RKzJ-DEsZMg';
    return {
        headers: {
            ...headers,
            authorization: token
        }
    }
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});

export default client;