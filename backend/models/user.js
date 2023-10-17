const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// STATIC register method
userSchema.statics.register = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled.')
  }
  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email.");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough.");
  }

  const emailExists = await this.findOne({ email: email });
  if (emailExists) {
    throw Error("This email already exists.");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email: email, password: hash });
  return user;
};

// STATIC login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled.')
  }

  const user = await this.findOne({email})
  if(!user) {
    throw Error('This email does not exist.')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password.')
  }
  return user

}

module.exports = mongoose.model("User", userSchema);
