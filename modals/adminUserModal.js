const mongoose = require("mongoose");

const adminUserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  mobileNumber: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  city:{
    type:String,
  },
  

});

module.exports = mongoose.model("adminuser", adminUserSchema);
