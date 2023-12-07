// const express = require('express')
// const router=express.Router()
// const {createForm,getForm, updateForm} = require("../controllers/formController");

// router.post("/createform",createForm).get("/getform",getForm).put("/updateform/:id",updateForm)
// module.exports=router



const express = require('express');
const router = express.Router();
const { createForm, getForm, updateForm } = require("../controllers/formController");
const Auth = require('../middleWare/authenticateUser');

router.use(Auth);

router.post("/createform", createForm)
  .get("/getform", getForm)
  .put("/updateform/:id", updateForm);

module.exports = router;
