


const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) {
            return res.status(401).send("Unauthorized");
        }

        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        console.log("auth success");
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).send("Forbidden");
    }
}

module.exports = authenticateToken;
