<h1 align="center">ParcoApp API V1 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> Desafio ParcoApp

## Install

```sh
npm install
```

## Usage

La distribucion de los ficheros quedo de la siguiente manera:

ParcoApp/
 |_index.js
 |_config/
 |      |_config.js
 |_db/
 |      |_config.js
 |_dto/
 |      |_user.dto.js
 |_middlewares/
 |      |_auth.handler.js
 |      |_error.handler.js
 |      |_validator.handler.js
 |_routes/
 |      |_ index.js
 |      |_ parking.router.js
 |      |_ report.router.js
 |      |_ user.router.js
 |_schemas/
 |      |_ transactions.schema.js
 |      |_ user.schema.js
 |_services/
 |      |_ parking.services.js
 |      |_ user.services.js
 |_utils/
 |      |_ auth/
 |      |_ index.js
 |      |      |_strategies/
 |      |      |        |_ jwt.strategies.js
 |      |      |        |_ local.strategies.js
 |      |_ exportCSV/
 |      |      |_export.csv.js
 |_____________________________________________

Las tecnologias ocupadas son:
-> Node.js
-> Express.js
-> MongoDB 
-> Joi
-> Passport
-> Jwt

## Endpoints

Originalmente la solicitud fue de 8 endpoints, pero se agrego uno mas para observar el listado general de usuarios.

Primer Endpoint
            1)  Endpoint para registrar nuevos usuarios. 
                URL: https://parco-api-test.herokuapp.com/api/v1/user/new
                Método: POST
                Parámetros: nombre, teléfono, correo, contraseña
                Respuesta: Todo el nuevo registro creado (id, nombre, teléfono, correo, contraseña, fecha de creación, saldo disponible)
                Autenticacion: No es necesario un Token

      ```sh
        Body:
        {
          "nombre": "Enrique Perez",
          "telefono": "9211504047",
          "correo": "enrique@gmail.com",
          "contrasena": "12345678"
        }
      ```

      ```sh
        respuesta:
        {
          "nombre": "Enrique Perez",
          "telefono": "9211504047",
          "correo": "enrique@gmail.com",
          "contrasena": "$2b$10$3vXWS0t2x1WJGh5LWi.PkeJDbzuwPS9kRjlQMk8w8i0SIM1vflcZ.",
          "saldo_disponible": 0,
          "role": "user",
          "accessToken": "0",
          "_id": "618acf2a936576f24b33ba8a",
          "fecha_creacion": "2021-11-09T19:42:34.009Z",
          "__v": 0
        }
      ```

Segundo Endpoint
            2) Endpoint para logear al usuario.
                URL: https://parco-api-test.herokuapp.com/api/v1/user/login
                Método: POST
                Parámetros: correo, contraseña
                Respuesta: {
                    "accessToken": "3Gc60QmoQO0IqWnCH7Jh2O3kFjREjHDDshfcn4i0076GBwhja2TV17MDjyMIyKMD" (token de acceso generado, debe almacenarse en la base de datos)
                }

      ```sh
        Body:
        {
          "correo": "enrique@gmail.com",
          "contrasena": "12345678"
        }
      ```

      ```sh
        Respuesta:
        {
          "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MThhY2YyYTkzNjU3NmYyNGIzM2JhOGEiLCJyb2xlIjoidXNlciIsImlhdCI6MTYzNjQ4Njk4MH0.BAie8C4YthX2trVLOz-ME2KuWO8J0ZnKRq-DYS_ryLQ"
        }
      ```

Tercer Endpoint
            3) Endpoint para modificar los datos del usuarios.
                URL:http://localhost:3000/api/v1/user/618acf2a936576f24b33ba8a?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MThhY2YyYTkzNjU3NmYyNGIzM2JhOGEiLCJyb2xlIjoidXNlciIsImlhdCI6MTYzNjQ4Njk4MH0.BAie8C4YthX2trVLOz-ME2KuWO8J0ZnKRq-DYS_ryLQ
                Método: PATCH
                Parámetros: Los que deseen modificarse (en el caso de la contraseña, debe encriptarse nuevamente antes de sobreescribirse)
                Respuesta: Todo el registro actualizado (id, nombre, teléfono, correo, contraseña, fecha de creación, saldo disponible)

      ```sh
        Cualquier campo se actualiza, en caso de la contraseña, se vuelve a encriptar
        Body:
        {
          "contrasena": "123456789"
        }
      ```

      ```sh
        Respuesta:
        {
          "_id": "618acf2a936576f24b33ba8a",
          "nombre": "Enrique Perez Perez",
          "telefono": "9211345679",
          "correo": "enrique@gmail.com",
          "contrasena": "$2b$10$3vXWS0t2x1WJGh5LWi.PkeJDbzuwPS9kRjlQMk8w8i0SIM1vflcZ.",
          "saldo_disponible": 15,
          "role": "user",
          "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MThhY2YyYTkzNjU3NmYyNGIzM2JhOGEiLCJyb2xlIjoidXNlciIsImlhdCI6MTYzNjQ4Njk4MH0.BAie8C4YthX2trVLOz-ME2KuWO8J0ZnKRq-DYS_ryLQ",
          "fecha_creacion": "2021-11-09T19:42:34.009Z",
          "__v": 0
        }
      ```

