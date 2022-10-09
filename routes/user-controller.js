const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const { jwtValidate } = require('../middlewares/jwt-validator');

//impoort User model
const User = require('../model/User');

//initilize Router
const router = Router();


//Create new User
router.post('/', 
//Validations inputs and middlewares for create function
[
    check('identification', 'Identification is require').not().isEmpty(),
    check('name', 'Name is require').not().isEmpty(),
    check('lastname', 'LastName is require').not().isEmpty(),
    check('address', 'Address is require').not().isEmpty(),
    check('city', 'City is require').not().isEmpty(),
    check('email', 'Email Name is require').not().isEmpty(),
    check('username', 'User Name is require').not().isEmpty(),
    check('email', 'Email invalid format').isEmail(),    
    check('password', 'Password is require').not().isEmpty(),
],
async function(req, res){
    try {

        console.log(req.body);

        // Validation in request
        const errorsValidation = validationResult(req);
        if(!errorsValidation.isEmpty()){
            return res.status(400).json({ Error: errorsValidation.array() })
        }
        
        //Validate identification exists Select * from users WHERE identification = req.body.identification
        const identifiactionExists = await User.findOne({ identification: req.body.identification })
        if(identifiactionExists){
            return res.status(400).json({ message: "Identification user is already exists"})
        }

        //Validate email exists Select * from users WHERE email = req.body.email
        const userNameExist = await User.findOne({ username: req.body.username })
        if(userNameExist){
            return res.status(400).json({ message: "The username is already exists"})
        }

        //Validate email exists Select * from users WHERE email = req.body.email
        const emailExists = await User.findOne({ email: req.body.email })
        if(emailExists){
            return res.status(400).json({ message: "Email is already exists"})
        }



        let user = new User();
         
        user.identification = req.body.identification;
        user.name = req.body.name;
        user.lastname = req.body.lastname;
        user.address = req.body.address;
        user.city = req.body.city;
        user.username = req.body.username;
        user.email = req.body.email;

        const salt = bcrypt.genSaltSync(10);
        const passwordEncripted = bcrypt.hashSync(req.body.password, salt);
        user.password = passwordEncripted;

        user.role = req.body.role || 'USER';

        // Save User INSERT INTO users(user)Values(req.body)
        user = await user.save();

        // Show in response the users created
        res.status(200).send(user);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error internal server" })
    }

})

// Get function all users
router.get('/',
[
    jwtValidate
],
async function(req, res){
    try {
        
        // Selec * from users
        const users = await User.find();
        res.send(users);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error internal server" })
    }
})

router.delete('/:id', 
async function (req, res) {
        try {
          console.log("DELETE: ", req.params.id);
          const { id } = req.params;
      
          const userDelete = await User.findById({ _id: id });
          if (!userDelete) {
            return res.status(400).json({ messagge: "The User is not found" });
          }
      
          const response = await userDelete.remove();
      
          res.status(200).send(response);
        } catch (error) {
          console.log(error);
          res.status(500).json({ messagge: "Internal Server Error!" });
        }
})

module.exports = router;
