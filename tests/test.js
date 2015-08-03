require('../src/app');

var requestBuilder = require('request');
var expect = require('chai').expect;
var sqlFixtures = require('sql-fixtures');
var sinon = require('sinon');

var request = requestBuilder.defaults({encoding: null});
var testData = require('./fixtures/test_data');
var knexfile = require('../knexfile');
var knex = require('knex')(knexfile.mocha);

var port = process.env.PORT || 8000;
var baseUrl = 'http://localhost:' + port + '/v1/';

var before = function(done) {
    runMigrations(done);
};

var reloadFixtures = function(done) {
    // Clear SQLite indexes
    knex.raw('delete from sqlite_sequence').then(function() {
        sqlFixtures.create(knexfile.mocha, testData).then(function() {
            done();
        });
    });
};

var runMigrations = function(done) {
    knex.migrate.latest().then(function() {
        done();
    });
}

var clearDatabase = (function(done) {
    knex('projects').del().then(function() {
        knex('activities').del().then(function() {
            knex('users').del().then(function() {
                knex('times').del().then(function() {
                    knex('projectslugs').del().then(function() {
                        knex('timesactivities').del().then(function() {
                            sqlFixtures.destroy().then(function() {
                                done();
                            });
                        });
                    });
                });
            });
        });
    });
});

describe('GET Endpoints', function() {
    before(before);

    beforeEach(function(done) {
        reloadFixtures(done);
    });

    afterEach(function(done) {
        clearDatabase(done);
    });

    require('./get/times')(expect, request, baseUrl);
    require('./get/activities')(expect, request, baseUrl);
    require('./get/projects')(expect, request, baseUrl);

});

describe('POST Endpoints', function() {
    var helpers = require('../src/helpers');

    before(function(done) {
        sinon.stub(helpers, 'checkProject')
        .yields(
            new Promise(function(resolver, reject) {
                resolver(1);
            })
        );
        before(done);
    });

    beforeEach(function(done) {
        reloadFixtures(done);
    });

    afterEach(function(done) {
        clearDatabase(done);
    });

    require('./post/times.js')(expect, request, baseUrl);
});

describe('Helpers', function() {
    before(before);

    beforeEach(function(done) {
        reloadFixtures(done);
    });

    afterEach(function(done) {
        clearDatabase(done);
    });

    var localPassport = require('../src/auth/local.js')(knex);
    require('./login')(expect, localPassport);
    require('./helpers')(expect);
});
