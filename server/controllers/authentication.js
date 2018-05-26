const User = require('../models/user');

exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  // See if a user with email exists
  User.findOne({ email: email }, function (err, existingUser){
    if (err) {
      return next(err);
    }

    // If a user with email exists, return an Error
    if (existingUser) {
      return res.status(422).send({error: 'Email already in use!'});
    }

    // If a user with email does not exist, create and save user record
    const user = new User({
      email: email,
      password: password
    });
    user.save(function(err) {
      if(err) {
        return next(err);
      }

      // Respond to request indicating the user was created
      res.json({ success: true });
    })
  });

}
