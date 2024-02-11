const mongoose = require('mongoose');

const atlasUri = 'mongodb+srv://yozx26:Yozx2611@cluster0.rurrxxl.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(atlasUri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
console.log('Connected to MongoDB Atlas');
});

module.exports = mongoose;



