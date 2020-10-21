import { StatusBar } from 'expo-status-bar';
import * as React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { config } from './overmind';
import { Provider } from 'overmind-react';
import { createOvermind } from 'overmind';

import client from './config/apollo';
import {ApolloProvider} from '@apollo/client';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const overmind = createOvermind(config);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
      <Provider value={overmind}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
      </Provider>
      </ApolloProvider>
    );
  }
}
