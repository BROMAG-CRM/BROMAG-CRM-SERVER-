const express = require('express');
const router = express.Router();
const multer = require('multer')

const { createForm, getForm, updateForm, getUsers, 
  updateUser, getAssigned, deleteUser,
getAssignedData, getNewLeadsData, updateLeadStatus, 
updateLeadDescription, followUpDetails, 
getFollowupLeadsData,addFeature,getConnectedLeadsData,
getNotConnectedLeadsData,hotLeadsData,warmLeadsData,
coldLeadsData,uploadCallRecord,uploadImage } = require("../controllers/formController");






const storage = multer.memoryStorage();
const upload = multer({ storage: storage });




const Auth = require('../middleWare/authenticateUser');

router.use(Auth);


console.log("routeee");

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
  .get("/getfollowupleadsdata",getFollowupLeadsData)
  .post("/addfeature",addFeature)
  .get("/connectedleadsdata",getConnectedLeadsData)
  .get("/notconnectedleadsdata",getNotConnectedLeadsData)
  .get("/hotleadsdata",hotLeadsData)
  .get("/warmleadsdata",warmLeadsData)
  .get("/coldleadsdata",coldLeadsData)
  .post("/uploadcallrecord/:id", upload.single('file'), uploadCallRecord)
  .post("/uploadimage",upload.single('file'),uploadImage)
  


module.exports = router;
