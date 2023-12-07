const Form=require("../modals/employeeadddetails")

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
    console.log(req.user)
    const result=await Form.find({})
    return res.status(200).send({data:result})
  } catch (e) {
    return res.status(200).send({data:"Something went wrong while fetching the form"})
  }
};


// const getForm = async (req, res) => {
//   try {
//     const isAdmin = req.user.name.toLowerCase().startsWith("admin");
    
//     let query = {};
    
//     if (isAdmin) {
//       const adminCity = req.user.name.toLowerCase().split("@")[1];
//       query = { city: adminCity };
//     }

//     const result = await Form.find(query);
//     console.log(result);
//     return res.status(200).send({ data: result });
//   } catch (e) {
//     return res.status(500).send({ data: "Something went wrong while fetching the form" });
//   }
// };




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


module.exports={createForm,getForm,updateForm}




















