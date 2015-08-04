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
            deleter.deleteActivitySlug('notathing').then(function(res) {
                /*var expectedResult = {
                    status: 400,
                    error: 'The provided identifier does not exist!'
                    text: 'Expected slug but received notathing'
                };*/

                expect(res.statusCode).to.equal(400);
                done();
            });
        });
    });
};
