import React, {useState} from 'react';
import { 
  StyleSheet,
  Button,
  TouchableHighlight,
  TextInput,
  ScrollView,
  SafeAreaView 
 } from 'react-native';

import { Text, View } from '../components/Themed';
import {useOvermind} from '../overmind';
import {gql, useMutation} from '@apollo/client';
import { useNavigation } from '@react-navigation/native';


const UPDATE_CLIENT = gql`
  mutation updateClient($id: Int!, $input: ClientInput!) {
  updateClient(id: $id , input: $input)
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

export default function EditClient() {
  const {state, actions} = useOvermind();
  
  const [ updateClient ] = useMutation(UPDATE_CLIENT);

  const [nombre, setNombre] = useState(state.client.firstName);
  const [apellido, setApellido] = useState(state.client.lastName);
  const [cedula, setCedula] = useState(state.client.cedula);
  const [email, setEmail] = useState(state.client.email);
  const [telefono, setTelefono] = useState(state.client.cellphone);
  const [direccion, setDireccion] = useState(state.client.address);
  const [errors, setErrors] = useState({});
  const [cargando, setCargando] = useState(false);
  const [errorSave, setErrorSave] = useState(false);
  const navigation = useNavigation();

  const validateNumero = (text: any) => {
    let textS = text.replace(/[^0-9]/g, '');
    setTelefono(textS);
    // setTelefono(text.replace('/[^0-9]/g', ''))
  }

  function validateEmail(email: any) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

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
    } else if (!email) {
      setErrors({
        email: '*El Email es requerido',
      });
    } else if (!validateEmail(email)) {
      setErrors({
        email: '*El Email no es valido',
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
      const { data } = await updateClient({
        variables:{
          id: state.client.id,
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
      setCargando(false);
      navigation.navigate('ListClient');
    } catch (error) {
      console.log('Error Guardando: ', error)
      setCargando(false);
      setErrorSave(true);
    }
    
  }

  // createClientFun();
  



  return (
    <SafeAreaView>
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Editar Usuario: </Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>{state.client.firstName } {state.client.lastName }</Text>
      <View>
      <View>
            <Text>Nombre:</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setNombre(text)}
                value={nombre}
            />
            {errors.nombre && <Text style={styles.textError}>{errors.nombre}</Text>}
            <Text>Apellido:</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setApellido(text)}
                value={apellido}
            />
            {errors.apellido && <Text style={styles.textError}>{errors.apellido}</Text>}
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
            {errors.email && <Text style={styles.textError}>{errors.email}</Text>}
            <Text>Telefono: (Solo Acepta Numeros)</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => validateNumero(text)}
                value={telefono}
                keyboardType='name-phone-pad'
            />
            <Text>Direccion:</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setDireccion(text)}
                value={direccion}
            />
            {errors.direccion && <Text style={styles.textError}>{errors.direccion}</Text>}

        </View>
      {errorSave && <Text
                      style={styles.textError}
                    >Error Guardando Cliente</Text>}
      {cargando ? <Text>Guardando ....</Text> : (
        <>
        <View
        style={{flexDirection: 'row'}}
        >
        <TouchableHighlight 
        onPress={ () => validacionFormulario()}
        >
        <View style={styles.button}>
          <Text>Editar</Text>
        </View>
      </TouchableHighlight>
            <TouchableHighlight 
            onPress={() => navigation.navigate('Root')} >
              <View style={styles.button}>
              <Text>Volver</Text>
              </View>
            </TouchableHighlight>
            </View>
            </>
      )
    }

      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginTop: 10,
    marginHorizontal: '6%'

  },
  textError: {
    color: 'red',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 6,
    marginTop: 60
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: '80%',
  },
});
