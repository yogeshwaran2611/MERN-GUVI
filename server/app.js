const express=require('express')
const mongoose = require('./config/db');

const path = require('path');
const cors=require('cors')
const { registerUser } = require('./controllers/authController'); 
const { loginUser } = require('./controllers/authController1'); 
const User=require('./model/userModel')
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const app=express()



const PORT =process.env.PORT || 3001

app.use(cors());
app.use(express.json());

let profileData = {};
app.post('/register', registerUser);
app.post('/login', loginUser);

app.get('/login', (req, res) => {
  // Assuming you have a login.html file in your client/build folder
  res.sendFile(path.join(__dirname, '../client/build/login.html'));
});

app.get('/profile', async (req, res) => {
    const { email } = req.query;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.put('/profile', async (req, res) => {
  try {
    const { email, name, age, mobileNumber, gender, dateOfBirth } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { name, age, mobileNumber, gender, dateOfBirth },
      { new: true } 
    );

    res.json(updatedUser); 
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve the static files from the React app
if (process.env.NODE_ENV === 'production') {
  // Serve the static files from the React app
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Handle GET requests to any route by sending the index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  });
}
 
  

app.listen(PORT,()=>{
    console.log(`port is running in ${PORT}`)
})