Cuarto Endpoint 
            4) Endpoint para abonar saldo a usuario
                URL: http://localhost:3000/api/v1/user/addCredit/618acf2a936576f24b33ba8a?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MThhY2YyYTkzNjU3NmYyNGIzM2JhOGEiLCJyb2xlIjoidXNlciIsImlhdCI6MTYzNjQ4Njk4MH0.BAie8C4YthX2trVLOz-ME2KuWO8J0ZnKRq-DYS_ryLQ
                Método: POST
                Parámetros: id de usuario, monto a abonar
                Respuesta: Todo el registro actualizado (id, nombre, teléfono, correo, contraseña, fecha de creación, saldo disponible)

      ```sh
        Params:
        {
         "id_usuario": "618acf2a936576f24b33ba8a"
        }
        Body:
        {
          "saldo_disponible": 100
        }
      ```

      ```sh
        Respuesta:
        {
          "_id": "618acf2a936576f24b33ba8a",
          "nombre": "Enrique Perez Perez",
          "telefono": "9211345679",
          "correo": "enrique@gmail.com",
          "contrasena": "$2b$10$3vXWS0t2x1WJGh5LWi.PkeJDbzuwPS9kRjlQMk8w8i0SIM1vflcZ.",
          "saldo_disponible": 290,
          "role": "user",
          "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MThhY2YyYTkzNjU3NmYyNGIzM2JhOGEiLCJyb2xlIjoidXNlciIsImlhdCI6MTYzNjQ4Njk4MH0.BAie8C4YthX2trVLOz-ME2KuWO8J0ZnKRq-DYS_ryLQ",
          "fecha_creacion": "2021-11-09T19:42:34.009Z",
          "__v": 0
        }
      ```
Quinto Endpoint
            5) Endpoint para consultar la lista de estacionamientos.
                URL: https://parco-api-test.herokuapp.com/api/v1/parking?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MThhY2UwZjkzNjU3NmYyNGIzM2JhODUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzY0ODY4MTJ9.VqvK5nEivgiODuclbzfF8l3O5PkicSU-dvmqwtSDYn0
                Método: GET
                Parámetros: Ninguno
                Respuesta: Lista de estacionamientos obtenida desde URL

Sexto Endpoint
            6) Endpoint para realizar pagos de estacionamientos.
                URL: https://parco-api-test.herokuapp.com/api/v1/parking/pay?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MThhY2YyYTkzNjU3NmYyNGIzM2JhOGEiLCJyb2xlIjoidXNlciIsImlhdCI6MTYzNjQ4Njk4MH0.BAie8C4YthX2trVLOz-ME2KuWO8J0ZnKRq-DYS_ryLQ
                Método: POST
                Parámetros: id de usuario, total, id de estacionamiento, boleto
                Respuesta: Todo el nuevo registro creado (id, total, boleto, fecha de creación, id de usuario, id de estacionamiento)


      ```sh
        Body:
       {
          "id_usuario": "618acf2a936576f24b33ba8a",
          "total": 25,
          "id_estacionamiento": "59272181d1590b4938812c97" ,
          "boleto": "00004"
        }
      ```

      ```sh
        Respuesta:
       {
          "total": 25,
          "boleto": "00004",
          "id_usuario": "618acf2a936576f24b33ba8a",
          "id_estacionamiento": "59272181d1590b4938812c97",
          "_id": "618ae0a8f95758ce0cf260ba",
          "fecha_creacion": "2021-11-09T20:57:12.081Z",
          "__v": 0
        }
      ```
