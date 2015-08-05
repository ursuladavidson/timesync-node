module.exports = {
    validateSlug: function(slug) {
        /* matches, in order:
          1. at least one letter
          2. any number of alphanumeric
          3. hyphen-separated sets of alphanumeric

          Valid:
            test
            a1b2-c3

          Invalid:
            1a2b
            a1b2--c3

          Based on http://stackoverflow.com/a/19256344
        */
        if (slug === undefined || slug === null) {
            // Javascript will cast these to "undefined" and "null",
            // which then pass the test
            return false;
        }

        var isSlug = new RegExp('^[a-z]+[a-z0-9]*(?:-[a-z0-9]+)*$');
        return isSlug.test(slug);
    }
};
