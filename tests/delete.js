// delete endpoints
var deleter = require('../src/delete');

module.exports = function(expect) {
    /* DELETE one of the times endpoints and check whether it can still be
       retrieved from the database */
    describe('DELETE /times', function() {
        it('Deletes the desired time instance', function(done) {
            deleter.deleteTime(1).then(function(time) {
                expect(time).to.be.an('undefined');
                done();
            });
        });

        it('Fails if it receives an invalid time id', function(done) {
            deleter.deleteTime('notanid').then(function(timeid) {
                expect(timeid).to.be.an('undefined');
                //expect(res.statusCode).to.equal(400);
                done();
            });
        });
    });
};
