var app = require('./app');
var knex = app.get('knex');
var errors = require('./errors');

module.exports = {

    //Get all slugs, compare given slug to them
    checkActivities: function(names) {
        //name = null;
        //var slugs = knex('activityslugs').select('*');

        var valid = 0;
        for (let i = 0; i < names.length - 1; i++){
            knex('activityslugs').where({name:names[i]}).select(['name']).then(function(slug){
               console.log('Slug: ' + slug[0].name + ' Name: ' + names[i]);
               if (names[i] === slug[0].name){
                   valid += 1;
                   console.log('Valid slug found for ' + slug);
               }
            });
            if (valid == names.length - 1){
                console.log('Valid slugs');
                res.send(true);
                //return true;
            }
        }

        /*
        for (var i = 0; i < slugs.length; i++){
            for (var j = 0; j < name.length; i++) {
                if (name[j] == slugs[i]){
                    valid += 1;
                }
                else if (valid == name.length - 1) {
                    return true;
                }
            }
        }
        */

        return false;
    }

};
