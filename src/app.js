const path = require('path');
const express = require('express');
require('./db/mongoose');
const Record = require('./models/record');      //Record model for using mongoose
const mongodb = require('./db/mongodb');        //MongoDb class for db operations
const helper = require('./utils/helper')        // Helper class to store functions to re-useful 

const app = express();      // initilaze the express framework
const port = process.env.PORT || 3000;

app.use(express.json());

app.set('view engine', 'hbs');  //using Express.js view engine for handlebars.js to produce api pages

app.get('',(req,res)=>{
    res.render('index')
})

// endpoint to get records with search criterias
app.post('/records', (req, res) => {

    helper.SearchRecordsParameterCheck(req.body.startDate, req.body.endDate, req.body.minCount, req.body.maxCount, (payloadError) => {
        // SearchRecordsParameter control the all of parameters exists. The method use also for business logic
        if (payloadError) {
            res.send(result);  // if payload paramaters have error return as result error.
        } else {
            mongodb.SearchRecords(req.body.startDate, req.body.endDate, req.body.minCount, req.body.maxCount, (error, output) => {
                 //Mongo DB method to search and get records
                
                if (error) {
                    res.status(200).send({
                        "code": -1,
                        "msg": error,
                        "records": []
                    })
                    res.status(500).send(result);
                } else {
                    res.status(200).send({
                        "code": 0,
                        "msg": "Success",
                        "records": output
                    })
                }
            });
        }
    })



})


app.listen(port, () => {
    console.log('Server is ıp on port ' + port);
})

module.exports = app;