const express = require('express');
const router = express.Router();
const multer = require('multer')

const { createForm, getForm, updateForm, getUsers, 
  updateUser, getAssignedIndia, deleteUser,
getAssignedData, getNewLeadsDataIndia, updateLeadStatus, 
updateLeadDescription, followUpDetails, 
getFollowupLeadsDataIndia,addFeature,getConnectedLeadsDataIndia,
getNotConnectedLeadsDataIndia,hotLeadsData,warmLeadsData,
coldLeadsData,uploadCallRecord,uploadImage,getAssignedBooks,
 } = require("../controllers/formController");






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
  .get("/getassigneddata/:city",getAssignedData)
  .get("/getnewleadsdataindia",getNewLeadsDataIndia)
  .post("/updateleadstatus",updateLeadStatus)
  .post("/updatedescription",updateLeadDescription)
  .post("/followupdetails",followUpDetails)
  .get("/getfollowupleadsdataindia",getFollowupLeadsDataIndia)
  .post("/addfeature",addFeature)
  .get("/connectedleadsdataindia",getConnectedLeadsDataIndia)
  .get("/notconnectedleadsdataindia",getNotConnectedLeadsDataIndia)
  .get("/hotleadsdata",hotLeadsData)
  .get("/warmleadsdata",warmLeadsData)
  .get("/coldleadsdata",coldLeadsData)
  .post("/uploadcallrecord/:id", upload.single('file'), uploadCallRecord)
  .post("/uploadimage",upload.single('file'),uploadImage)
  


module.exports = router;
