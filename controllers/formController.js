const Form=require("../modals/employeeadddetails")
const Admin=require("../modals/adminUserModal")


const createForm = async (req, res) => {
  try {
    console.log(req.body,"lll")
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
      const adminCity = req.user.name.split("@")[1];
      query = { city: adminCity}; 
    }

    const result = await Form.find(query);
    console.log(result);
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send({ data: "Something went wrong while fetching the form" });
  }
};


const updateForm=async(req,res)=>{
    const { id } = req.params;
    console.log(req.body,"lkkl")
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


// const getAssigned = async (req,res)=> {
//   try {
//     const isAdmin = req.user.name.toLowerCase().startsWith("admin");

//     let query = {};

//     if (isAdmin) {
//       const adminCity = req.user.name.split("@")[1];
//       query = { city: adminCity}; 
//     }

//     const result = await Form.find(query);
//     console.log(result);
//     return res.status(200).send({ data: result });
//   } catch (e) {
//     return res.status(500).send({ data: "Something went wrong while fetching the form" });
//   }
// }


const getAssigned = async (req, res) => {


  try {
    const isAdmin = req.user.name.toLowerCase().startsWith("admin");

    let query = {};

    console.log("hiiii");


    if (isAdmin) {
      const adminCity = req.user.city
      query = { city: adminCity, status: "Hot" }; 
    }

    const result = await Form.find(query)
      .select({
        brandName: 1,
        restaurantMobileNumber: 1,
        firmName: 1,
        contactPersonname: 1,
        designation: 1,
        contactPersonNumber: 1,
      });

    console.log(result);

    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send({ data: "Something went wrong while fetching the form" });
  }
};





module.exports={createForm,getForm,updateForm,getUsers,updateUser,getAssigned}




















