const { Schema, model, default: mongoose } = require('mongoose');

const SendSchema = Schema({

    userLogin:{
        type: String,
        require: true,
    },
    codeSend:{
        type: String,
        require: true,
        unique: true
    },
    description:{
        type: String,
        require:true
    },
    dateSend:{
        type: String,
        require:true
    },
    hourSend:{
        type: String,
        require:true
    },
    status:{
        type: String,
        require:true,
        enum:['ENVIADO', 'ENTREGADO', 'EN CAMINO', 'EN BODEGA']
    },
    large:{
        type: Number,
        require:true
    },
    width:{
        type: Number,
        require:true
    },
    height:{
        type: Number,
        require:true
    },
    weight:{
        type: Number,
        require:true
    },
    colletAddress:{
        type: String,
        require:true
    },
    colletCity:{
        type: String,
        require:true
    },
    idUserDelivery:{
        type: String,
        require:true
    },
    nameUserDelivery:{
        type: String,
        require:true
    },
    addressUserDelivery:{
        type: String,
        require:true
    },
    cityUserDelivery:{
        type: String,
        require:true
    }
},
{
    timestamps:true,
    versionKey:false,
});
module.exports = model('Send', SendSchema);
