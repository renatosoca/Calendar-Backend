# Para correr el proyecto
  npm install
  npm run dev | npm start

## Variables de entorno
  Crear un archivo .env en la raiz del proyecto con las siguientes variables:
  - MONGO_URI: Url de la base de datos
  - KEY_SECRET_JWT: Clave secreta para Json Web Token
  - EMAIL_HOST: Host del servidor de correo
  - EMAIL_PORT: Puerto del servidor de correo
  - EMAIL_USER: Usuario del servidor de correo
  - EMAIL_PASS: Contraseña del servidor de correo

  - PORT: Puerto del servidor (de preferencia 4000)
  - FRONT_URI: Url del frontend (para el cors)

## Rutas del proyecto establecidas
  Rutas Publicas:
  - http://localhost:4000/api/auth/login    Metodo: POST  
  - http://localhost:4000/api/auth/register Metodo: POST
  - http://localhost:4000/api/auth/confirm/:token   Metodo: GET (Confirmar el email)
  - http://localhost:4000/api/auth/forgot-password  Metodo: POST  (Enviar email para recuperar contraseña)
  - http://localhost:4000/api/auth/reset/:token    Metodo: GET && POST  (Cambiar contraseña)

  Rutas Privadas:
  - http://localhost:4000/api/event   Metodo: GET && POST (Solo para usuarios registrados) (Obtener los eventos segun el usuario && y crear un nuevo evento)
  - http://localhost:4000/api/event/:id   Metodo: PUT && DELETE  (Solo para usuarios registrados) (Actualizar un evento && Eliminar un evento)