import * as React from 'react';
import { 
  StyleSheet,
  Button,
  TouchableHighlight,
 } from 'react-native';

 import { Text, View } from '../Themed';

import {useOvermind} from '../../overmind';
import { useNavigation } from '@react-navigation/native';

export default function ClientItem(props: any) {
  const {state, actions} = useOvermind();
  const navigation = useNavigation();
  const {client} = props;

  const editClient = ()=> {
    actions.clienteEditar(client);
    navigation.navigate('Edit');

  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Clientes Registrados</Text> */}


      <View>
        <TouchableHighlight
        style={styles.item}
        onPress={() => editClient()}
        >
        <View>
        <Text>Nombre: {client.firstName} {client.lastName}</Text>
        <Text>Direccion: {client.address} </Text>
        <Text>Cedula: {client.cedula} </Text>
        <Text>Telefono: {client.cellphone} </Text>
        <Text>E-mail: {client.email} </Text>
        <Text>Ciudad: {client.city} </Text>
        <Text>Credito: {client.credit} </Text>
        <Text>Fecha Registro: {client.registerDate} </Text>
        </View>

       </TouchableHighlight>
    </View>

    </View>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  item:{
      backgroundColor: '#DDDDDD',
      padding: 6,
    //   flex: 1
  }
});
