

const express = require('express');
const router = express.Router();
const { createForm, getForm, updateForm, getUsers, updateUser, getAssigned, deleteUser, getAssignedData, getNewLeadsData, updateLeadStatus, updateLeadDescription, followUpDetails } = require("../controllers/formController");
const Auth = require('../middleWare/authenticateUser');

router.use(Auth);

router.post("/createform", createForm)
  .get("/getform", getForm)
  .get("/getusers",getUsers)
  .put("/updateform/:id", updateForm)
  .post("/updateduser/:id",updateUser)
  .get("/getassigned",getAssigned)
  .delete("/deleteuser/:id",deleteUser)
  .get("/getassigneddata/:city",getAssignedData)
  .get("/getnewleadsdata",getNewLeadsData)
  .post("/updateleadstatus",updateLeadStatus)
  .post("/updatedescription",updateLeadDescription)
  .post("/followupdetails",followUpDetails)
  


module.exports = router;
