// const jwt=require("jsonwebtoken")

// const authenticateToken=(req,res,next)=>{
//     const token=req.header("Authorization")?.split(" ")[1]
//     if(!token){
//         return res.status(401).send("unAuthorized")
//     }

//     try{
//         const decoded=jwt.verify(token,process.env.SECRET_KEY)
//         console.log("ooo")
//         req.user=decoded
//         console.log(req.user)
//         next()
//     }catch(err){
//         console.log(err)
//         return res.status(403).send("forbidden")
        
//     }
// }

// module.exports=authenticateToken


const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) {
            return res.status(401).send("Unauthorized");
        }

        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        console.log("ooo");
        req.user = decoded;
        console.log(req.user);
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).send("Forbidden");
    }
}

module.exports = authenticateToken;
