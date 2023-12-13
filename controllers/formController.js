const Form=require("../modals/employeeadddetails")
const Admin=require("../modals/adminUserModal")


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

    if (isAdmin) {
      const adminId = req.user.userId;
      query = { adminId: adminId };
    }
    const result = await Admin.find(query);
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


const getAssigned = async (req, res) => {
  try {
    const isAdmin = req.user.name.toLowerCase().startsWith("admin");

    let query = {};

    if (isAdmin) {
      console.log(req.user);
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


const getNewLeadsData = async (req,res) => {
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
        city: 1
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





module.exports={createForm,getForm,updateForm,getUsers,updateUser,getAssigned,deleteUser,getAssignedData,getNewLeadsData,updateLeadStatus,updateLeadDescription,followUpDetails}




















