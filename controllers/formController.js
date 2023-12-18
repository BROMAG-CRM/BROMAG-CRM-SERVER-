const Form=require("../modals/employeeadddetails")
const Admin=require("../modals/adminUserModal")
const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');


const createForm = async (req, res) => {
  try {
    const result=await Form.create({...req.body})
    return res.status(200).send({data:result._id})
  } catch (e) {
    return res.status(200).send({data:"Something went wrong while creating the form"})
  }
};


const getForm = async (req, res) => {
  try {
    const isAdmin = req.user.name.toLowerCase().startsWith("admin");

    let query = {};

    if (isAdmin) {
      const adminId = req.user.userId
      query = { adminId: adminId}; 
    }

    const result = await Form.find(query);
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send({ data: "Something went wrong while fetching the form" });
  }
};


const updateForm=async(req,res)=>{
    const { id } = req.params;
    try {
      const result = await Form.findByIdAndUpdate(id, { ...req.body });
      return res.status(200).send({ data: result });
    } catch (e) {
      return res.status(500).send("Something went wrong while updating form");
    }
}


const getUsers = async (req, res) => {
  try {
    const isAdmin = req.user.name.toLowerCase().startsWith("admin");

    let query = {};

    console.log(req.user.name);

    if (isAdmin) {
      const adminId = req.user.userId;
      query = { adminId: adminId };
      console.log(adminId);
    }

    const result = await Admin.find(query);
    console.log(result);
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send({ data: "Something went wrong while fetching the form" });
  }
};


const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Admin.findByIdAndUpdate(id, { ...req.body }, { new: true });

    if (!result) {
      return res.status(404).send("User not found");
    }

    console.log(result);
    console.log("pooooop");
    return res.status(200).json({ data: result });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).send("Something went wrong while updating user");
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Admin.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send("User not found");
    }

    console.log(result);
    console.log("User deleted successfully");
    return res.status(200).json({ data: result });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).send("Something went wrong while deleting user");
  }
};


const getAssignedIndia = async (req, res) => {
  try {
    const isAdmin = req.user.name.toLowerCase().startsWith("admin");

    let query = {};

    if (isAdmin) {
      console.log(req.user);
      const adminId = req.user.userId
      query = { adminId: adminId, status: "Hot",billingSoftware:"yes" }; 
    }

    const forms = await Form.find(query)
      .select({
        brandName: 1,
        restaurantMobileNumber: 1,
        firmName: 1,
        contactPersonname: 1,
        designation: 1,
        contactPersonNumber: 1,
        city: 1
      });

    const uniqueCitiesSet = new Set(forms.map(form => form.city));
    const uniqueCities = Array.from(uniqueCitiesSet);

    console.log(uniqueCities);

    return res.status(200).send({ data: { forms, uniqueCities } });
  } catch (e) {
    console.error("Error fetching forms:", e);
    return res.status(500).send({ data: "Something went wrong while fetching the form" });
  }
};


const getAssignedBooks = async (req, res) => {
  try {
    const isAdmin = req.user.name.toLowerCase().startsWith("admin");

    let query = {};

    if (isAdmin) {
      console.log(req.user);
      const adminId = req.user.userId
      query = { adminId: adminId, status: "Hot",billingSoftware:"no"}; 
    }

    const forms = await Form.find(query)
      .select({
        brandName: 1,
        restaurantMobileNumber: 1,
        firmName: 1,
        contactPersonname: 1,
        designation: 1,
        contactPersonNumber: 1,
        city: 1
      });

    const uniqueCitiesSet = new Set(forms.map(form => form.city));
    const uniqueCities = Array.from(uniqueCitiesSet);

    console.log(uniqueCities);

    return res.status(200).send({ data: { forms, uniqueCities } });
  } catch (e) {
    console.error("Error fetching forms:", e);
    return res.status(500).send({ data: "Something went wrong while fetching the form" });
  }
};



const getAssignedData = async (req, res) => {
  try {
    const { city } = req.params;
    const isAdmin = req.user.name.toLowerCase().startsWith("admin");

    let query = {};

    if (isAdmin) {
      query = { city: city, status: "Hot" }; 
    }

    const forms = await Form.find(query)
      .select({
        brandName: 1,
        restaurantMobileNumber: 1,
        firmName: 1,
        contactPersonname: 1,
        designation: 1,
        contactPersonNumber: 1,
        city: 1
      });
      console.log(forms);

    return res.status(200).send({ data:  forms });
  } catch (e) {
    console.error("Error fetching forms:", e);
    return res.status(500).send({ data: "Something went wrong while fetching the form" });
  }
};


