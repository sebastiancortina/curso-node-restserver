// creo el restserver
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileupload = require('express-fileupload');
const morgan = require('morgan');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;

        // rutas 
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuario: '/api/usuarios',
            uploads: '/api/uploads'
        }

        // Permite visualizar las peticiones que estan llegando desde el navegador -con formateado de  texto 
        this.app.use(morgan('dev'));

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

        // Fileupload - Carga de archivos 
        this.app.use(fileupload({
            toUpperCase: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.usuario, require('../routes/user'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
        
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;