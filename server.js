//Block Start for Dependencies
const DataBaseConnection = require ('./configuration/DataBaseConnection');
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
//Block End for Dependencies



//Global Constant
const PORT = process.env.PORT || 1234;

//Block Start Initialize the APP
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.text());
app.use(cors());
//Block End Initialize the APP

//Start Blcok Setting the Headers for you Application
app.all('*', (req, res, next) => {

    // This is how we protect the api
    res.header('Access-Control-Allow-Origin','*');// So it make the header allow to the origin when cross platfrom try to exchange the data
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
    //Mehtod is a property which help us to use the Methods by request. Browers send the options request before your Mthods request
 
    }
    next(); //if nothing of the response sent back so next() means other rou
});
//End Block Setting the Headers for you Application

//Making My Folder Public Using Static function
app.use('/assets',express.static('assets'));
app.use(express.static(path.join(__dirname,'/FrontEnd')));
//Making My Folder Public Using Static function

//Start Block Load Routes

// LoadingRoutes in Variable
const _TestintAndLearningRoute = require('./routes/TestingAndLearningRoute');
const _ChatManagementRoute = require('./routes/ChatManagementRoute');
// LoadingRoutes in Variable

//UsingRoutes
app.use('/TestingAndLearningRoute',_TestintAndLearningRoute);
app.use('/ChatManagement',_ChatManagementRoute);
//UsingRoutes

//End Block Load Routes


//Serving Front End From Express Server
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname+'/FrontEnd/index.html'));
    console.log(__dirname);
});
//Serving Front End From Express Server


//Start Block Checking Routes As express not found Url not Founded we need to do it explicitly 
app.use((req,res,next)=>{
    const error= new Error('Url not found'); 
    error.status=404; 
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message,
        }
    })
});


//Starting the app
app.listen(PORT,()=>{
    console.log(`Your app is running on ${PORT}`);
});


