// delete endpoints
var deleter = require('../src/delete');

module.exports = function(expect) {
    /* DELETE one of the projects endpoints and check whether it can still
       be retrieved from the database */
    describe('DELETE /projects', function() {
        it('Deletes the desired project', function(done) {
            deleter.deleteProject('Whats Fresh')
            .then(function(project) {
                expect(project).to.be.an('undefined');
                //expect(res.statusCode).to.equal(404);
                done();
            });
        });

        it('Fails if it receives an invalid project', function(done) {
            deleter.deleteProject('Nothing').then(function(project) {
                //expect(res.statusCode).to.equal(400);
                expect(project).to.be.a('Nothing');
                done();
            });
        });
    });

    describe('DELETE /projects/:slug', function() {
        it('Deletes the project affiliated with the project slug',
        function(done) {
            deleter.deleteProjectSlug('wf').then(function(slug) {
                expect(slug).to.be.an('undefined');
                //expect(res.statusCode).to.equal(404);
                done();
            });
        });

        it('Fails if it receives a non-existent slug', function() {
            deleter.deleteProjectSlug('notaproject').then(function(slug) {
                //expect(res.statusCode).to.equal(400);
                expect(slug).to.be.an('notaproject');
                done();
            });
        });
    });
};
