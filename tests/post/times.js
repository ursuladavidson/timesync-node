module.exports = function(expect, request, baseUrl) {
    describe('POST /times', function() {
        it('stubs checkProject', function(done) {
            request.post(baseUrl + 'times', {}, function(err, res, body) {
                console.log(body);
                expect(err).to.equal(null);
                expect(body).to.equal(1);
                done();
            });
        });
    });
}
