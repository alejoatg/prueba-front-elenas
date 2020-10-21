import React, {useState} from 'react';
import { 
  StyleSheet,
  Button,
  TouchableHighlight,
  TextInput,
  ScrollView
 } from 'react-native';

import { Text, View } from '../components/Themed';
import {gql, useMutation} from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

const CREATE_CLIENT = gql`
  mutation createClient($input: ClientInput!) {
  createClient(input: $input)
  {
    ... on Client{
  		id
      registerDate
      firstName
      lastName
      cedula
      address
    } 
    ... on ValidationErrors {
      message
   
    }
    __typename
	}
  }
`;

export default function CreateClient() {
  const [ createClient ] = useMutation(CREATE_CLIENT);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedula, setCedula] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [errors, setErrors] = useState({});
  const [errorSave, setErrorSave] = useState(false);
  const [cargando, setCargando] = useState(false);
  const navigation = useNavigation();

  const resetValues = () =>{
    setNombre('');
    setApellido('');
    setCedula('');
    setEmail('');
    setTelefono('');
    setDireccion('');
    setErrors('');
  };
  
  const validacionFormulario = () =>{
    setErrorSave(false);
    setErrors({});
    if (!nombre) {
      setErrors({
        nombre: '*El nombre es requerido',
      });
    } else if (!apellido) {
      setErrors({
        apellido: '*El apellido es requerido',
      });
    } else if (!direccion) {
      setErrors({
        direccion: '*La direccion es requerida',
      });
    } else {
      console.log('Grabando En BD');
      createClientFun();
    }

  }
  
  const createClientFun = async () =>{
    setCargando(true);
    try {
      const { data } = await createClient({
        variables:{
          input: {
            firstName: nombre,
            lastName: apellido,
            cedula: cedula,
            email: email,
            cellphone: telefono,
            address: {
              streetAddress: direccion,
              city: 'Popayan',
              cityId: 1,
              stateShortCode: 'Cau',
              stateId: 19,
              country: 'Colombia'
          }
        }
      }
      })
      resetValues();
      setCargando(false);
      navigation.navigate('ListClient');
    } catch (error) {
      console.log('Error Registrando: ', error);
      setCargando(false);
      setErrorSave(true);
    }
    
  }

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cliente</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
      <View>
            <Text>* Nombre:</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setNombre(text)}
                value={nombre}
            />
            {errors.nombre && <Text style={styles.textError}>El nombre es necesario</Text>}
            <Text>* Apellido:</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setApellido(text)}
                value={apellido}
            />
            {errors.apellido && <Text style={styles.textError}>El Apellido es necesario</Text>}
            <Text>Cedula:</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setCedula(text)}
                value={cedula}
            />
            <Text>Email:</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setEmail(text)}
                value={email}
            />
            <Text>Telefono:</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setTelefono(text)}
                value={telefono}
            />
            <Text>* Direccion:</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setDireccion(text)}
                value={direccion}
            />
            {errors.direccion && <Text style={styles.textError}>La direccion es necesaria</Text>}

        </View>

        {errorSave && <Text
                      style={styles.textError}
                    >Error Guardando Cliente</Text>}

      {cargando ? <Text>Guardando ....</Text> : (
        <TouchableHighlight 
        onPress={ () => validacionFormulario()}
        >
        <View style={styles.button}>
          <Text>Registrar Usuario</Text>
        </View>
      </TouchableHighlight>
            )
          }


      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginTop: 10
  },
  textError: {
    color: 'red',
  },
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
    marginVertical: 4,
    height: 1,
    width: '80%',
  },
});
