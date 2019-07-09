const path = require('path');
const express = require('express');
require('./db/mongoose');
const Record = require('./models/record');
const mongodb = require('./db/mongodb');
const helper = require('./utils/helper')

const app = express();
const port = process.env.port || 3000;

app.use(express.json());

app.set('view engine', 'hbs');

app.post('/records', (req, res) => {
    console.log(req.body);
    helper.SearchRecordsParameterCheck(req.body.startDate, req.body.endDate, req.body.minCount,req.body.maxCount, (payloadError) => {
        if (payloadError) {
            res.send(result);
        } else {
            mongodb.SearchRecords(req.body.startDate, req.body.endDate, req.body.minCount,req.body.maxCount, (error, output) => {
                var result = {};
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