const jwt = require('jsonwebtoken');
const {promisify} = require("util");

exports.protect = async (req,res,next)=>{
    try {
        if(!req.headers.authorization || !req.headers.authorization.startsWith("Bearer"))
        {
          return  res.status(400).json({
                status:'fail',
                message:"Please sign In",
            });
        }

        const token = req.headers.authorization.split(" ")[1];
     const decode = await   promisify(jwt.verify)(token,process.env.SECERTE_KEY);
        console.log(decode);
        res.locals.compID = decode;
    //    / console.log(token);
        next();
    } catch (error) {
        console.log(error);
    }

    
}