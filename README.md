# Mueblería Hermanos Jota

Proyecto desarrollado como parte de la formación Full Stack Developer de ITBA.

La aplicación implementa un e-commerce para la Mueblería Hermanos Jota utilizando una arquitectura cliente-servidor.

## Estructura del proyecto

El repositorio se encuentra organizado de la siguiente manera:

```text
/
├── entrega-1/     # Entrega correspondiente a los primeros sprints (1 y 2)
├── cliente/       # Aplicación frontend desarrollada con React
├── servidor/      # API desarrollada con Node.js y Express
└── README.md
```

## Arquitectura

El proyecto utiliza una arquitectura cliente-servidor.

El cliente, desarrollado con React, se encarga de la interfaz de usuario. El servidor, desarrollado con Node.js y Express, expone una API REST que proporciona los datos necesarios para la aplicación.

La comunicación entre ambas partes se realiza mediante solicitudes HTTP utilizando `fetch`. El cliente realiza peticiones a los endpoints de la API y el servidor responde con los datos correspondientes en formato JSON.

## Requisitos previos

Para ejecutar el proyecto es necesario tener instalado:

- Node.js
- npm

## Cliente

La aplicación cliente se encuentra dentro de `cliente/`.

### Instalación

Desde la raíz del proyecto:

```bash
cd cliente
npm install
```

### Ejecución

```bash
npm start
```

La aplicación React se iniciará por defecto en:

```text
http://localhost:3000
```

## Servidor

La aplicación backend se encuentra dentro de `servidor/`.

### Instalación

Desde la raíz del proyecto:

```bash
cd servidor
npm install
```

### Variables de entorno

Crear un archivo `.env` dentro de `servidor/` tomando como referencia el archivo `.env.example`.

Ejemplo:

```env
PORT=3001
```

El archivo `.env` no se encuentra versionado en el repositorio.

### Ejecución

```bash
npm start
```

El servidor se iniciará por defecto en:

```text
http://localhost:3001
```

El puerto puede configurarse mediante la variable de entorno `PORT`.

## API

### Healthcheck

Permite verificar que el servidor se encuentra funcionando correctamente.

```http
GET /api/healthcheck
```

Ejemplo:

```text
http://localhost:3001/api/healthcheck
```

Respuesta esperada:

```json
{
  "status": "OK",
  "success": true
}
```

### Productos

Permite obtener el listado completo de productos.

```http
GET /api/productos
```

Permite obtener un producto específico mediante su identificador.

```http
GET /api/productos/:id
```

## Tecnologías

### Frontend

- React
- JavaScript
- HTML
- CSS

### Backend

- Node.js
- Express
- CORS
- dotenv

## Decisiones técnicas

- Separación del frontend y backend en `cliente/` y `servidor/`, manteniendo independientes sus responsabilidades.
- Uso de React para el desarrollo de la interfaz de usuario.
- Uso de Node.js y Express para implementar la API REST.
- Uso de `fetch` para la comunicación entre el cliente y el servidor.
- Uso de CORS para permitir la comunicación entre ambas aplicaciones durante el desarrollo.
- Uso de variables de entorno para configurar el puerto del servidor.

## Integrantes

- Valentina Andrada Perino (Referente) - Usuario GitHub: valenap-utn
- Milagros Escarlon - Usuario GitHub: milagros888
- Agustín Alberto Leiva - Usuario GitHub: agustin-arg
- Dante Medici - Usuario GitHub: dantemedici
- Gerónimo Martín Córdoba - Usuario GitHub: gerocd