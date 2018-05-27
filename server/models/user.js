const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
// Define model

const userSchema = new Schema({
  email: { type: String, unique: true},
  password: String
});

// On save, encrypt password
// Before saving a model, run this function.
userSchema.pre('save', function(next){
  // get access to user model
  const user = this;

  // generate a Salt, then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if(err) {return next(err);}

    // hash (encrypt) the password
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) {return next(err);}

      // overwrite plaintext password with encrypted password.
      user.password = hash;
      next();
    })
  })
})

// Create the model class

const ModelClass = mongoose.model('user', userSchema);

// Export the model

module.exports = ModelClass;
