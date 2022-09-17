const jwt = require("jsonwebtoken");
const router = require("../routes/admin");

exports.userverifyToken = (req, res, next) =>{     // req, res, and next argument 
    console.log("===========:", req.headers)
    //get auth header value...
    const dataHeader = req.headers["authorization"];
    console.log("dataheader : ", dataHeader);
    // check if the value of dataheader is undefined... 
    if (typeof dataHeader !== undefined) {
       
        // split the space...
        const data = dataHeader.split(" ");
        // get token from array...
        const dataToken = data[1];
        // set the token... 
        req.token = dataToken;
        // step to next middleware 
        next();
         
        jwt.verify(req.token, "secretkey", (err, authData) => {
            if (err) throw err;
            
             if (!authData) {
                 res.json({
                     message : "user is not loged in"
                 })
             }
             else{
                 req.user_id = authData.user_id;
                 return next();
             }
        });
    }
    else{
        res.json({
            message : " access is forbidden"  
        })
    }
},

exports.adminverifyToken = (req, res) =>{     // req, res, and next argument 

    const dataHeader = req.headers["authorization"];

    if (typeof dataHeader !== undefined) {
       
        const data = dataHeader.split(" ");
        const dataToken = data[0];
        req.token = dataToken;
        
        jwt.verify(req.token, "adminsecretkey", (err, authData) => {
            if (err) throw err;
            
            if (!authData) {
                res.json({
                    message : "Admin is not loged in..."
                })
            }
            else{
                req.email = authData.email;
                return next();
             }
        });
    }
    else{
        res.json({
            message : " access is forbidden..."  
        })
    }
};
