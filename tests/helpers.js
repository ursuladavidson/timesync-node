var helpers = require('../src/helpers');

module.exports = function(expect) {
    describe('checkProject', function() {
        it('returns a project ID for proper slug', function(done) {
            helpers.checkProject('ganeti-webmgr').then(function(project) {
                expect(project).to.equal(1);
                done();
            });
        });

        it('throws when passed undefined', function(done) {
            helpers.checkProject(undefined).then().catch(function(err) {
                // this means that the time.slug was undefined
                expect(err).to.equal(undefined);
                done();
            });
        });

        it('throws when passed a bad slug', function(done) {
            helpers.checkProject('dogs').then().catch(function(err) {
                expect(err).to.equal('dogs');
                done();
            });
        });

        it('throws when passed a null slug', function(done) {
            helpers.checkProject(null).then().catch(function(err) {
                expect(err).to.equal(null);
                done();
            });
        });
    });
};
