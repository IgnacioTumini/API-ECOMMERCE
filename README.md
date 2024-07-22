# E-commerce API

## Descripción

Esta es una API de comercio electrónico construida con NestJS y TypeORM. Proporciona funcionalidades para la gestión de usuarios, productos, pedidos y más.

## Tecnologías Utilizadas

- **NestJS**: Framework para aplicaciones de servidor Node.js.
- **TypeORM**: ORM para TypeScript y JavaScript.
- **PostgreSQL**: Sistema de gestión de bases de datos.
- **JWT**: Autenticación basada en tokens JSON Web Tokens.
- **Swagger**: Documentación de API.
- **Cloudinary**: Almacenamiento y manipulación de imágenes.
- **Jest**: Framework de pruebas en JavaScript.

## Requisitos Previos

- Node.js (v14 o superior)
- PostgreSQL (v12 o superior)
- npm o yarn

## Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/nombre-del-repositorio.git
   cd nombre-del-repositorio
   ```

2. **Comandos**

- Instalar dependecias
  ```bash
    npm install
  ```
- Configurar la base de datos en el archivo `.env`:

  ```bash
    DB_HOST=example
    DB_PORT=example
    DB_USERNAME=example
    DB_PASSWORD=example
    DB_NAME=example
    CLOUDINARY_NAME=example
    CLOUDINARY_KEY=example
    CLOUDINARY_SECRET=example
    JWT_SECRET=example
  ```

- Iniciar el Servidor

  ```bash
    npm run start:dev
  ```

## Developer

- Ignacio Tumini
