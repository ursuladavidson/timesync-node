// delete endpoints
var deleter = require('../src/delete');

module.exports = function(expect) {
    /* DELETE one of the activities endpoints and check whether it can still
       be retrieved from the database */
    describe('DELETE /activities', function() {
        it('Deletes the desired activity', function(done) {
            deleter.deleteActivity('Documentation')
            .then(function(activity) {
                expect(activity).to.be.an('undefined');
                //expect(res.statusCode).to.equal(404);
                done();
            });
        });

        it('Fails if it receives an invalid activity', function(done) {
            deleter.deleteActivity('Napping').then(function(activity) {
                //expect(res.statusCode).to.equal(400);
                expect(activity).to.be.an('undefined');
                done();
            });
        });
    });

    describe('DELETE /activities/:slug', function() {
        it('Deletes the activity affiliated with the activity slug',
        function(done) {
            deleter.deleteActivitySlug('docs').then(function(slug) {
                expect(slug).to.be.an('undefined');
                //expect(res.statusCode).to.equal(404);
                done();
            });
        });

        it('Fails if it receives a non-existent slug', function() {
            deleter.deleteActivitySlug('notathing').then(function(slug) {
                //expect(res.statusCode).to.equal(400);
                expect(slug).to.be.an('undefined');
                done();
            });
        });
    });
};
