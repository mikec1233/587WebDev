const mongoose = require('mongoose');

mongoose.connect("mongodb://root:example@127.0.0.1:27017").then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });

module.exports = mongoose;
