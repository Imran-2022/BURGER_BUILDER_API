const express = require('express');
const bcrypt = require('bcrypt');
const { User, validateUser } = require('../models/user')
const router = express.Router()
const _=require('lodash')

const newUser = async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).send(error.message)
    }

    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).send("user already registered !")
    }

    user = new User(_.pick(req.body,['email','password']));

    const salt=await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt)

    const token =user.generateJWT();

    const result=await user.save();

    return res.status(201).send({ 
        token,
        user:_.pick(result,['_id','email'])
    })

}

const authUser=async (req, res, next) => {
    let user=await User.findOne({ email:req.body.email})
    if(!user) return res.status(400).send("invalid email or pass !")
    const validUser=await  bcrypt.compare(req.body.password,user.password)
    if(!validUser) return res.status(400).send("invalid email or pass !")
    const token=  user.generateJWT();
    res.send({
        token,
        user:_.pick(user,['_id','email'])
    })
}

router.route("/")
    .post(newUser)
router.route("/auth")
    .post(authUser)

module.exports = router;
