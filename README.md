## Instalación

1.  Clona este repositorio en tu máquina local:
    
    ```bash
    git clone https://github.com/JairAlexey/CRUD_React-Node.js.git
    cd CRUD_React-Node.js
    ```
    
2.  Instala las dependencias para el backend:
    
    ```bash
    cd src
    npm install
    ```
    
3.  Configura la base de datos MongoDB. Asegúrate de tener una instancia local de MongoDB ejecutándose y actualiza la URI de conexión en el archivo `src/db.js` si es necesario:
    
    ```js
    mongoose.connect('mongodb://localhost/crudDB');
    ```
    
4.  Inicia el servidor backend:
    
    ```bash
    npm run dev
    ```
    
5.  Abre una nueva terminal y navega al directorio `client` para instalar las dependencias del frontend:
    
    ```bash
    cd client
    npm install
    ```
    
6.  Inicia el frontend:
    
    ```bash
    npm run dev
    ```
    
7.  Abre tu navegador en [http://localhost:5173](http://localhost:5173) para ver la aplicación en funcionamiento.

---

## Uso

### Registro e inicio de sesión

1.  Dirígete a la página de registro para crear una cuenta nueva.
2.  Después de registrarte, inicia sesión con las credenciales creadas.
3.  Al iniciar sesión, serás redirigido a la página de productos, donde podrás gestionar tus productos.

### Gestión de productos

- **Crear producto**: Navega a la página de "Añadir producto" y completa el formulario.
- **Editar producto**: Haz clic en un producto existente para editarlo.
- **Eliminar producto**: Los productos pueden eliminarse desde la vista de productos.

### Cerrar sesión

Puedes cerrar sesión en cualquier momento haciendo clic en el botón de "Cerrar sesión" en el menú de navegación.

---

## Próximos pasos

1.  **Despliegue en la nube**: Configurar el despliegue en un servicio como Heroku o Vercel.
2.  **Mejoras de UI/UX**: Estilizar mejor las páginas y hacerlas más responsivas.
3.  **Validación de datos**: Añadir validaciones de campos tanto en el frontend como en el backend.

---

## Contribuciones

Si deseas contribuir a este proyecto, realiza un fork del repositorio, crea una nueva rama con tus cambios y envía un pull request.

# CRUD de Productos con Autenticación - React y Node.js

Este es un proyecto de ejemplo de una aplicación **CRUD** de productos con autenticación de usuarios utilizando el stack **MERN** (MongoDB, Express, React, Node.js). Permite a los usuarios registrarse, iniciar sesión, gestionar productos (crear, ver, editar y eliminar), y cuenta con protección de rutas para restringir el acceso a ciertas páginas según el estado de autenticación.

## Funcionalidades

- **Registro e inicio de sesión de usuarios**: Los usuarios pueden crear una cuenta e iniciar sesión para acceder a sus productos.
- **Autenticación mediante JWT (JSON Web Tokens)**: Los tokens se almacenan en cookies seguras.
- **Gestión de productos**: Los usuarios autenticados pueden crear, editar y eliminar productos asociados a su cuenta.
- **Protección de rutas**: Solo los usuarios autenticados pueden acceder a las páginas de productos y perfil.
- **Interfaz de usuario con React**: Se utiliza React para la creación de componentes y gestión de rutas en el frontend.
- **Backend con Express y MongoDB**: El servidor se comunica con la base de datos MongoDB para almacenar y gestionar los datos de usuarios y productos.

## Tecnologías utilizadas

- **Frontend**:
  - React
  - React Router
  - Context API para la gestión de estado
  - Axios para realizar solicitudes HTTP
  - CSS para el estilo de la aplicación

- **Backend**:
  - Node.js
  - Express
  - MongoDB con Mongoose
  - JWT para autenticación
  - Bcrypt.js para encriptación de contraseñas
  - Morgan para logging de solicitudes HTTP
  - Cookie-parser para gestionar las cookies de autenticación

## Estructura del Proyecto

```bash
CRUD_React-Node.js/
├── client/               # Frontend con React
│   ├── src/
│   │   ├── App.jsx       # Definición de rutas y estructura principal
│   │   ├── pages/        # Páginas como Login, Signup, Home, Products
│   │   ├── context/      # Contextos de Autenticación y Productos
│   │   └── components/   # Componentes reutilizables
├── src/                  # Backend con Node.js y Express
│   ├── controllers/      # Controladores de productos y autenticación
│   ├── models/           # Modelos de usuario y producto (Mongoose)
│   ├── routes/           # Rutas para la API REST
│   ├── config.js         # Configuración del token JWT
│   ├── db.js             # Conexión a la base de datos MongoDB
│   └── app.js            # Configuración y middlewares de Express
└── README.md
```

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/JairAlexey/CRUD_React-Node.js.git
   cd CRUD_React-Node.js
   ```

2. Instala las dependencias para el backend:

   ```bash
   cd src
   npm install
   ```

3. Configura la base de datos MongoDB. Asegúrate de tener una instancia local de MongoDB ejecutándose y actualiza la URI de conexión en el archivo `src/db.js` si es necesario:

   ```js
   mongoose.connect('mongodb://localhost/crudDB');
   ```

4. Inicia el servidor backend:

   ```bash
   npm run dev
   ```

5. Abre una nueva terminal y navega al directorio `client` para instalar las dependencias del frontend:

   ```bash
   cd client
   npm install
   ```

6. Inicia el frontend:

   ```bash
   npm run dev
   ```

7. Abre tu navegador en [http://localhost:5173](http://localhost:5173) para ver la aplicación en funcionamiento.

## Uso

### Registro e inicio de sesión

1. Dirígete a la página de registro para crear una cuenta nueva.
2. Después de registrarte, inicia sesión con las credenciales creadas.
3. Al iniciar sesión, serás redirigido a la página de productos, donde podrás gestionar tus productos.

### Gestión de productos

- **Crear producto**: Navega a la página de "Añadir producto" y completa el formulario.
- **Editar producto**: Haz clic en un producto existente para editarlo.
- **Eliminar producto**: Los productos pueden eliminarse desde la vista de productos.

### Cerrar sesión

Puedes cerrar sesión en cualquier momento haciendo clic en el botón de "Cerrar sesión" en el menú de navegación.

## Próximos pasos

1. **Despliegue en la nube**: Configurar el despliegue en un servicio como Heroku o Vercel.
2. **Mejoras de UI/UX**: Estilizar mejor las páginas y hacerlas más responsivas.
3. **Validación de datos**: Añadir validaciones de campos tanto en el frontend como en el backend.

## Contribuciones

Si deseas contribuir a este proyecto, realiza un fork del repositorio, crea una nueva rama con tus cambios y envía un pull request.

