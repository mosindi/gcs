const mongoose = require('mongoose');

const Record = mongoose.model('record',{
    key:{
        type:String
    },
    // value :{
    //     type : String
    // },
    createdAt :{
        type : Date,
    },
    Counts :{
        type:Array
    },
   
});

module.exports = Record;