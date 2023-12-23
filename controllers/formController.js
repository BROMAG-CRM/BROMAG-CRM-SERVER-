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
    const {category} = req.params
    console.log(category);
    const isAdmin = req.user.name.toLowerCase().startsWith("admin");

    let query = {};

    if (isAdmin) {
      const adminId = req.user.userId
      query = { adminId: adminId, firmOption: category}; 
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
      query = { adminId: adminId, status: "Hot",businessStatus:"telemarketing" }; 
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
        leadStatus:1,
        status:1,
        adminId:1
      });

    const uniqueCitiesSet = new Set(forms.map(form => form.city));
    const uniqueCities = Array.from(uniqueCitiesSet);

console.log(forms);

const newLeads = forms.filter(form => form.leadStatus === "new-lead");
const opened = forms.filter(form => form.leadStatus === "connected" || form.leadStatus === "follow-up" || form.leadStatus === "not-connected");
const followUp = forms.filter(form => form.leadStatus === "follow-up");
const connected = forms.filter(form => form.leadStatus === "connected");
const notConnected = forms.filter(form => form.leadStatus === "not-connected");

const newLeadsCount = newLeads.length;
const openedCount = opened.length;
const followUpCount = followUp.length;
const connectedCount = connected.length;
const notConnectedCount = notConnected.length;

console.log("New Leads Count:", newLeadsCount);
console.log("Opened Count:", openedCount);
console.log("Follow Up Count:", followUpCount);
console.log("Connected Count:", connectedCount);
console.log("Not Connected Count:", notConnectedCount);
console.log("uniqueCities:",uniqueCities);

    return res.status(200).send({ data: { newLeadsCount,openedCount,followUpCount,connectedCount,notConnectedCount,uniqueCities } });
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
      query = { adminId: adminId, billingSoftware:"no",telemarketing:"telemarketing"}; 
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
      leadStatus:1,
      status:1,
      adminId:1
    });

  const uniqueCitiesSet = new Set(forms.map(form => form.city));
  const uniqueCities = Array.from(uniqueCitiesSet);



const newLeads = forms.filter(form => form.leadStatus === "new-lead");
const opened = forms.filter(form => form.leadStatus === "connected" || form.leadStatus === "follow-up" || form.leadStatus === "not-connected");
const followUp = forms.filter(form => form.leadStatus === "follow-up");
const connected = forms.filter(form => form.leadStatus === "connected");
const notConnected = forms.filter(form => form.leadStatus === "not-connected");

const newLeadsCount = newLeads.length;
const openedCount = opened.length;
const followUpCount = followUp.length;
const connectedCount = connected.length;
const notConnectedCount = notConnected.length;

