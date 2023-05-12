const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function isstringinvalid(string) {
    if (string == undefined || string.length === 0) {
        return true;
    }
    else {
        return false;
    }
}


//Sigin up a user
const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (isstringinvalid(email) || isstringinvalid(password)) {
            return res.status(400).json({ err: "Bad parameters. Something is missing" });
        }

        //Rejecting if the user already exist in the database
        const existing = await User.findOne({ email: email  });

        if (existing) {
            return res.status(201).json({ message: "User already exist please login" });
        }

        //Protecting the password stored in the database
        const saltrounds = 10;
        bcrypt.hash(password, saltrounds, async (err, hash) => {
            const user = new User({
                email: email,
                password: hash,
            });
            await user.save();
            res.status(201).json({ message: 'Successfully created new user' });
        })
    }
    catch (error) {
        res.status(500).json({ message: error, success: false });
    }
}

function generateAccessToken(id, name) {
    return jwt.sign({ userId: id, name: name }, process.env.TOKEN_SECRET)
}

//Login in a user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (isstringinvalid(email) || isstringinvalid(password)) {
            return res.status(400).json({ message: 'Email id or password is missing', success: false });
        }

        const user = await User.findOne({ email: email });

        if (user) {   
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    throw new Error('Something went wrong')
                }
                if (result) {
                    return res.status(200).json({ success: true, message: "User logged in successfully", user, token: generateAccessToken(user.id, user.name) })
                }
                else {
                    return res.status(400).json({ message: 'Password is incorrect', success: false });
                }
            })
        }
        else {
            return res.status(404).json({ message: 'User does not exist', success: false });
        }

    }
    catch (err) {
        res.status(500).json({ message: err, success: false });
    }
}



module.exports = {
    signup,
    login
}

