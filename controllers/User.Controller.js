const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User.Model');
const { registerValidation, loginValidation } = require('../model/User.Validation');

exports.registerUser = async (req, res, next) => {
    //Do some validation first
    try {
        const { error } = await registerValidation(req.body);
        //If there is any validation error return the error
        if (error) throw new Error(error.details[0].message);

        //Check to see if the user already exist
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) throw new Error('Email already exists');

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        //Create a new
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        });

        const saveUser = await user.save();
        //Return the userId
        res.send({ user: saveUser._id });
    }
    catch (err) {
        next(err);
    }
}

//Login Function
exports.login = async (req, res, next) => {
    try {
        //Do some validation first
        const { err } = await loginValidation(req.body);
        //If there is any validation error return the error
        if (err) {
            throw new Error(err.message);
        }
        //Check to see if the user already exist
        const user = await User.findOne({ email: req.body.email });
        //No user found
        if (!user) throw new Error('Email or password is wrong!');
        //Extract and compare the passwords
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        //If the two passwords are not the same
        if (!validPassword) throw new Error('Email or password is wrong!');
        //Valid User let create and asign a token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);
    }
    catch (err) {
        next(err);
    }
}
