const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User  = mongoose.model('users');

const saltRounds = 10;

module.exports =(app) => {
    
    //index route
    app.get('/', (req, res) => {
        res.send("Hello World!!");
        }
    );

    //signup route
    app.post('/signup', async (req, res) => {
        const newUser = new User({
            name: req.body.name,
            password: req.body.password
        });

        await User.findOne({ name: newUser.name })
        .then(async profile => {
            if(!profile){
                bcrypt.hash(newUser.password, saltRounds, async (err, hash) => {
                    if (err) {
                        console.log("Error in hasing password : ", err);
                    }
                    else {
                        newUser.password = hash;
                        await newUser.save()
                        .then(() => {
                            console.log('User created successfully');
                            res.status(200).send(newUser);
                        })
                        .catch(err => {
                            console.log('User creation failed with error : ', err);
                        });
                    }
                });
            }
            else {
                res.send("Username already exists!!")
            }
        })
        .catch(err => {
            console.log('Error in signup : ', err);
        })
        }
    );

    //login route
    app.post('/login',async (req, res) => {
        const user = {
            name: req.body.name,
            password: req.body.password
        }

        await User.findOne({ name: user.name })
        .then( profile => {
            if(!profile){
                res.send('User does not exist!!');
            }
            else{
                bcrypt.compare(
                    user.password, 
                    profile.password,
                    async (err, result) => {
                        if(err){
                            console.log("Error in comparing password : ", err);    
                        }
                        else if(result == true) {
                            res.send("User is authenticated");
                        }
                        else{
                            res.send("Username/password is incorrect");
                        }
                    });
            }
        })
        .catch(err => {
            console.log('Error encountered during login : ', err);
        })
        }
    );
};