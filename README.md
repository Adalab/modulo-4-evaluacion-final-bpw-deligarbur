# Digital Educational Resources on Astronomy (DEROA) API

## Descripción del Proyecto

![DEROA]()

Este proyecto es una API REST de Recursos Educativos sobre Astronomía, desarrollado en javascript utilizando Node.JS, Express.JS y MySQL como base de datos.


## Funcionalidades

La API permite realizar las siguientes operaciones:

- **Listar todos los registros existentes.**
- **Insertar un nuevo registro.**
- **Leer registros filtrando por id.**
- **Actualizar los datos de un registro existente.**
- **Eliminar un registro existente.**

### Autenticación

Se ha implementado un sistema de autenticación con JWT con las siguientes funcionalidades:

- Registro de usuario con campos: email, nombre, dirección y contraseña.
- Login del usuario registrado.
- Autenticación del usuario y acceso a su perfil privado de datos personales.

## Uso de la API

Para utilizar la API en un proyecto, se pueden seguir los siguientes pasos:

1. Clonar el repositorio desde GitHub.
2. Instalar las dependencias con npm install.
3. Configurar la conexión a la base de datos en el archivo config.js.
4. Ejecutar el servidor con node server.js.

### Documentación

La API se puede consumir a través de las siguientes rutas:

- **GET /resources:** Obtiene todos los registros de recursos educativos.
- **POST /resources:** Inserta un nuevo recurso educativo.
- **GET /resources/:id:** Obtiene un recurso educativo por su id.
- **PUT /resources/:id:** Actualiza un recurso educativo existente.
- **DELETE /resources/:id:** Elimina un recurso educativo existente.

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


## Tecnologías Utilizadas

- **JavaScript**
- **Backend:** Node.JS
- **Servidor:** Express JS
- **Base de datos:** MySQL

## Contribuciones

Si deseas contribuir al proyecto, puedes enviar un pull request con tus mejoras. ¡Gracias por tu interés en Digital Educational Resources on Astronomy (DEROA) API!