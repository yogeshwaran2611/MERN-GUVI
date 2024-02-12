const mongoose = require('mongoose');

const atlasUri = 'mongodb+srv://yogi:yogi@cluster0.rurrxxl.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(atlasUri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
console.log('Connected to MongoDB Atlas');
});

module.exports = mongoose;