const getNewLeadsDataIndia = async (req,res) => {
  try {
    const isAdmin = req.user.name.toLowerCase().startsWith("admin");

    let query = {};

    if (isAdmin) {
      const adminId = req.user.userId
      query = { adminId: adminId, status: "Hot", leadStatus:"new-lead",billingSoftware:"yes" }; 
    }

    const forms = await Form.find(query)
      .select({
        brandName: 1,
        restaurantMobileNumber: 1,
        firmName: 1,
        contactPersonname: 1,
        designation: 1,
        contactPersonNumber: 1,
        city: 1,
      });
      console.log(forms);

    return res.status(200).send({ data:  forms });
  } catch (e) {
    console.error("Error fetching forms:", e);
    return res.status(500).send({ data: "Something went wrong while fetching the form" });
  }
}

const updateLeadStatus = async(req,res)=> {
  try {
    const {value,id} = req.body
    const result = await Form.updateOne(
      { _id: id },
      { $set: { leadStatus: value } }
    );;
    return res.status(200).json({ data: result });
  } catch (error) {
    console.error("Error updating description:", error);
    return res.status(500).send("Something went wrong while updating description");
  }
}

const updateLeadDescription =  async(req,res)=>{
  try {
    const {value,id} = req.body
    const result = await Form.updateOne(
      { _id: id },
      { $set: { leadDescription: value } }
    );;
    return res.status(200).json({ data: result });
  } catch (error) {
    console.error("Error updating description:", error);
    return res.status(500).send("Something went wrong while updating description");
  }
}


const followUpDetails =  async(req,res)=>{
  try {
    const {time,date,id,value}= req.body

    console.log(req.body);

    const result = await Form.updateOne(
      { _id: id },
      { $set: {
          leadStatus: value,
          followupDate: date,
          followupTime: time,
        }, }
    );;
    return res.status(200).json({ data: result });
  } catch (error) {
    console.error("Error updating description:", error);
    return res.status(500).send("Something went wrong while updating description");
  }
}


const getFollowupLeadsDataIndia = async(req,res)=> {
  try {
    const isAdmin = req.user.name.toLowerCase().startsWith("admin");

    let query = {};

    if (isAdmin) {
      const adminId = req.user.userId
      query = { adminId: adminId, status: "Hot" ,leadStatus:"follow-up",billingSoftware:"yes"}; 
    }

    const forms = await Form.find(query)
      .select({
        brandName: 1,
        restaurantMobileNumber: 1,
        firmName: 1,
        contactPersonname: 1,
        designation: 1,
        contactPersonNumber: 1,
        city: 1,
        leadDescription: 1,
        followupTime: 1,
        followupDate: 1
      });
      console.log(forms);

    return res.status(200).send({ data:  forms });
  } catch (e) {
    console.error("Error fetching forms:", e);
    return res.status(500).send({ data: "Something went wrong while fetching the form" });
  }
}


const addFeature = async (req, res) => {
  try {
    const { featureName, featureDescription, id } = req.body;
    console.log(req.body);

    const result = await Form.updateOne(
      { _id: id },
      {
        $push: {
          features: {featureName, featureDescription}
        },
      }
    );

   console.log(result);
  
    return res.status(200).json({ data: result });
  } catch (error) {
    console.error("Error updating feature:", error);
    return res.status(500).send("Something went wrong while updating feature");
  }
};



const getConnectedLeadsDataIndia = async (req,res)=> {


  console.log("1111111connectee");

  try {
    const isAdmin = req.user.name.toLowerCase().startsWith("admin");

    let query = {};

    if (isAdmin) {
      const adminId = req.user.userId
      query = { adminId: adminId, status: "Hot", leadStatus:"connected", billingSoftware:"yes" }; 
    }

    const forms = await Form.find(query)
      .select({
        brandName: 1,
        restaurantMobileNumber: 1,
        firmName: 1,
        contactPersonname: 1,
        designation: 1,
        contactPersonNumber: 1,
        city: 1,
        leadDescription: 1,
        callRecord:1
      });
      console.log(forms);

    return res.status(200).send({ data:  forms });
  } catch (e) {
    console.error("Error fetching forms:", e);
    return res.status(500).send({ data: "Something went wrong while fetching the form" });
  }

}




const getNotConnectedLeadsDataIndia = async (req,res)=> {

  try {
    const isAdmin = req.user.name.toLowerCase().startsWith("admin");

    let query = {};

    if (isAdmin) {
      const adminId = req.user.userId
      query = { adminId: adminId, status: "Hot", leadStatus:"not-connected" ,billingSoftware:"yes" }; 
    }

    const forms = await Form.find(query)
      .select({
        brandName: 1,
        restaurantMobileNumber: 1,
        firmName: 1,
        contactPersonname: 1,
        designation: 1,
        contactPersonNumber: 1,
        city: 1,
        leadDescription: 1,
      });
      console.log(forms);

    return res.status(200).send({ data:  forms });
  } catch (e) {
    console.error("Error fetching forms:", e);
    return res.status(500).send({ data: "Something went wrong while fetching the form" });
  }

}




