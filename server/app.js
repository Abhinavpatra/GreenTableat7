require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParse = require('cookie-parser');

const User = require('./modals/user');

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParse());

// Database Connection
const mongoose = require("mongoose");
const dbUrl = process.env.MONGO_URL;

async function connectToDatabase() {
    try {
        await mongoose.connect(dbUrl);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process if unable to connect to the database
    }
}

connectToDatabase();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// Root route
app.get('/', (req, res) => {
    res.send('Hello');
});

// Sign-up endpoint
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password, restaurantId } = req.body;
        if (!name || !email || !password || !restaurantId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password.trim(), salt);

        const newEmail = email.toLowerCase();

        const newUser = new User({ name, email: newEmail, password: hashedPassword, restaurantId });
        const registeredUser = await newUser.save();
        console.log(registeredUser);
        return res.status(200).json({ message: 'Signup successful' });
    } catch (error) {
        console.error('Error handling signup request:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ error: 'Incorrect Password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '12h' });
        console.log(token);
        return res.status(200).json({ token, loggedInRestaurantId: user.restaurantId });
    } catch (err) {
        console.error('Error handling login request:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
// Get restaurant by ID endpoint
app.get('/api/restaurants/:restaurantId', async (req, res) => {
  try {
      const { restaurantId } = req.params;
      if (!restaurantId) {
          return res.status(400).json({ error: 'Missing required fields' });
      }

      const user = await User.findOne({ restaurantId });
      if (!user) {
          return res.status(404).json({ error: 'Restaurant not found' });
      }

      // Ensure to return JSON data
      return res.status(200).json({ user });
  } catch (err) {
      console.error('Error handling restaurant request:', err);
      return res.status(500).json({ error: 'Internal server error' });
  }
});


// Get all restaurants endpoint
app.get('/api/restaurants', async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({ users });
    } catch (err) {
        console.error('Error handling database request:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
// Add a new route for handling NGO portal submissions
// Add a new route for handling NGO portal submissions
app.post('/api/ngo', async (req, res) => {
  try {
    // Extract data from the request body
    const { name, address, food } = req.body;

    // Check if all required fields are provided
    if (!name || !address || !food) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Here you can implement logic to notify the NGO about the new food donation
    // For demonstration purposes, let's just log the data for now
    console.log('New food donation received:');
    console.log('Name:', name);
    console.log('Address:', address);
    console.log('Food:', food);

    // Respond with a success message
    return res.status(200).json({ message: 'Food donation received successfully' });
  } catch (err) {
    console.error('Error handling NGO portal submission:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
