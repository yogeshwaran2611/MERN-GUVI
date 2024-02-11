const bcrypt = require('bcrypt');
const User = require('../model/userModel'); 

async function registerUser(req, res) {
  try {
    console.log("Received registration request:", req.body);
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: username, 
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res.status(201).json({ message: 'Registration successful', user: savedUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
}

module.exports = { registerUser };
