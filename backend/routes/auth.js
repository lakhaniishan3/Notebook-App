const express = require('express');
const router = express.Router()
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Fetchuser = require('../middleware/fetchuser');




const JWT_SECRET = "ishanlakhan$i"



// routes 1 ::: Create a user using: POST "localhost:7000/api/auth/createuser". no login reqeried
router.post("/createuser", [
    body('name', 'Enter min 3 characters').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter min 5 characters').isLength({ min: 5 })
],
    async (req, res) => {

        let success = false
        // if there are errors, return bad request and the errors
        const result = validationResult(req);
        if (result.isEmpty()) {

            // check whether user with this email exist already
            try {
                let user = await User.findOne({ email: req.body.email })
                if (user) {
                    return res.status(400).json({ success, error: "Sorry user is already exist for this email" })
                }

                // bcrypt password
                const salt = await bcrypt.genSaltSync(10);
                const securepass = await bcrypt.hashSync(req.body.password, salt);

                // create new users
                user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: securepass,
                })

                // auth. token generate with userId
                const Data = {
                    user: {
                        id: user.id
                    }
                }
                const AuthToken = jwt.sign(Data, JWT_SECRET);
                success = true
                res.json({ success, AuthToken })
            }
            catch (error) {
                console.error(error.message)
                res.status(500).send("Internal server error")
            }
        }
    });




// routes 2 ::: Authenticate a user using: POST "localhost:7000/api/auth/login". no login reqeried
router.post("/login", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {

    let success = false
    // if there are errors, return bad request and the errors
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }

        // compare user password
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }

        // auth. token generate with userId
        const Data = {
            user: {
                id: user.id
            }
        }
        const AuthToken = jwt.sign(Data, JWT_SECRET);
        success = true
        res.json({ success, AuthToken })
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
});



// routes 3 ::: Get login user details using: POST "localhost:7000/api/auth/getuser". no login reqeried
router.post("/getuser", Fetchuser, async (req, res) => {
    try {
        userId = req.user.id
        let user = await User.findById(userId).select("-password")
        res.send(user)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
});






module.exports = router;
