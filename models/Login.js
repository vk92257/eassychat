const mogoose = require("mongoose");
const LoginShema = mogoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: { type: String, unique: true, required: [true, "email is required"] },
  password: { type: String, required: [true, "password is required"] },
  profilePic: { type: String, required: [true, "image is required"] },
});
module.exports = mongoose.model("User", LoginShema);
