import React, {useEffect} from 'react';
import { 
  StyleSheet,
  Button,
  ScrollView 
 } from 'react-native';

import {gql, useQuery} from '@apollo/client';
import ClientItem from '../components/clients/ClientItem';
import { Text, View } from '../components/Themed';

const CLIENTS_SEARCH = gql`
  query clientsSearch {
      clientsSearch{
        
        currentPage
        totalPages
        resultsPerPage
        results{
          id
          registerDate
          firstName
          lastName
          cedula
          address
          city
          cellphone      
          credit
          email
          state{
            id
            shortCode
            displayName
            name
            shippingZone{
              name
              cost
            }
            
          }
        }
      }
  }
`;

export default function ListClient() {

  const {data, loading, error} = useQuery(CLIENTS_SEARCH,{
    pollInterval: 500,
  });

  if (loading) return <Text style={styles.loading}>Cargando Listado de Clientes...</Text>
  if (error) {
    console.log(error);
  return (
    <>
    <Text style={styles.loading}>Error Cargando Clientes </Text>
    <Text style={styles.loading}>{error.message} </Text>
    </>
    )
  }  

  return (
    <ScrollView>
      <View style={styles.container}>
      <Text style={styles.title}>Listado de Clientes</Text>
      
      {data.clientsSearch.results.map(client => (
          <ClientItem 
            key={client.id}
            client={client}
          />
      ))}

    </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  loading: {
    textAlign: 'center',
    marginTop: 30
  },
});
