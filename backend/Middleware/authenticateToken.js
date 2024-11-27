const jwt = require('jsonwebtoken');
const authenticateToken = async(req, res, next)=>{
    const token = req.cookies.token;
    const secret = process.env.JWT_SECRET;

    if(!token){
        res.status(401).send({message:"UnAuthorize user"})
    }
    try {
        const decode = await jwt.verify(token, secret);
        // res.status(200).send({message:"user Authenticate", data:decode})
        req.user = decode;
        next();
    } catch (error) {
        res.status(403).send({message:"Invalid token"})
    }
}

module.exports = authenticateToken;