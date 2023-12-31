const express = require('express');
const router = express.Router();
const multer = require('multer')

const { createForm, getForm, updateForm, getUsers, 
  updateUser, getAssignedIndia, deleteUser, getNewLeadsDataIndia, updateLeadStatus
  , followUpDetails,myLeadsBooks, 
getFollowupLeadsDataIndia,addFeature,getConnectedLeadsDataIndia,
getNotConnectedLeadsDataIndia,progressLeadsData
,uploadCallRecord,uploadImage,getAssignedBooks,
businessStatus,uploadVideoRecord,addVideoFeature,
addIntroduction,salesBooks,SalesCampaignsIndia,
SalesCampaignsBooks,booksConnectedInMarkrting,
booksFollowUpInMarkrting,booksNewLeadInMarkrting,
booksNotConnectedInMarkrting,indiaConnectedInSales,
indiaFollowUpInSales,indiaNewLeadsInSales,
indiaNotConnectedInSales,booksNewLeadInSales,
booksFollowUpInSales,booksConnectedInSales,
booksNotConnectedInSales,updateBooksStatus,
bdmCampaignsBooks,bdmCampaignsIndia,indiaConnectedInBdm,
indiaFollowUpInBdm,indiaNewLeadsInBdm,indiaNotConnectedInBdm,
booksNewLeadInBdm,booksFollowUpInBdm,booksConnectedInBdm,
booksNotConnectedInBdm,addBdmFeature,updateBdmLocation,
uploadSelfiPhoto,getPendingForm,getCompletedForm,
booksBusinessStatus,updateStatus

} = require("../controllers/formController");






const storage = multer.memoryStorage();
const upload = multer({ storage: storage });




const Auth = require('../middleWare/authenticateUser');

router.use(Auth);


console.log("routeee");

router.post("/createform", createForm)
  .get("/getform/:category", getForm)
  .get("/getusers",getUsers)
  .put("/updateform/:id", updateForm)
  .post("/updateduser/:id",updateUser)
  .get("/getassignedindia",getAssignedIndia)
  .get("/getassignedbooks",getAssignedBooks)
  .delete("/deleteuser/:id",deleteUser)
  .get("/getnewleadsdataindia",getNewLeadsDataIndia)
  .post("/updateleadstatus",updateLeadStatus)
  .post("/followupdetails",followUpDetails)
  .get("/getfollowupleadsdataindia",getFollowupLeadsDataIndia)
  .post("/addfeature",addFeature)
  .get("/connectedleadsdataindia",getConnectedLeadsDataIndia)
  .get("/notconnectedleadsdataindia",getNotConnectedLeadsDataIndia)
  .get("/progressleadsdata",progressLeadsData)
  .post("/uploadcallrecord/:id",upload.single('file'), uploadCallRecord)
  .post("/uploadimage/:fieldName",upload.single('file'),uploadImage)
  .get("/myleadsbooks",myLeadsBooks)
  .post("/businessstatus",businessStatus)
  .post("/uploadvideorecord/:id",upload.single('file'),uploadVideoRecord)
  .post("/addvideofeature",addVideoFeature)
  .post("/addintroduction",addIntroduction)
  .post("/addbdmfeature",addBdmFeature)

  .get("/salessbooks",salesBooks)
  .get("/salescampaignsindia",SalesCampaignsIndia)
  .get("/salescampaignsbooks",SalesCampaignsBooks)
  .get("/booksconnectedinmarketing",booksConnectedInMarkrting)
  .get("/booksfollowupinmarketing",booksFollowUpInMarkrting)
  .get("/booksnewleadinmarketing",booksNewLeadInMarkrting)
  .get("/booksnotconnectedinmarketing",booksNotConnectedInMarkrting)
  .get("/indiaconnectedinsales",indiaConnectedInSales)
  .get("/indiafollowupinsales",indiaFollowUpInSales)
  .get("/indianewleadsinsales",indiaNewLeadsInSales)
  .get("/indianotconnectedinsales",indiaNotConnectedInSales)
  .get("/booksnewleadinsales",booksNewLeadInSales)
  .get("/booksfollowupinsales",booksFollowUpInSales)
  .get("/booksconnectedinsales",booksConnectedInSales)
  .get("/booksnotconnectedinsales",booksNotConnectedInSales)
  .post("/updatebooksstatus",updateBooksStatus)
  .get("/bdmcampaignsindia",bdmCampaignsIndia)
  .get("/bdmcampaignsbooks",bdmCampaignsBooks)
  .get("/indiaconnectedinbdm",indiaConnectedInBdm)
  .get("/indianotconnectedinbdm",indiaNotConnectedInBdm)
  .get("/indiafollowupinbdm",indiaFollowUpInBdm)
  .get("/indianewleadinbdm",indiaNewLeadsInBdm)

  .get("/booksnewleadinbdm",booksNewLeadInBdm)
  .get("/booksfollowupinbdm",booksFollowUpInBdm)
  .get("/booksconnectedinbdm",booksConnectedInBdm)
  .get("/booksnotconnectedinbdm",booksNotConnectedInBdm)

  .post("/updatebdmlocation/:id",updateBdmLocation)
  .post("/uploadselfiphoto/:id",upload.single('file'),uploadSelfiPhoto)

  .get("/getpendingform/:type",getPendingForm)
  .get("/getcompletedform/:type",getCompletedForm)

  .post("/booksbusinessstatus",booksBusinessStatus)

  .post("/updatestatus",updateStatus)

  


module.exports = router;
