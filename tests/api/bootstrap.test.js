var sails = require('sails');

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(5000);

  sails.lift({
    models: {
      migrate: 'drop'
    }
  }, function(err, server) {

    // Here is loaded administrator token
    AccessToken.create({
      userId: 1,
      token: "admintoken"
    }, function(err, accessToken) {

      if (err) {
        return done(err);
      }

      return done(err, sails);
    });
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});