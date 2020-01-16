const express = require('express');

const bcrypt = require('bcryptjs');

const Login = require('./login-model.js');

const router = express.Router();

router.post('/', async (req, res, next) => {
  
  try {
      
    const { username, password } = req.body
    const user = await Login.findBy({ username }).first()
    const passwordValid = await bcrypt.compare(password, user.password)

    if (user && passwordValid){

        req.session.userId = user.id;

        res.status(200).json({
            message: `Welcome ${user.username}!`
        })
    }else{
        res.status(401).json({
            message: `You Shall Not Pass!`
        })
    }

  } catch (error) {
      
        next(error)
  
  }
});



module.exports = router;