console.log("New Leads Count:", newLeadsCount);
console.log("Opened Count:", openedCount);
console.log("Follow Up Count:", followUpCount);
console.log("Connected Count:", connectedCount);
console.log("Not Connected Count:", notConnectedCount);
console.log("uniqueCities:",uniqueCities);

  return res.status(200).send({ data: { newLeadsCount,openedCount,followUpCount,connectedCount,notConnectedCount,uniqueCities } });
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
      query = { adminId: adminId, status: "Hot", leadStatus:"new-lead",businessStatus:"telemarketing"}; 
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
        newLeadFeatures: 1,
        businessStatus:1

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
      query = { adminId: adminId, status: "Hot" ,leadStatus:"follow-up",businessStatus:"telemarketing"}; 
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
        followupDate: 1,
        callRecord: 1,
        features: 1
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



  try {
    const isAdmin = req.user.name.toLowerCase().startsWith("admin");

    let query = {};

    if (isAdmin) {
      const adminId = req.user.userId
      query = { adminId: adminId, status: "Hot", leadStatus:"connected",businessStatus:"telemarketing"}; 
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
        callRecord:1,
        features:1,
        status: 1,
        leadStatus: 1,        
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
      query = { adminId: adminId, status: "Hot", leadStatus:"not-connected" ,businessStatus:"telemarketing"}; 
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




const progressLeadsData = async (req,res)=> {
  try {
    const isAdmin = req.user.name.toLowerCase().startsWith("admin");

    let query = {};

    if (isAdmin) {
      const adminId = req.user.userId
      query = { adminId: adminId, status: "Hot",businessStatus:"telesales" }; 
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
        videoFeatures: 1,
        videoRecord: 1
      });

      console.log(forms);
      console.log("hiiiii");
 


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

  const { id } = req.params;
  const { originalname, buffer } = req.file;

  const uniqueKey = (await generateRandomString(16)) + originalname;
  console.log(uniqueKey);

  const folderName = 'callRecords'; 
  const key = `${folderName}/${uniqueKey}`;

  const s3Client = new S3Client({
    region: process.env.REGION,
    credentials: {
      accessKeyId: process.env.ACCESS_KEYID,
      secretAccessKey: process.env.SECRETACCESS_KEY,
    },
  });
  
  try {
    const response = await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        Body: buffer,
      })
    );
    // Log the URL of the uploaded file
    const fileUrl = `https://crms3-bucket.s3.ap-south-1.amazonaws.com/${key}`;
    console.log("File uploaded successfully:", fileUrl);

    await Form.updateOne(
      { _id: id },
      { $push: { callRecord: fileUrl} }
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
  
    const s3Client = new S3Client({
      region: process.env.REGION,
      credentials: {
        accessKeyId: process.env.ACCESS_KEYID,      
        secretAccessKey: process.env.SECRETACCESS_KEY,
      },
    });
    
    try {
      const response = await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME,
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

  const myLeadsBooks = async(req,res)=>{
    try {
      const isAdmin = req.user.name.toLowerCase().startsWith("admin");
  
      let query = {};
  
      if (isAdmin) {
        const adminId = req.user.userId
        query = { adminId: adminId , billingSoftware:"no"}; 
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


  const businessStatus = async(req,res)=>{
try {

  console.log(req.body);

  const {userId,newBusinessStatus} = req.body
  const data = await Form.updateMany(
    { _id: userId },
    {
      $set: {
        businessStatus: newBusinessStatus,
        leadStatus: "new-lead",
      },
    }
  )
  res.status(200).json({});

;
  

} catch (e) {
  console.error("Error updating forms:", e);
  return res.status(500).send({ data: "Something went wrong while updating the form" });
}

  }


  const uploadVideoRecord = async(req,res)=> {


    const { id } = req.params;
    const { originalname, buffer } = req.file;

    const uniqueKey = (await generateRandomString(16)) + originalname;
    console.log(uniqueKey);

    const folderName = 'videoRecords'; 
    const key = `${folderName}/${uniqueKey}`;
  
    const s3Client = new S3Client({
      region: process.env.REGION,
      credentials: {
        accessKeyId: process.env.ACCESS_KEYID,
        secretAccessKey: process.env.SECRETACCESS_KEY,
      },
    });
    
    try {
      const response = await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: key,
          Body: buffer,
        })
      );
      // Log the URL of the uploaded file
      const fileUrl = `https://crms3-bucket.s3.ap-south-1.amazonaws.com/${key}`;
      console.log("File uploaded successfully:", fileUrl);
  
      await Form.updateOne(
        { _id: id },
        { $push: { videoRecord: fileUrl} }
      )
  
      // Optionally, you can send the file URL as a response to the client
      res.json({ fileUrl });
  
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      res.status(500).json({ error: 'Failed to upload file' });
    }

  }


  const addVideoFeature = async (req, res) => {
    try {
      console.log("loooooooo");
      const { featureName, featureDescription, id } = req.body;
      console.log(req.body);
  
      const result = await Form.updateOne(
        { _id: id },
        {
          $push: {
            videoFeatures: {featureName, featureDescription}
          },
        }
      );
      
      return res.status(200).json({ data: result });
    } catch (error) {
      console.error("Error updating feature:", error);
      return res.status(500).send("Something went wrong while updating feature");
    }
  };


  const addNewLeadFeature = async (req, res) => {
    try {
      const { featureName, featureDescription, id } = req.body;
      console.log(req.body);
  
      const result = await Form.updateOne(
        { _id: id },
        {
          $push: {
            newLeadFeatures: {featureName, featureDescription}
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
  

  const salesBooks = async(req,res)=>{

      try {
        const isAdmin = req.user.name.toLowerCase().startsWith("admin");
    
        let query = {};
    
        if (isAdmin) {
          const adminId = req.user.userId
          query = { adminId: adminId , billingSoftware:"no" ,businessStatus:"telesales"}; 
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

  const SalesCampaignsIndia = async(req,res)=>{
    try {
      const isAdmin = req.user.name.toLowerCase().startsWith("admin");
  
      let query = {};
  
      if (isAdmin) {
        console.log(req.user);
        const adminId = req.user.userId
        query = { adminId: adminId, businessStatus:"telesales" }; 
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
          leadStatus:1,
          status:1,
          adminId:1
        });
  
      const uniqueCitiesSet = new Set(forms.map(form => form.city));
      const uniqueCities = Array.from(uniqueCitiesSet);
  
  console.log(forms);
  
  const newLeads = forms.filter(form => form.leadStatus === "new-lead");
  const opened = forms.filter(form => form.leadStatus === "connected" || form.leadStatus === "follow-up" || form.leadStatus === "not-connected");
  const followUp = forms.filter(form => form.leadStatus === "follow-up");
  const connected = forms.filter(form => form.leadStatus === "connected");
  const notConnected = forms.filter(form => form.leadStatus === "not-connected");
  
  const newLeadsCount = newLeads.length;
  const openedCount = opened.length;
  const followUpCount = followUp.length;
  const connectedCount = connected.length;
  const notConnectedCount = notConnected.length;
  
  console.log("New Leads Count:", newLeadsCount);
  console.log("Opened Count:", openedCount);
  console.log("Follow Up Count:", followUpCount);
  console.log("Connected Count:", connectedCount);
  console.log("Not Connected Count:", notConnectedCount);
  console.log("uniqueCities:",uniqueCities);
  
      return res.status(200).send({ data: { newLeadsCount,openedCount,followUpCount,connectedCount,notConnectedCount,uniqueCities } });
    } catch (e) {
      console.error("Error fetching forms:", e);
      return res.status(500).send({ data: "Something went wrong while fetching the form" });
    }
  }

  const SalesCampaignsBooks = async(req,res)=>{
    try {
      const isAdmin = req.user.name.toLowerCase().startsWith("admin");
  
      let query = {};
  
      if (isAdmin) {
        console.log(req.user);
        const adminId = req.user.userId
        query = { adminId: adminId, billingSoftware:"no",businessStatus:"telesales"}; 
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
        leadStatus:1,
        status:1,
        adminId:1
      });
  
    const uniqueCitiesSet = new Set(forms.map(form => form.city));
    const uniqueCities = Array.from(uniqueCitiesSet);
  
  console.log(forms);
  
  const newLeads = forms.filter(form => form.leadStatus === "new-lead");
  const opened = forms.filter(form => form.leadStatus === "connected" || form.leadStatus === "follow-up" || form.leadStatus === "not-connected");
  const followUp = forms.filter(form => form.leadStatus === "follow-up");
  const connected = forms.filter(form => form.leadStatus === "connected");
  const notConnected = forms.filter(form => form.leadStatus === "not-connected");
  
  const newLeadsCount = newLeads.length;
  const openedCount = opened.length;
  const followUpCount = followUp.length;
  const connectedCount = connected.length;
  const notConnectedCount = notConnected.length;
  
  console.log("New Leads Count:", newLeadsCount);
  console.log("Opened Count:", openedCount);
  console.log("Follow Up Count:", followUpCount);
  console.log("Connected Count:", connectedCount);
  console.log("Not Connected Count:", notConnectedCount);
  console.log("uniqueCities:",uniqueCities);
  
    return res.status(200).send({ data: { newLeadsCount,openedCount,followUpCount,connectedCount,notConnectedCount,uniqueCities } });
    } catch (e) {
      console.error("Error fetching forms:", e);
      return res.status(500).send({ data: "Something went wrong while fetching the form" });
    }

  }


  const booksConnectedInMarkrting = async(req,res)=> {

    try {
      const isAdmin = req.user.name.toLowerCase().startsWith("admin");
  
      let query = {};
  
      if (isAdmin) {
        const adminId = req.user.userId
        query = { adminId: adminId, status: "Hot", booksLeadStatus:"connected",booksBusinessStatus:"telemarketing" ,billingSoftware:"no"}; 
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
          callRecord:1,
          features:1,
          status: 1,
          leadStatus: 1,        
        });
        console.log(forms);
  
      return res.status(200).send({ data:  forms });
    } catch (e) {
      console.error("Error fetching forms:", e);
      return res.status(500).send({ data: "Something went wrong while fetching the form" });
    }

  }

  const booksFollowUpInMarkrting = async(req,res)=> {

    try {
      const isAdmin = req.user.name.toLowerCase().startsWith("admin");
  
      let query = {};
  
      if (isAdmin) {
        const adminId = req.user.userId
        query = { adminId: adminId, status: "Hot" ,booksLeadStatus:"follow-up",booksBusinessStatus:"telemarketing" ,billingSoftware:"no"}; 
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
          followupDate: 1,
          callRecord: 1
        });
        console.log(forms);
  
      return res.status(200).send({ data:  forms });
    } catch (e) {
      console.error("Error fetching forms:", e);
      return res.status(500).send({ data: "Something went wrong while fetching the form" });
    }

  }


  const booksNewLeadInMarkrting = async(req,res)=>{
    try {
      const isAdmin = req.user.name.toLowerCase().startsWith("admin");
  
      let query = {};
  
      if (isAdmin) {
        const adminId = req.user.userId
        query = { adminId: adminId, status: "Hot", booksLeadStatus:"new-lead",booksBusinessStatus:"telemarketing" ,billingSoftware:"no"}; 
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
          newLeadFeatures: 1,
          businessStatus:1
        });
        console.log(forms);

      return res.status(200).send({ data:  forms });
    } catch (e) {
      console.error("Error fetching forms:", e);
      return res.status(500).send({ data: "Something went wrong while fetching the form" });
    }
  }


  const booksNotConnectedInMarkrting = async(req,res)=>{

    try {
      const isAdmin = req.user.name.toLowerCase().startsWith("admin");
  
      let query = {};
  
      if (isAdmin) {
        const adminId = req.user.userId
        query = { adminId: adminId, status: "Hot", booksLeadStatus:"not-connected" ,booksBusinessStatus:"telemarketing",billingSoftware:"no"}; 
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

  const indiaConnectedInSales = async(req,res)=>{
    try {
      const isAdmin = req.user.name.toLowerCase().startsWith("admin");
  
      let query = {};
  
      if (isAdmin) {
        const adminId = req.user.userId
        query = { adminId: adminId, status: "Hot", leadStatus:"connected",businessStatus:"telesales"}; 
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
          videoRecord: 1,
          status: 1,
          leadStatus: 1,
          videoFeatures:1        
        });
        console.log(forms);
  
      return res.status(200).send({ data:  forms });
    } catch (e) {
      console.error("Error fetching forms:", e);
      return res.status(500).send({ data: "Something went wrong while fetching the form" });
    }

  }


  const indiaFollowUpInSales = async(req,res)=>{

    try {
      const isAdmin = req.user.name.toLowerCase().startsWith("admin");
  
      let query = {};
  
      if (isAdmin) {
        const adminId = req.user.userId
        query = { adminId: adminId, status: "Hot" ,leadStatus:"follow-up",businessStatus:"telesales"}; 
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
          followupDate: 1,
          callRecord: 1
        });
        console.log(forms);
  
      return res.status(200).send({ data:  forms });
    } catch (e) {
      console.error("Error fetching forms:", e);
      return res.status(500).send({ data: "Something went wrong while fetching the form" });
    }

  }


  const indiaNewLeadsInSales =async(req,res)=>{

    try {
      const isAdmin = req.user.name.toLowerCase().startsWith("admin");
  
      let query = {};
  
      if (isAdmin) {
        const adminId = req.user.userId
        query = { adminId: adminId, status: "Hot", leadStatus:"new-lead",businessStatus:"telesales"}; 
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
          newLeadFeatures: 1
        });
        console.log(forms);
  
      return res.status(200).send({ data:  forms });
    } catch (e) {
      console.error("Error fetching forms:", e);
      return res.status(500).send({ data: "Something went wrong while fetching the form" });
    }

  }


  const indiaNotConnectedInSales = async(req,res)=> {

    try {
      const isAdmin = req.user.name.toLowerCase().startsWith("admin");
  
      let query = {};
  
      if (isAdmin) {
        const adminId = req.user.userId
        query = { adminId: adminId, status: "Hot", leadStatus:"not-connected" ,businessStatus:"telesales"}; 
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


  const booksNewLeadInSales = async(req,res)=>{

    try {
      const isAdmin = req.user.name.toLowerCase().startsWith("admin");
  
      let query = {};
  
      if (isAdmin) {
        const adminId = req.user.userId
        query = { adminId: adminId, status: "Hot", booksLeadStatus:"new-lead",booksBusinessStatus:"telesales" ,billingSoftware:"no"}; 
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
          newLeadFeatures: 1,
          businessStatus:1
        });
        console.log(forms);

      return res.status(200).send({ data:  forms });
    } catch (e) {
      console.error("Error fetching forms:", e);
      return res.status(500).send({ data: "Something went wrong while fetching the form" });
    }

  }


  const booksFollowUpInSales = async(req,res)=>{
    try {
      const isAdmin = req.user.name.toLowerCase().startsWith("admin");
  
      let query = {};
  
      if (isAdmin) {
        const adminId = req.user.userId
        query = { adminId: adminId, status: "Hot" ,booksLeadStatus:"follow-up",booksBusinessStatus:"telesales" ,billingSoftware:"no"}; 
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
          followupDate: 1,
          callRecord: 1
        });
        console.log(forms);
  
      return res.status(200).send({ data:  forms });
    } catch (e) {
      console.error("Error fetching forms:", e);
      return res.status(500).send({ data: "Something went wrong while fetching the form" });
    }
  }



const booksConnectedInSales = async(req,res)=>{


  try {
    const isAdmin = req.user.name.toLowerCase().startsWith("admin");

    let query = {};

    if (isAdmin) {
      const adminId = req.user.userId
      query = { adminId: adminId, status: "Hot", booksLeadStatus:"connected",booksBusinessStatus:"telesales" ,billingSoftware:"no"}; 
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
        callRecord:1,
        features:1,
        status: 1,
        leadStatus: 1,        
      });
      console.log(forms);

    return res.status(200).send({ data:  forms });
  } catch (e) {
    console.error("Error fetching forms:", e);
    return res.status(500).send({ data: "Something went wrong while fetching the form" });
  }

}


const booksNotConnectedInSales = async(req,res)=>{


  try {
    const isAdmin = req.user.name.toLowerCase().startsWith("admin");

    let query = {};

    if (isAdmin) {
      const adminId = req.user.userId
      query = { adminId: adminId, status: "Hot", booksLeadStatus:"not-connected" ,booksBusinessStatus:"telesales",billingSoftware:"no"}; 
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



const updateBooksStatus = async(req,res)=>{

  console.log("result");

  try {
    const {value,id} = req.body
    const result = await Form.updateOne(
      { _id: id },
      { $set: { booksLeadStatus: value } }
    );
    console.log(result);
    return res.status(200).json({ data: result });
  } catch (error) {
    console.error("Error updating description:", error);
    return res.status(500).send("Something went wrong while updating description");
  }

}


module.exports={
  createForm,getForm,updateForm,getUsers,
  updateUser,getAssignedIndia,deleteUser
  ,getNewLeadsDataIndia,
  updateLeadStatus,
  followUpDetails,getFollowupLeadsDataIndia,
  addFeature,getConnectedLeadsDataIndia,
  getNotConnectedLeadsDataIndia,progressLeadsData
  ,uploadCallRecord,
  uploadImage,getAssignedBooks,myLeadsBooks,
  businessStatus,uploadVideoRecord,addVideoFeature,
  addNewLeadFeature,salesBooks,SalesCampaignsIndia,
  SalesCampaignsBooks,booksConnectedInMarkrting,
  booksFollowUpInMarkrting,booksNewLeadInMarkrting,
  booksNotConnectedInMarkrting,indiaConnectedInSales,
  indiaFollowUpInSales,indiaNewLeadsInSales,
  indiaNotConnectedInSales,booksNewLeadInSales,
  booksFollowUpInSales,booksConnectedInSales,
  booksNotConnectedInSales,updateBooksStatus
}




















