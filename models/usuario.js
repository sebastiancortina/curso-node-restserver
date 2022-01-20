const { Schema, model } = require('mongoose');

// Definimos los objetos que seran almacenados en la base de datos
const UsuarioSchema = Schema ({
    nombre: {
        type: String,
        require: [ true, 'El nombre es obligatorio']
    }, 
    correo: {
        type: String, 
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String, 
        required: [true, 'El contraseña es obligatorio'],
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default:false
    }

});

// Sobreescribimos el metodo toJSON 
UsuarioSchema.methods.toJSON = function(){
    const {__v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
} 

// exportamos el nombre de la colecion y el esquema con la funcion del model
module.exports = model('Usuarios', UsuarioSchema);