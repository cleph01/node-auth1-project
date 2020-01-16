const express = require('express');

const bcrypt = require('bcryptjs');

const Users = require('./users-model.js');

const Login = require('../login/login-model.js');

const router = express.Router();

function restricted(){

    const authError = {
        message: "You Shall Not Pass",
    }

    return async (req, res, next) => {
        
        
            if(req.session && req.session.userId){
            
                next()

            }else{
                
                return res.status(401).json(authError)

            }
            
    }
}

router.get('/', restricted(), async (req, res, next) => {
  
  try {
      const users = await Users.find()

      res.json(users)

  } catch (error) {
      
        next(error)

        // res.status(500).json({ message: 'Failed to get schemes' });
  }
  
});


module.exports = router;