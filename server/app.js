require('dotenv').config();

// Connecting to database
const mongoose = require("mongoose");
const dbUrl = process.env.MONGO_URL;

async function main(){
    await mongoose.connect(dbUrl);
}

main()
.then(() => {
    console.log("Connected to Server");
})
.catch((err) => {
    console.log(err);
})

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.listen(3000 , () => {
    console.log("Server is Listening");
})

app.get('/',(req,res) => {
    res.send('Hello')
})

const bcrypt = require('bcryptjs');

// sign up
const User = require('./modals/user')
app.post('/signup' , async (req,res) => {
    try {
        const { name, email, password, restaurantId } = req.body;
        if (!name || !email || !password || !restaurantId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password.trim(),salt);

        const newEmail = email.toLowerCase()

        const newUser = new User({name,email : newEmail,password : hashedPassword,restaurantId});

        // // Example: Save user data to a database
        // // Replace this with your actual implementation
        // saveUserData(name, email, password, restaurantId);
        console.log(newUser)
        const registeredUser =  await newUser.save();
        console.log(registeredUser);
        res.status(200).json({ message: 'Signup successful' });
    } catch (error) {
        // If there's an error, return an error response
        console.error('Error handling signup request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// Login 
const jwt = require('jsonwebtoken');
const cookieParse = require('cookie-parser');
app.use(cookieParse());

app.post('/api/login', async (req,res) => {

    try {
        const { email,password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const newPassword = password.trim()
        const user = await User.findOne({email});
        if(!user){
            return res.status(409).json({error: 'User Not Exist , SignUp First!!'});
        }
        bcrypt.compare(newPassword, user.password, (err, result) => {
            if (err) {
                console.error('Error handling bcrypt compare:',err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            if (result) {
                const token = jwt.sign({id : user._id},process.env.JWT_SECRET_KEY, {expiresIn : '12h'})
                console.log(token)
                return res.status(200).json({ token, loggedInRestaurantId: user.restaurantId });
            } else {
                return res.status(403).json({ error: 'Incorrect Password' });
            }
        });
    } catch(err){
        console.error('Error handling login request:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }    
})

app.get('/api/restaurants/:restaurantId', async (req,res) => {
    let {restaurantId} = req.params;
    if (!restaurantId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const user = await User.findOne({restaurantId});
        if(!user){
            return res.status(409).json({error: 'User Not Exist , SignUp First!!'});
        }
        res.status(200).json({user});
    }catch(err){
        console.error('Error handling update request:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
})