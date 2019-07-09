const SearchRecordsParameterCheck = function (startDate, endDate, minCount, maxCount, callback) {
       
    var payloadError = false;
    if (!startDate) {
        result = {
            "code": -11,
            "msg": "startDate field cannot be null!",
            "records": []
        };
        payloadError = true;
    }
    if (!endDate) {
        result = {
            "code": -12,
            "msg": "endDate field cannot be null!",
            "records": []
        };
        payloadError = true;
    }
    if (!minCount) {
        result = {
            "code": -13,
            "msg": "minCount field cannot be null!",
            "records": []
        };
        payloadError = true;
    }
    if (!maxCount) {
        result = {
            "code": -14,
            "msg": "maxCount field cannot be null!",
            "records": []
        };
        payloadError = true;
    }

    callback(payloadError);
}

module.exports = {
    SearchRecordsParameterCheck: SearchRecordsParameterCheck
}