const User = require("./../models/SignUp");
const jwt = require("jsonwebtoken");
const token = (id) => {
  return jwt.sign({ id }, process.env.SECERTE_KEY);
};
exports.signUp = async (req, res) => {
  try {
    const data = await User.create(req.body);
    const token1 = token(data._id);
    res.status(200).json({
      error: false,
      details: {
        token: token1,
        id: data._id,
        name: data.name,
        email: data.email,
        profilePic:data.profilePic,
      },
      message: null,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fails",
      message: "something went wrong",
      data: null,

    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json({ status: "fail ", message: "please enter email or password" });
    }
    console.log(email, password);
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      res.status(400).json({
        status: "fail ",
        message: "incorrect email or the password is incorrect",
      });
    }
    const token1 = token(user._id);
    return res.status(200).json({
      error: false,
      details: {
        token: token1,
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic:user.profilePic,
      },
      message: null,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      details: "seomething went wrong",
    });
  }
};

exports.allUser = async (req, res) => {
  try {
      let usersArray= [];
    const id = res.locals.compID.id;

    const users = await User.find({_id:{$ne:id}});
    
    res.status(200).json({ status: "success", data: users });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", error: "something went wrong" });
  }
};
