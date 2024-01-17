const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/MyNotebook')
    .then(() => console.log('Mongodb connected!'));