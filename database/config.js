// importamos los paquetes para la conexion con la base de datos 
const mongoose = require('mongoose');

//Conexion con la base de datos 
const dbConnection = async() => {
    
    try{
        //Se establese la conexion 
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });

        console.log('Base de datos onLine');

    }catch(error){
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }

}

module.exports = {
    dbConnection
}