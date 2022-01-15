// creo el restserver
const express = require('express');
const cors = require('cors');


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios';
        // Middleware - funciones que agrega otra funcionalidad a mis funciones a mi Webserver
        this.middleware();
        // Rutas de mi aplicacion 
        this.routes();
    }

    middleware(){

        // CORS
        this.app.use( cors() );

        //Parseo y lectura del body
        // Configuracion de midleware para recibir uun json javascrict objed notetion
        this.app.use( express.json());


        // Directorio Publico 
        this.app.use( express.static('public'));
    }

    routes(){
        this.app.use(this.usuarioPath, require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;