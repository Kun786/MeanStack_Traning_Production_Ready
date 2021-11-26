const expres = require('express');
const Router = expres.Router();

//Calling Middleware DIrectory to Access that middleware
const { UploadUserImage } = require('../libraryfiles/UploadUserImage');
//Calling Middleware DIrectory to Access that middleware


//Calling controlers
const { RegisterUser, UpdateUser, GetAllUsersFromTestCollection, GetUserById, UpdateById, RemoveUserById, RemoveAllCollection, UserLogin } = require('../controllers/TestingAndLearningController')
//Calling controlers

Router.post('/testing',UploadUserImage.single('ImageUrl'),RegisterUser );
Router.post('/UpdateTest/:_UserId',UpdateUser);
Router.get('/GetAllUsers',GetAllUsersFromTestCollection);
Router.get('/GetUserById/:_UserId',GetUserById);
Router.post('/UpdateUserById/:_UserId',UpdateById);
Router.delete('/DeleteUserById/:_Id',RemoveUserById);
Router.delete('/DeleteTheWholeCollection',RemoveAllCollection);
Router.post('/LoginUser',UserLogin);

module.exports = Router;