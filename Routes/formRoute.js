

const express = require('express');
const router = express.Router();
const { createForm, getForm, updateForm, getUsers, updateUser } = require("../controllers/formController");
const Auth = require('../middleWare/authenticateUser');

router.use(Auth);

router.post("/createform", createForm)
  .get("/getform", getForm)
  .get("/getusers",getUsers)
  .put("/updateform/:id", updateForm)
  .post("/updateduser/:id",updateUser)

module.exports = router;
