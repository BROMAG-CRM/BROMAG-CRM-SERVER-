const express = require('express')
const router=express.Router()
const {createUser, getUser} = require("../controllers/adminUserController");
const authenticateToken = require('../middleWare/authenticateUser');


router.post("/createuser",createUser).post("/getuser",getUser).get("/validateToken", authenticateToken, (req, res) => {
    res.status(200).send(req.user);
  });

module.exports=router