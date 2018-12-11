
var express = require('express');
var router = express.Router();
var jsonwt = require('jsonwebtoken');
var passport = require('passport');
var bcrypt = require('bcrypt');
var jsonwebtoken = require('jsonwebtoken');

//Database setup
var key = require('../../dbsetup/dburl');

/**
 * type    GET
 * route   /api/auth
 * desc    just for testing
 * access  PUBLIC
 */

router.get('/', (req, res) => {
    res.json({ test : 'Success'})
});

//Import Schema for Person to register
var Person = require('../../models/Person');

/**
 * type    POST
 * route   /api/auth/register
 * desc    route for registration of user
 * access  PUBLIC
 */
router.post('/saveStudent', (req, res) => {
    Person.findOne( { email : req.body.studentEmail })
        .then( person => {
            if(person) {
                res.send({success:false, msg:'Email is already registered'});
            } else {
                var newPerson = new Person ({
                    name : req.body.studentName,
                    email : req.body.studentEmail,
                    password : req.body.password,
                    cpassword : req.body.cpassword
                });               
                //Encrypt password using bcrypt
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newPerson.password, salt, (err, hash) => {
                        if(err) throw err;
                        newPerson.password = hash;
                        newPerson
                            .save()
                            .then(res.send({success:true, msg:'You registered successfully'}))
                            // .then( person => res.json(person))
                            .catch(err => console.log(err));                        
                    })
                })
            }
        })
        .catch(err => console.log(err))
}) 

/**
 * type    POST
 * route   /api/auth/login
 * desc    route for login of user
 * access  PUBLIC
 */
router.post('/login', (req, res) => {
    var email = req.body.studentEmail;
    var password = req.body.password;

    Person.findOne({email})
        .then( person => {
            if(!person) {
                return res.send({success:false, msg:'Invalid Email/Password'});
            }
            bcrypt.compare(password, person.password)
                .then( isCorrect => {
                    res.send({success:true, msg:'login successfully'})
                    if(isCorrect) {
                        var payload = {
                            id : person.id,
                            name : person.name,
                            email : person.email
                        };
                        jsonwt.sign(
                            payload,
                            key.secrete,
                            {expiresIn : 3600},
                            (err, token) => {
                                if(err) throw err;
                                    res.json({
                                    success : true,
                                    token : "Bearer " + token
                                })
                            }
                        )                       
                    } else {
                        res.status(404).json({passworderror : 'password not correct'})
                    }
                })
                .catch(err => console.log(err))
        })
        .catch( err => console.log(err));
})

module.exports = router;