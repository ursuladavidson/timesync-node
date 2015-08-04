// delete endpoints

var app = require('./app');
var knex = app.get('knex');

module.exports = {
    deleteTime: function(timeid) {
        return new Promise(function(resolve, reject) {
            knex('times').where('id', timeid).del().then(function (res) {
                //console.log('here');
                //console.log(res.statusCode);
                return resolve(res.statusCode);
            }).catch(function(err) {
                return reject(err);
            });
        });
    }
}; 
