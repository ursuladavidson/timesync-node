var app = require('./app');
var knex = app.get('knex');

module.exports = {
    checkProject: function(slug) {
        console.log('src/helpers.js')
        // Bluebird promises take a resolve and a reject
        // essentially, when the data you want is done resolving.
        // pass it to resolve(). If an error occurs, pass it to
        // reject().
        return new Promise(function(resolver, reject) {
            // get project from database
            knex('projectslugs').select('project')
            .where('name', slug).then(function(project) {
                if (project.length === 0) {
                    // project doesn't exist -- it could be null, undefined,
                    // invalid, etc.
                    reject(slug);
                } else {
                    resolver(project[0].project);
                }
            }).catch(function(err) { reject(err); });
        });
    }
};
