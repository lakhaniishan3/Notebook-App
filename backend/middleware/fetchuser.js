const jwt = require('jsonwebtoken');
const JWT_SECRET = "ishanlakhan$i"


const Fetchuser = (req, res, next) => {                                          
    // Get the user from the jwt token and add id to req object                                                                                                                                                 
    const token = req.header("authToken")
    if (!token) {
        res.status(401).send({ error: "please authenticate using valid token" })
    }

    // check valid token or not
    try {
        const Data = jwt.verify(token, JWT_SECRET)
        // add with userId
        req.user = Data.user
        next()
    } catch (error) {
        res.status(401).send({ error: "please authenticate using valid token" })
    }
}

module.exports = Fetchuser