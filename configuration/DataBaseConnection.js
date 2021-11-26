const Package = require('../package.json');
// const mongoose = require('mongoose');
const mongoose = require('mongoose');
// const _EnviormentalVariables = require('./EnviormentalVariables');

// const DatabaseName = 'trust4pay';
mongoose.connect('mongodb+srv://class:class123@meanstackcooperatetrani.ksrau.mongodb.net/TestingAndLearning?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (error,connection) => {
    if (!error) {
        console.log(`\nMogoDb Connected Successfuly at 27017 with Database Name`);
        console.log("Your App Has the Following Dependicies\n");
        for (dependencies in Package.dependencies) {
            console.log(dependencies);
        }
    }
    else { console.log('Error: Not Connected to the MongoDb' + error) }
});



// mongodb+srv://class:<password>@meanstackcooperatetrani.ksrau.mongodb.net/myFirstDatabase?retryWrites=true&w=majority