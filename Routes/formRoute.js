const express = require('express');
const router = express.Router();
const multer = require('multer')

const { createForm, getForm, updateForm, getUsers, 
  updateUser, getAssignedIndia, deleteUser, getNewLeadsDataIndia, updateLeadStatus, 
updateLeadDescription, followUpDetails,myLeadsBooks, 
getFollowupLeadsDataIndia,addFeature,getConnectedLeadsDataIndia,
getNotConnectedLeadsDataIndia,progressLeadsData,warmLeadsData
,uploadCallRecord,uploadImage,getAssignedBooks,
businessStatus} = require("../controllers/formController");






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
  .get("/getassignedindia",getAssignedIndia)
  .get("/getassignedbooks",getAssignedBooks)
  .delete("/deleteuser/:id",deleteUser)
  .get("/getnewleadsdataindia",getNewLeadsDataIndia)
  .post("/updateleadstatus",updateLeadStatus)
  .post("/updatedescription",updateLeadDescription)
  .post("/followupdetails",followUpDetails)
  .get("/getfollowupleadsdataindia",getFollowupLeadsDataIndia)
  .post("/addfeature",addFeature)
  .get("/connectedleadsdataindia",getConnectedLeadsDataIndia)
  .get("/notconnectedleadsdataindia",getNotConnectedLeadsDataIndia)
  .get("/progressleadsdata",progressLeadsData)
  .get("/warmleadsdata",warmLeadsData)
  .post("/uploadcallrecord/:id", upload.single('file'), uploadCallRecord)
  .post("/uploadimage",upload.single('file'),uploadImage)
  .get("/myleadsbooks",myLeadsBooks)
  .post("/businessstatus",businessStatus)

  


module.exports = router;
