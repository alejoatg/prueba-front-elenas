# Prueba Desarrollador Front End - Elenas

###### Jorge Alejandro Astudillo Gutierrez

##### Aplicación Cliente de la API https://elenas-tmp-statechart-backend.herokuapp.com/gql/

Expo v3.28.1

Typescript

Apollo/client v3.2.5

GraphQL v15.3.0

Overmind v25.0.2

#### Funcionalidades:

- Listar todos los clientes (Tab 1 – Listado Clientes):

  - Consulta un listado de todos los clientes registrados, usando el query clientsSearch.
  - Despliega el resultado en una lista, al hacer clic en un Ítem dirige a la edición del cliente seleccionado (Guarda el cliente en el State - Overmind).
  - Muestra mensaje si ocurre error al consultar la Api.

- Agregar un Cliente (Tab 2 – Crear Cliente):

  - Permite agregar un nuevo cliente, usando el mutation createClient.
  - Valida los campos obligatorios: Nombre - Apellido - Dirección - Email. Comprueba Email valido, teléfono solo acepta números, muestra mensajes de error en campo
  - Muestra mensaje si ocurre error al registrar  cliente en Back

- Editar un Cliente:
  - Permite editar un cliente seleccionado desde la Lista de clientes, usando el mutation updateClient
  - Carga la información inicial del cliente mediante el State usando Overmind (client)
  - Valida los campos obligatorios: Nombre - Apellido - Dirección - Email. Comprueba Email valido, teléfono solo acepta números, muestra mensajes de error en campo
  - Muestra mensaje si ocurre error al editar cliente en Back

Utiliza un token generado con los datos de login (Asignado en la configuración del Apollo):

cellphone:"+573057199995"

password:"nueva123"

Ejecutar para desplegar:

```
npm install
```

```
expo start
```
