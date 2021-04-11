const mogoose = require("mongoose");
const bcrypt = require("bcrypt");
const SignUpShema = mogoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: { type: String, unique: true, required: [true, "email is required"] },
  password: {
    type: String,
    required: [true, "password is required"],
    select: false,
  },
  profilePic: { type: String, required: [true, "image is required"] },
});

SignUpShema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

SignUpShema.methods.correctPassword = async function (
  enteredPassword,
  password
) {
  return await bcrypt.compare(enteredPassword, password);
};

const User = mogoose.model("Users", SignUpShema);
module.exports = User;
