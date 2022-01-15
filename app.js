//importamos las variables de entorno 
require('dotenv').config();
const Server = require('./models/server');

// instaciamos el servidor 
const server = new Server();


server.listen();

