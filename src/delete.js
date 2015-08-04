// delete endpoints

var app = require('./app');
var knex = app.get('knex');

module.exports = {
    deleteActivity: function(activity) {
        return new Promise(function(resolve, reject) {
            knex('activities').where('name', activity).del()
            .then(function(res) {
                //console.log('here');
                return resolve(res.statusCode);
            }).catch(function(err) {
                return reject(err);
            });
        });
    },

    deleteActivitySlug: function(slug) {
        return new Promise(function(resolve, reject) {
            knex('activities').where('slug', slug).del().then(function(res) {
                //console.log(slug);
                return resolve(res.statusCode);
            }).catch(function(err) {
                return reject(err);
            });
        });
    }
};
