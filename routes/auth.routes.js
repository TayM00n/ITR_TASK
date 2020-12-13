const {Router} = require('express');
const User = require('../models/User');
const config = require("config");
const {check, validationResult} = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = Router();

router.post(
    '/registration',
    [
        check('email', 'Bad email').normalizeEmail().isEmail(),
        check('password', "Min length of password is 6 symbols").isLength({min: 6})
    ],
    async (req, res)=>{
    try{
        //console.log("Body - ",  req.body);

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Bad values from registration method"
            });
        }

        const {email, password} = req.body;

        const candidate = await User.findOne({email});

        if(candidate){
            return res.status(400).json({message:"Same email is used"});
        }
        const hashedPasssword = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashedPasssword});

        await user.save();

        res.status(201).json({message: "User has been created"})



    }catch(e){
        res.status(500).json({message: "Some error, try again"});
    }
});
router.post(
    '/login',
    [
        check('email', 'Bad email').normalizeEmail().isEmail(),
        check('password', "Input password").exists()
    ],
    async (req, res)=>{
        try{
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Bad values from login method"
                });
            }

            const {email, password} = req.body;
            const user = await User.findOne({email});

            if(!user){
                return res.status(400).json({message: "User not found"});
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(400).json({message: "Incorrect password"});
            }

            const token = jwt.sign(
                {userID: user.id},
                config.get("jwtSecret"),
                {expiresIn:"1h"}
            );

            res.json({token, userId: user.id});

        }catch(e){
            res.status(500).json({message: `Some error, try again${e.message}`});
        }
    });

module.exports = router;