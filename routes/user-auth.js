const { validationResult, check } = require("express-validator");
const { Router } = require('express');
const User = require('../model/User');
const bcrypt = require('bcryptjs')
const { jwtGenerator } = require('../helpers/JWT')
const session = require('express-session');

const router = Router()

// Login function
router.post('/', 
[
    check('email', 'Email invalid format').isEmail(),
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
],
async function(req, res){

    try {

        
         //req.session.visitas = req.session.visitas ? ++req.session.visitas : 1;
        //Validation input 
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({ message: errors.array() })
        }

        //find user using email and validate email exists
        const userFinded = await User.findOne({ email: req.body.email });
        if(!userFinded){
            return res.status(404).json({ message: "email or password incorrect" })
        }
        

        // compare passwords using bcrypt
        /* const passwordFinden = await User.findOne({ password: req.body.password }) */
        const passwordFinden = bcrypt.compareSync(req.body.password, userFinded.password);
        if(!passwordFinden){
            return res.status(404).json({ message: "email or password incorrect" })
        }
        /* const isEquals = bcrypt.compareSync(req.body.password, userFinded.password);
        if(!isEquals){
            return res.status(400).json({ message: "email or password incorrect" })
        } */

        //Get token
        const token = jwtGenerator(userFinded);

        // Set atributtes session
        req.session.user = userFinded;
        req.session.username = req.body.email;
        req.session.role = req.body.role;
        req.session.id = userFinded._id

        //Response
        res.json({ 
            _id: userFinded._id, 
            identification: userFinded.identification,
            name: userFinded.name, 
            email: userFinded.email,
            role: userFinded.role,
            accessToken: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal sever error..."})
    }

})



module.exports = router;

/* 

app.use((req, res, next) => {
  req.session.usuario = "cway";
  req.session.rol ='user';
  req.session.visitas = req.session.visitas ? ++req.session.visitas : 1;
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization, X-API-Key, Origin, Content-Type, Accept, Access-Control-Allow-Requested-Method');
  // res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
}) */
