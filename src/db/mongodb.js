const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

//const connectionURL = 'mongodb://127.0.0.1:27017'
const connectionURL = 'mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study';

const databaseName = 'getir-case-study';


const SearchRecords = function (startDate, endDate, minCount, MaxCount,callback) {

    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            return console.log("Connection has error", error);
        }
        const db = client.db(databaseName);

        db.collection('records').find({ createdAt: { $gte: new Date(startDate), $lt: new Date(endDate) } }).toArray(function (error, data) {
            if (error) {
                callback(error, undefined);
            }

            var records = data.filter(d => d.counts.reduce((a, b) => a + b, 0) > minCount && d.counts.reduce((a, b) => a + b, 0) < MaxCount)
            var output = [];

            records.forEach((record) => {
                output.push({
                    key: record.key,
                    createdAt: record.createdAt,
                    totalCount: record.counts.reduce((a, b) => a + b, 0)
                })
            })
            console.log(output);
            callback(undefined, output);
        });
    })
}

module.exports = {
    SearchRecords: SearchRecords
}
