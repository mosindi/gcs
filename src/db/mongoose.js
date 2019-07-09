const mongoose = require('mongoose');

const connectionURL = 'mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study';

mongoose.connect(connectionURL,{
    useNewUrlParser:true,
    useCreateIndex:true,
})

