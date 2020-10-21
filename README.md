# Prueba Desarrollador Front End - Elenas
###### Jorge Alejandro Astudillo Gutierrez

##### Aplicacion Cliente de la API https://elenas-tmp-statechart-backend.herokuapp.com/gql/

Expo v3.28.1

Typescript

Apollo/client v3.2.5

GraphQL v15.3.0

Overmind v25.0.2


#### Funcionalidades:
* Listar todos los clientes (Tab 1): 
  * Consulta un listado de todos los clientes registrados, usando el query clientsSearch
  * Despliega el resultado en una Lista, Al hacer clic en un Item dirige a la edicion del cliente seleccionado (Guarda el cliente en el State - Overmind)
  * Muestra mensaje si ocurre error al consultar la Api
 
* Agregar un Cliente (Tab 2):
  * Permite agregar un nuevo cliente, usando el mutation createClient
  * Valida los campos obligatorios: Nombre - Apellido - Direccion, muestra mensajes de error
  * Muestra mensaje si ocurre error al registar cliente en Back
 
* Editar un Cliente:
  * Permite editar un cliente seleccionado desde la Lista de clientes, usando el mutation updateClient
  * Carga la informacion inicial del cliente mediante el State usando Overmind (client)
  * Muestra mensaje si ocurre error al editar cliente en Back

Utiliza un token generado con los datos de login (Asignado en la configuracion del Apollo):

cellphone:"+573057199995"

password:"nueva123"

Ejecutar: 

```
npm install
```




