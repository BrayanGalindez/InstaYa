const  { Schema, model } = require('mongoose')

const  UserSchema = Schema({
    
    identification:{
        type: String,
        require: true,
        unique:true
    },
    name:{
        type: String,
        require: true,
    },
    lastname:{
        type:String,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    city:{
        type:String,
        require: true
    },
    username:{
        type:String,
        require: true,
        unique: true
    },
    email:{
        type:String,
        require: true,
        unique: true,
    },
    password:{
        type:String,
        require: true        
    },
    role:{
        type: String,
        require: true,
        enum:['ADMIN', 'USER']
    }
},
{
    timestamps:true,
    versionKey:false
}
)
module.exports = model('User', UserSchema);