Septimo Endpoint
            7) Endpoint para ver las transacciones filtradas por id de usuario.
                URL: https://parco-api-test.herokuapp.com/api/v1/parking/transactions?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MThhY2UwZjkzNjU3NmYyNGIzM2JhODUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzY0ODY4MTJ9.VqvK5nEivgiODuclbzfF8l3O5PkicSU-dvmqwtSDYn0
                Método: GET
                Parámetros: Id de usuario
                Respuesta: Array con todas las transacciones del usuario


      ```sh
        Body:
        {
          "id_usuario": "618acf2a936576f24b33ba8a"
        }   
      ```

      ```sh
        Respuesta:
        [
          {
            "_id": "618ad04a936576f24b33ba94",
            "total": 20,
            "boleto": "00001",
            "id_usuario": "618acf2a936576f24b33ba8a",
            "id_estacionamiento": "59272181d1590b4938812c97",
            "fecha_creacion": "2021-11-09T19:47:22.922Z",
            "__v": 0
          },
          {
            "_id": "618ade4ef95758ce0cf260a3",
            "total": 15,
            "boleto": "00002",
            "id_usuario": "618acf2a936576f24b33ba8a",
            "id_estacionamiento": "59272181d1590b4938812c97",
            "fecha_creacion": "2021-11-09T20:47:10.674Z",
            "__v": 0
          },
          {
            "_id": "618ade5ef95758ce0cf260a7",
            "total": 25,
            "boleto": "00002",
            "id_usuario": "618acf2a936576f24b33ba8a",
            "id_estacionamiento": "59272181d1590b4938812c97",
            "fecha_creacion": "2021-11-09T20:47:26.358Z",
            "__v": 0
          },
          {
            "_id": "618ade69f95758ce0cf260ab",
            "total": 25,
            "boleto": "00003",
            "id_usuario": "618acf2a936576f24b33ba8a",
            "id_estacionamiento": "59272181d1590b4938812c97",
            "fecha_creacion": "2021-11-09T20:47:37.287Z",
            "__v": 0
          },
          {
            "_id": "618ae0a8f95758ce0cf260ba",
            "total": 25,
            "boleto": "00004",
            "id_usuario": "618acf2a936576f24b33ba8a",
            "id_estacionamiento": "59272181d1590b4938812c97",
            "fecha_creacion": "2021-11-09T20:57:12.081Z",
            "__v": 0
          }
        ] 
      ```
Octavo Endpoint 
                8) Endpoint para generar reporte de transacciones entre dos fechas o por estacionamiento y entre dos fechas en formato .csv
                URL: https://parco-api-test.herokuapp.com/api/v1/report?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTg4OTI2NDkyZGVhOGQ5MDQwYjgxYjciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzY0MTE0NTd9.TLUbCqg0kaVBKgxMSGA1aTPGgudd5bm5Prga5l9aa1Y
                Método: GET
                Parámetros: fecha inicial, fecha final, id de estacionamiento (opcional)
                Respuesta: un archivo .csv con la información de las transacciones.

      ```sh
        Body:
        {
          "fecha_inicial": "2021-11-09",
          "fecha_final": "2021-11-10"
        }  

        ó

        {
          "fecha_inicial": "2021-11-09",
          "fecha_final": "2021-11-10",
          "id_estacionamiento": ""
        } 
      ```

      ```sh
        Respuesta reporte CSV
      ```

Noveno Endpoint EXTRA
            9) Endpoint para consultar usuarios por un administrador autenticado
                URL: https://parco-api-test.herokuapp.com/api/v1/report/users?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MThhY2UwZjkzNjU3NmYyNGIzM2JhODUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzY0ODY4MTJ9.VqvK5nEivgiODuclbzfF8l3O5PkicSU-dvmqwtSDYn0
                Método: GET
                Parámetros: Ninguno
                Respuesta: Array con el listado de los usuarios.

      ```sh
        Respuesta:
        [
          {
            "_id": "618ab4a4d298927770742335",
            "nombre": "Majo Perez",
            "telefono": "9211504047",
            "correo": "majo@gmail.com",
            "contrasena": "$2b$10$x3Mrk0Ebn00yTLpsVNBHTOC5J82.yNMBXvM3J/5j4Eax4BcRgF3c6",
            "saldo_disponible": 200,
            "role": "user",
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MThhYjRhNGQyOTg5Mjc3NzA3NDIzMzUiLCJyb2xlIjoidXNlciIsImlhdCI6MTYzNjQ4MDIxMX0.wsSFOEsEULu1hG62WPRl0ETLLprdsTwaJxCVCblYdV4",
            "fecha_creacion": "2021-11-09T17:49:24.363Z",
            "__v": 0
          },
          {
            "_id": "618acf2a936576f24b33ba8a",
            "nombre": "Enrique Perez Perez",
            "telefono": "9211345679",
            "correo": "enrique@gmail.com",
            "contrasena": "$2b$10$3vXWS0t2x1WJGh5LWi.PkeJDbzuwPS9kRjlQMk8w8i0SIM1vflcZ.",
            "saldo_disponible": 290,
            "role": "user",
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MThhY2YyYTkzNjU3NmYyNGIzM2JhOGEiLCJyb2xlIjoidXNlciIsImlhdCI6MTYzNjQ4Njk4MH0.BAie8C4YthX2trVLOz-ME2KuWO8J0ZnKRq-DYS_ryLQ",
            "fecha_creacion": "2021-11-09T19:42:34.009Z",
            "__v": 0
          }
        ]
      ```


## Deployment

Se desplega la API en Heroku en un staging para poder testear mejor cada uno de los endpoints.
La base de datos se encuentra alojada en MongoDB Atlas, como provedor Cloud se utiliza AWS

Dentro de la configuracion de produccion se colocan las variables de entorno el JWT_SECRET que se utiliza para parsear los Tokens de los usuarios.

Notas: 
- se puede elegir cualquier valor para JWT_SECRET
- Se puede utilizar una base de datos Local de MongoDB para el entorno de desarrollo

## Author

👤 **Carlos**

* Github: [@Carlos](https://github.com/CarlosPerezA)


***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
