module.exports = function(app) {
    var knex = app.get('knex');
    var errors = require('./errors');

    app.get(app.get('version') + '/projects', function(req, res) {
        knex('projects').then(function(projects) {
            if (projects.length === 0) {
                return res.send([]);
            }

            var usersDone = false,
                slugsDone = false;

            knex('users').then(function(users) {
                var idUserMap = {};
                for (var i = 0, len = users.length; i < len; i++) {
                    idUserMap[users[i].id] = users[i].username;
                }

                for (i = 0, len = projects.length; i < len; i++) {
                    projects[i].owner = idUserMap[projects[i].owner];
                }

                usersDone = true;
                if (slugsDone) {
                    return res.send(projects);
                }
            });

            knex('projectslugs').then(function(slugs) {

                var idProjectMap = {};
                for (var i = 0, len = projects.length; i < len; i++) {
                    projects[i].slugs = [];
                    idProjectMap[projects[i].id] = projects[i];
                }

                for (i = 0, len = slugs.length; i < len; i++) {
                    idProjectMap[slugs[i].project].slugs.push(slugs[i].name);
                }

                slugsDone = true;
                if (usersDone) {
                    return res.send(projects);
                }
            });
        });
    });

    app.get(app.get('version') + '/projects/:slug', function(req, res) {
        /*
        * Gets an project and list of slugs from a slug.
        *
        * First selects an project from the name of a slug (from the URI).
        * Then selects all slug names which match that project.
        * Resulting table will look like this:
        *
        * +----+---------+----------------------+-------------+
        * | id |   name  |          uri         |     slug    |
        * +----+---------+----------------------+-------------+
        * |  4 | Example | http://example.com/1 |      ex     |
        * |  4 | Example | http://example.com/1 |   example   |
        * |  4 | Example | http://example.com/3 |    sample   |
        * |  4 | Example | http://example.com/4 |   Beispiel  |
        * +----+---------+----------------------+-------------+
        *
        * Equivalent SQL:
        *       SELECT projects.id AS id, projects.name AS name,
        *              projects.uri AS uri, users.username AS owner,
        *              projectslugs.name AS slug FROM projectslugs
        *       INNER JOIN projects ON projectslugs.project = projects.id
        *       INNER JOIN users ON users.id = projects.owner
        *       WHERE projectslugs.project =
        *               (SELECT id FROM projects WHERE id =
        *                   (SELECT project FROM projectslugs
        *                    WHERE name = $slug)
        *               )
        */
        var projectSubquery = knex('projectslugs').select('project')
        .where('name', req.params.slug);
        var slugsSubquery = knex('projects').select('id').where(
            'id', '=', projectSubquery);

        knex('projectslugs')
        .select('projects.id as id', 'projects.name as name',
            'projects.uri as uri', 'users.username as owner',
            'projectslugs.name as slug')
        .where('projectslugs.project', '=', slugsSubquery)
        .innerJoin('projects', 'projectslugs.project', 'projects.id')
        .innerJoin('users', 'users.id', 'projects.owner')
        .then(function(results) {

            if (results.length !== 0) {
                project = {id: results[0].id, name: results[0].name,
                           owner: results[0].owner, uri: results[0].uri,
                           slugs: []};

                for (var i = 0, len = results.length; i < len; i++) {
                    project.slugs.push(results[i].slug);
                }

                res.send(project);
            } else {
                return res.status(404).send(
                    errors.errorInvalidSlug(req.params.slug +
                        ' is not a valid project slug.'));
            }
        });
    });
};
