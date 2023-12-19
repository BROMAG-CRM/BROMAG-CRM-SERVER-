const User = require("../modals/adminUserModal");
const jwt = require("jsonwebtoken");
const get = require("lodash");

const createUser = async (req, res) => {
  try {
    const { name } = req.body;
    const findUser = await User.find({ name });
    if (findUser.length !== 0) {
      return res.status(500).send({ message: "user already exists" });
    } else {
      const result = await User.create({ ...req.body });
      return res.status(200).send({ mesage: result });
    }
  } catch (e) {
    return res
      .status(500)
      .send({ message: "something went wrong while creating a new user" });
  }
};

const getUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, password } = req.body;
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).send({ message: "Incorrect password" });
    }

    const isAdmin = user.name.toLowerCase().startsWith("admin")

    const token = jwt.sign(
      {
        userId: user?._id,
        name: user?.name,
        mobileNumber: user?.mobileNumber,
        email: user?.email,
        city: user?.city,
        state: user?.state,
        adminId: user?.adminId
      },
      process.env.SECRET_KEY,
      { expiresIn: "10000h" }
    );
    res.status(200).send({ message: token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { createUser, getUser };
