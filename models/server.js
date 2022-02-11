// creo el restserver
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        // rutas 
        this.paths = {
            auth: '/api/auth',
            usuario: '/api/usuarios',
            categorias: '/api/categorias'
        }

        // Conectar a la base de datos
        this.conectarDB();

        // Middleware - funciones que agrega otra funcionalidad a mis funciones a mi Webserver
        this.middleware();
        
        // Rutas de mi aplicacion 
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
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
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuario, require('../routes/user'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;