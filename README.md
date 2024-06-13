# Digital Educational Resources on Astronomy (DEROA) API :rocket: :telescope: :ringed_planet: 

## Descripción del Proyecto

<img width="1000" alt="deroa" src="https://github.com/Adalab/modulo-4-evaluacion-final-bpw-deligarbur/blob/master/assets/DEROA.png">

Este proyecto es una API REST de Recursos Educativos sobre Astronomía, desarrollado en javascript utilizando Node.JS, Express.JS y MySQL como base de datos.

## Funcionalidades :gear: 

La API permite realizar las siguientes operaciones:

- **Listar todos los registros existentes.**
- **Insertar un nuevo registro.**
- **Leer registros filtrando por id.**
- **Actualizar los datos de un registro existente.**
- **Eliminar un registro existente.**

### Autenticación :lock: 

Se ha implementado un sistema de autenticación con JWT con las siguientes funcionalidades:

- Registro de usuario rellenando los campos: email, nombre, dirección y contraseña.
- Login del usuario registrado.
- Autenticación del usuario y acceso a su perfil privado de datos personales.

## Uso de la API :gear: 

Para utilizar la API en un proyecto, se pueden seguir los siguientes pasos:

1. Clonar el repositorio desde GitHub.
2. Instalar las dependencias necesarias (express, cors, mysql2, dotenv, jsonwebtoken, bcrypt).
3. Configurar la conexión a la base de datosy crea un archivo `.env` en la raíz del proyecto con la siguiente configuración:
    ```env
    DB_HOST=tu_host_de_base_de_datos
    DB_USER=tu_usuario_de_base_de_datos
    DB_PASSWORD=tu_contraseña_de_base_de_datos
    DB_NAME=nombre_de_tu_base_de_datos
    PORT=4000
    ```
4. Ejecutar el servidor con node.

### Documentación :page_facing_up: 

La API se puede consumir a través de las siguientes rutas:

- **GET <code>/deroa/resources</code>:** Obtiene todos los registros de recursos educativos.
- **GET <code>/deroa/resources/:id</code>:** Obtiene un recurso educativo por su id.
- **POST <code>/deroa/resources</code>:** Inserta un nuevo recurso educativo.
- **PUT <code>/deroa/resources/:id</code>:** Actualiza un recurso educativo existente.
- **DELETE <code>/deroa/resources/:id</code>:** Elimina un recurso educativo existente.

### Ejemplo de solicitud POST

```json
  {
    "title": "El sistema solar",
    "url_resource": "https://www.muyinteresante.es/ciencia/el-sistema-solar",
    "description": "Descubre datos curiosos sobre los planetas y el sol en nuestro sistema solar",
    "level": "Intermedio",
    "name_author": "Muy Interesante",
    "url_author": "https://www.muyinteresante.es"
  }
```


## Tecnologías Utilizadas :computer:

- **JavaScript**
- **Backend:** Node.JS
- **Servidor:** Express JS
- **Base de datos:** MySQL

## En desarrollo :soon:

- Subir el servidor de la API a algún servicio como Render para que esté disponible en Internet.
- Desarrollo de alicación Frontend que permita consultar alguno de los endpoint del API.
- Librería Swagger.

## Contribuciones :bulb: 

Si deseas contribuir al proyecto, puedes enviar un pull request con tus mejoras. ¡Gracias por tu interés en Digital Educational Resources on Astronomy (DEROA) API! :star2: 
<p align="center">
  <img align="center" width="300" alt="telescope" src="https://github.com/Adalab/modulo-4-evaluacion-final-bpw-deligarbur/blob/master/assets/telescope.png">
</p>
