// test/helpers.js

var helpers = require('../src/helpers');

module.exports = function(expect) {
    describe('validateSlug', function() {
        it('returns true for proper slug', function(done) {
            expect(helpers.validateSlug('kitten')).to.equal(true);
            done();
        });

        it('returns true for proper slug with hyphen', function(done) {
            expect(helpers.validateSlug('kitten-be-cool')).to.equal(true);
            done();
        });

        it('returns true for proper slug with hyphens and numbers',
        function(done) {
            expect(helpers.validateSlug('a1b2-c3')).to.equal(true);
            done();
        });

        it('returns false for empty string', function(done) {
            expect(helpers.validateSlug('')).to.equal(false);
            done();
        });

        it('returns false for null input', function(done) {
            expect(helpers.validateSlug(null)).to.equal(false);
            done();
        });

        it('returns false for undefined input', function(done) {
            expect(helpers.validateSlug(undefined)).to.equal(false);
            done();
        });

        it('returns false for slugs starting with numbers', function(done) {
            expect(helpers.validateSlug('123abc')).to.equal(false);
            done();
        });

        it('returns false for slugs with multiple hyphens in a row',
        function(done) {
            expect(helpers.validateSlug('a1b2--c3')).to.equal(false);
            done();
        });
    });
};