const hotLeadsData = async (req,res)=> {
  try {
    const isAdmin = req.user.name.toLowerCase().startsWith("admin");

    let query = {};

    if (isAdmin) {
      const adminId = req.user.userId
      query = { adminId: adminId, status: "Hot" }; 
    }

    const forms = await Form.find(query)
      .select({
        brandName: 1,
        restaurantMobileNumber: 1,
        firmName: 1,
        contactPersonname: 1,
        designation: 1,
        contactPersonNumber: 1,
        city: 1,
        leadDescription: 1,
      });
      console.log(forms);

    return res.status(200).send({ data:  forms });
  } catch (e) {
    console.error("Error fetching forms:", e);
    return res.status(500).send({ data: "Something went wrong while fetching the form" });
  }
}



const warmLeadsData = async (req,res)=> {
  try {
    const isAdmin = req.user.name.toLowerCase().startsWith("admin");

    let query = {};

    if (isAdmin) {
      const adminId = req.user.userId
      query = { adminId: adminId, status: "Warm" }; 
    }

    const forms = await Form.find(query)
      .select({
        brandName: 1,
        restaurantMobileNumber: 1,
        firmName: 1,
        contactPersonname: 1,
        designation: 1,
        contactPersonNumber: 1,
        city: 1,
        leadDescription: 1,
      });
      console.log(forms);

    return res.status(200).send({ data:  forms });
  } catch (e) {
    console.error("Error fetching forms:", e);
    return res.status(500).send({ data: "Something went wrong while fetching the form" });
  }
}




const coldLeadsData = async (req,res)=> {
  try {
    const isAdmin = req.user.name.toLowerCase().startsWith("admin");

    let query = {};

    if (isAdmin) {
      const adminId = req.user.userId
      query = { adminId: adminId, status: "Cold" }; 
    }

    const forms = await Form.find(query)
      .select({
        brandName: 1,
        restaurantMobileNumber: 1,
        firmName: 1,
        contactPersonname: 1,
        designation: 1,
        contactPersonNumber: 1,
        city: 1,
        leadDescription: 1,
      });
      console.log(forms);

    return res.status(200).send({ data:  forms });
  } catch (e) {
    console.error("Error fetching forms:", e);
    return res.status(500).send({ data: "Something went wrong while fetching the form" });
  }
}



async function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}



const uploadCallRecord = async (req, res) => {
  console.log("111111111111111100");

  const { id } = req.params;
  const { originalname, buffer } = req.file;

  const uniqueKey = (await generateRandomString(16)) + originalname;
  console.log(uniqueKey);

  const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials: {
      accessKeyId: 'AKIAY4YMHWOQNHNR6CWP',
      secretAccessKey: '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',
    },
  });
  
  try {
    const response = await s3Client.send(
      new PutObjectCommand({
        Bucket: 'crm-s3bucket',
        Key: uniqueKey,
        Body: buffer,
      })
    );
    // Log the URL of the uploaded file
    const fileUrl = `https://crm-s3bucket.s3.ap-south-1.amazonaws.com/${uniqueKey}`;
    console.log("File uploaded successfully:", fileUrl);

    await Form.updateOne(
      { _id: id },
      { $set: { callRecord: fileUrl} }
    )

    // Optionally, you can send the file URL as a response to the client
    res.json({ fileUrl });

  } catch (error) {
    console.error("Error uploading file to S3:", error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};


const uploadImage = async(req,res)=>{
  
    const { originalname, buffer } = req.file;
  
    const uniqueKey = (await generateRandomString(16)) + originalname;
    console.log(uniqueKey);
  
    const s3Client = new S3Client({
      region: 'ap-south-1',
      credentials: {
        accessKeyId: 'AKIAQXYD576UOVKPG4Z5',      
        secretAccessKey: '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',
      },
    });
    
    try {
      const response = await s3Client.send(
        new PutObjectCommand({
          Bucket: 'crms3-bucket',
          Key: uniqueKey,
          Body: buffer,
        })
      );
      const fileUrl = `https://crms3-bucket.s3.ap-south-1.amazonaws.com/${uniqueKey}`;
      console.log("File uploaded successfully:", fileUrl);
  
      res.json({ fileUrl });
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  };


module.exports={
  createForm,getForm,updateForm,getUsers,
  updateUser,getAssignedIndia,deleteUser,
  getAssignedData,getNewLeadsDataIndia,
  updateLeadStatus,updateLeadDescription,
  followUpDetails,getFollowupLeadsDataIndia,
  addFeature,getConnectedLeadsDataIndia,
  getNotConnectedLeadsDataIndia,hotLeadsData,
  warmLeadsData,coldLeadsData,uploadCallRecord,
  uploadImage,getAssignedBooks
}




















